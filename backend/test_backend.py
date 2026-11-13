#!/usr/bin/env python3
"""
Comprehensive Automated Test Suite for ThatJoint Backend Service
Tests the relational database, query engine, REST API handlers, and natural language synthesis.
"""

import unittest
import json
import os
from io import BytesIO
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent
from query_engine import ColivingQueryEngine, DB_FILE
from server import ThatJointApiHandler


class MockSocket:
    def __init__(self, request_bytes: bytes):
        self._rfile = BytesIO(request_bytes)
        self._wfile = BytesIO()

    def makefile(self, mode, *args, **kwargs):
        if "b" in mode:
            if "r" in mode:
                return self._rfile
            else:
                return self._wfile
        raise ValueError(f"Unsupported mode: {mode}")

    def sendall(self, data):
        self._wfile.write(data)


def simulate_http_request(method: str, path: str, body: dict = None) -> tuple:
    """Simulates an HTTP request directly to ThatJointApiHandler without network sockets."""
    body_bytes = json.dumps(body).encode("utf-8") if body else b""
    headers = [
        f"{method} {path} HTTP/1.1",
        "Host: localhost",
        f"Content-Length: {len(body_bytes)}",
        "Content-Type: application/json",
        "",
        ""
    ]
    raw_request = "\r\n".join(headers).encode("utf-8") + body_bytes
    mock_sock = MockSocket(raw_request)

    handler = ThatJointApiHandler(mock_sock, ("127.0.0.1", 8000), None)
    output = mock_sock._wfile.getvalue().decode("utf-8")

    # Parse status code and json body from response
    lines = output.split("\r\n")
    status_line = lines[0]
    status_code = int(status_line.split()[1])

    body_idx = output.find("\r\n\r\n")
    resp_body = output[body_idx + 4:] if body_idx != -1 else ""
    try:
        parsed_json = json.loads(resp_body) if resp_body else {}
    except Exception:
        parsed_json = {"raw": resp_body}

    return status_code, parsed_json


class TestColivingQueryEngine(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.engine = ColivingQueryEngine()

    def test_database_record_counts(self):
        with self.engine.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("SELECT count(*) FROM residents_master")
            res_cnt = cur.fetchone()[0]
            self.assertEqual(res_cnt, 40, "residents_master must contain exactly 40 residents")

            cur.execute("SELECT count(*) FROM monthly_billing_ledger")
            bill_cnt = cur.fetchone()[0]
            self.assertEqual(bill_cnt, 1440, "monthly_billing_ledger must contain exactly 1,440 records (40 x 36 mos)")

    def test_gross_revenue_total(self):
        with self.engine.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("SELECT sum(total_monthly_bill_inr) FROM monthly_billing_ledger")
            total = cur.fetchone()[0]
            self.assertEqual(total, 26902673, "Gross 3-Year Revenue must match ₹26,902,673")

    def test_foreign_nationals_query(self):
        res = self.engine.ask("Who are the foreign national residents?")
        self.assertEqual(res["type"], "foreign_nationals")
        self.assertIn("Lukas Weber", res["text"])
        self.assertIn("Elena Rostova", res["text"])
        self.assertIn("Kenji Takahashi", res["text"])
        self.assertIn("Form C", res["text"])
        self.assertIn("Foreigners Act 1946", res["text"])

    def test_specific_resident_lukas_weber(self):
        res = self.engine.ask("Tell me about Lukas Weber from Siemens")
        self.assertEqual(res["type"], "resident_dossier")
        self.assertEqual(res["data"]["resident"]["resident_id"], "RES-007")
        self.assertEqual(res["data"]["resident"]["nationality"], "German")
        self.assertEqual(res["data"]["resident"]["employer_organization"], "Siemens Technology India")
        self.assertEqual(res["data"]["resident"]["room_no"], "D-Share-4")
        self.assertIn("FRRO-MH-PUN-2023-88412", res["text"])

    def test_specific_resident_by_id(self):
        res = self.engine.ask("Who is resident RES-019?")
        self.assertEqual(res["type"], "resident_dossier")
        self.assertEqual(res["data"]["resident"]["full_name"], "Elena Rostova")
        self.assertEqual(res["data"]["resident"]["nationality"], "Russian")
        self.assertEqual(res["data"]["resident"]["employer_organization"], "Infosys BPM Pune")

    def test_total_revenue_query(self):
        res = self.engine.ask("What is the total revenue over 3 years?")
        self.assertEqual(res["type"], "revenue_summary")
        self.assertIn("26,902,673", res["text"])
        self.assertIn("Base Accommodation Rent", res["text"])

    def test_yearly_revenue_query(self):
        res = self.engine.ask("Show yearly revenue breakdown for 2024 and 2025")
        self.assertEqual(res["type"], "yearly_revenue")
        self.assertIn("2024", res["text"])
        self.assertIn("2025", res["text"])
        self.assertEqual(len(res["data"]), 4, "Should span 2023 through 2026")

    def test_top_spenders_query(self):
        res = self.engine.ask("Who are the top 5 spenders?")
        self.assertEqual(res["type"], "top_spenders")
        self.assertEqual(len(res["data"]), 5)
        self.assertEqual(res["data"][0]["resident_id"], "RES-022")
        self.assertEqual(res["data"][0]["full_name"], "Aditi Menon")

    def test_late_night_food_delivery(self):
        res = self.engine.ask("How much was spent on late night Swiggy and Zomato food delivery?")
        self.assertEqual(res["type"], "food_delivery_stats")
        self.assertIn("3,865,193", res["text"])
        self.assertIn("10,471", res["text"])

    def test_kyc_and_dpdp_act(self):
        res = self.engine.ask("How is resident Aadhaar protected under DPDP Act 2023?")
        self.assertEqual(res["type"], "kyc_compliance")
        self.assertIn("DPDP", res["text"])
        self.assertIn("masked format", res["text"])
        self.assertIn("Maharashtra Rent Control Act", res["text"])

    def test_payment_systems_query(self):
        res = self.engine.ask("List residents using UPI AutoPay and Cashfree e-NACH")
        self.assertEqual(res["type"], "payment_systems")
        self.assertIn("Cashfree e-NACH", res["text"])
        self.assertIn("UPI AutoPay", res["text"])

    def test_employers_query(self):
        res = self.engine.ask("Which corporate employers have tenants here?")
        self.assertEqual(res["type"], "employers")
        self.assertIn("Barclays Kharadi", res["text"])
        self.assertIn("Infosys Phase 2", res["text"])
        self.assertIn("Siemens Technology India", res["text"])

    def test_raw_sql_safety(self):
        # Valid SELECT
        val = self.engine.execute_raw_sql("SELECT count(*) as cnt FROM residents_master WHERE nationality='Indian'")
        self.assertEqual(val["rows"][0]["cnt"], 37)

        # Prohibited DROP
        with self.assertRaises(ValueError):
            self.engine.execute_raw_sql("DROP TABLE residents_master")

        # Prohibited DELETE
        with self.assertRaises(ValueError):
            self.engine.execute_raw_sql("DELETE FROM residents_master WHERE resident_id='RES-001'")


class TestHttpServerEndpoints(unittest.TestCase):
    def test_api_health(self):
        status, data = simulate_http_request("GET", "/api/health")
        self.assertEqual(status, 200)
        self.assertEqual(data["status"], "healthy")
        self.assertEqual(data["database"]["residents_count"], 40)
        self.assertEqual(data["database"]["billing_records_count"], 1440)

    def test_api_chat(self):
        status, data = simulate_http_request("POST", "/api/chat", {"query": "Who is Kenji Takahashi?"})
        self.assertEqual(status, 200)
        self.assertTrue(data["success"])
        self.assertIn("KPIT Technologies", data["response"]["text"])
        self.assertEqual(data["response"]["data"]["resident"]["nationality"], "Japanese")

    def test_api_residents_filter(self):
        status, data = simulate_http_request("GET", "/api/residents?nationality=German")
        self.assertEqual(status, 200)
        self.assertEqual(data["total_residents"], 1)
        self.assertEqual(data["residents"][0]["full_name"], "Lukas Weber")

    def test_api_resident_detail(self):
        status, data = simulate_http_request("GET", "/api/residents/RES-001")
        self.assertEqual(status, 200)
        self.assertTrue(data["success"])
        self.assertEqual(data["profile"]["full_name"], "Aarav Kulkarni")
        self.assertEqual(data["financial_summary"]["total_months"], 36)

    def test_api_billing_summary(self):
        status, data = simulate_http_request("GET", "/api/billing/summary")
        self.assertEqual(status, 200)
        self.assertTrue(data["success"])
        self.assertEqual(data["overall"]["gross_revenue"], 26902673)

    def test_api_kyc_compliance(self):
        status, data = simulate_http_request("GET", "/api/kyc/compliance")
        self.assertEqual(status, 200)
        self.assertTrue(data["success"])
        self.assertTrue(len(data["legal_citations"]) >= 5)

    def test_api_sql(self):
        status, data = simulate_http_request("POST", "/api/sql", {"sql": "SELECT count(*) as total FROM residents_master WHERE room_type LIKE '%Single%'"})
        self.assertEqual(status, 200)
        self.assertTrue(data["success"])
        self.assertEqual(data["data"]["rows"][0]["total"], 30)

    def test_api_late_night_analytics(self):
        status, data = simulate_http_request("GET", "/api/analytics/late-night")
        self.assertEqual(status, 200)
        self.assertTrue(data["success"])
        self.assertIn("overview", data["analytics"])

    def test_api_enquiry(self):
        enquiries_path = os.path.join(os.path.dirname(__file__), "data", "enquiries.json")
        orig_content = None
        if os.path.exists(enquiries_path):
            with open(enquiries_path, "r", encoding="utf-8") as f:
                orig_content = f.read()

        try:
            status, data = simulate_http_request("POST", "/api/enquiry", {
                "mode": "Schedule Demo",
                "name": "Tariq Al-Mansoor",
                "email": "tariq@gulfprop.ae",
                "phone": "+971 50 123 4567",
                "organization": "Gulf Co-Living Real Estate LLC",
                "tier": "Growth Portfolio",
                "currency": "AED",
                "message": "Interested in deployment across Dubai & Riyadh facilities."
            })
            self.assertEqual(status, 200)
            self.assertTrue(data["ok"])
            self.assertEqual(data["message"], "Your Request is processed , Thanks for interest!")
            self.assertTrue(data["enquiry_id"].startswith("ENQ-"))
        finally:
            if orig_content is not None:
                with open(enquiries_path, "w", encoding="utf-8") as f:
                    f.write(orig_content)

    def test_api_static_file(self):
        status, data = simulate_http_request("GET", "/index.html")
        self.assertEqual(status, 200)
        self.assertIn("THΛTJOINT", data["raw"])


if __name__ == "__main__":
    unittest.main()
