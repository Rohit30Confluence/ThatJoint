#!/usr/bin/env python3
"""
ThatJoint Co-Living Backend API & Chatbot Server
A robust, high-performance, multithreaded backend service providing RESTful endpoints,
relational analytics, and AI query synthesis over the 3-Year Co-Living database.
"""

import sys
import os
import json
import sqlite3
import argparse
import signal
import time
import datetime
from pathlib import Path
from http.server import HTTPServer, BaseHTTPRequestHandler
from socketserver import ThreadingMixIn
from urllib.parse import urlparse, parse_qs
from typing import Dict, Any

BACKEND_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BACKEND_DIR))

from query_engine import ColivingQueryEngine, DB_FILE, KNOWLEDGE_FILE


class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


class ThatJointApiHandler(BaseHTTPRequestHandler):
    query_engine = ColivingQueryEngine()

    def do_OPTIONS(self):
        """Handle CORS pre-flight requests."""
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

    def send_json(self, status_code: int, data: Any):
        payload = json.dumps(data, indent=2 if "-v" in sys.argv else None).encode("utf-8")
        self.send_response(status_code)
        self.send_cors_headers()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def send_error_json(self, status_code: int, error_message: str):
        self.send_json(status_code, {
            "success": False,
            "error": error_message,
            "status_code": status_code
        })

    def parse_body_json(self) -> Dict[str, Any]:
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length == 0:
                return {}
            raw_body = self.rfile.read(content_length).decode("utf-8")
            return json.loads(raw_body)
        except Exception as e:
            raise ValueError(f"Invalid JSON request body: {str(e)}")

    # -------------------------------------------------------------
    # GET Router
    # -------------------------------------------------------------
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")
        query_params = parse_qs(parsed.query)

        try:
            # 1. Healthcheck
            if path in ["/health", "/api/health"]:
                return self.handle_health()

            # 2. Knowledge Index Summary
            if path in ["/api/knowledge", "/api/summary"]:
                return self.handle_summary()

            # 3. Residents List / Search / Filters
            if path == "/api/residents":
                return self.handle_residents_list(query_params)

            # 4. Resident Detail: /api/residents/<resident_id>
            if path.startswith("/api/residents/"):
                res_id = path.split("/api/residents/")[1].strip().upper()
                return self.handle_resident_detail(res_id)

            # 5. Billing Summary: /api/billing/summary
            if path == "/api/billing/summary":
                return self.handle_billing_summary()

            # 6. Monthly Billing Trends: /api/billing/monthly
            if path == "/api/billing/monthly":
                return self.handle_billing_monthly()

            # 7. Resident Ledger: /api/billing/resident/<resident_id>
            if path.startswith("/api/billing/resident/"):
                res_id = path.split("/api/billing/resident/")[1].strip().upper()
                return self.handle_resident_billing(res_id)

            # 8. KYC & Legal Compliance: /api/kyc/compliance
            if path == "/api/kyc/compliance":
                return self.handle_kyc_compliance()

            # 9. Late-Night Delivery Analytics: /api/analytics/late-night
            if path == "/api/analytics/late-night":
                return self.handle_late_night_analytics()

            # 10. Static Website File Serving (Turnkey HTTP Server)
            if not path.startswith("/api/"):
                return self.handle_static_file(path)

            # Not found
            self.send_error_json(404, f"API route not found: {self.path}")

        except Exception as e:
            self.send_error_json(500, f"Server internal error: {str(e)}")

    # -------------------------------------------------------------
    # POST Router
    # -------------------------------------------------------------
    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        try:
            body = self.parse_body_json()

            # 1. Chatbot Query Endpoint
            if path in ["/api/chat", "/chat"]:
                return self.handle_chat(body)

            # 2. Safe SQL Query Runner
            if path in ["/api/sql", "/api/query"]:
                return self.handle_sql_query(body)

            # 3. Enquiry / Schedule Demo / Have a Talk Dispatcher
            if path in ["/api/enquiry", "/api/demo", "/api/contact"]:
                return self.handle_enquiry(body)

            self.send_error_json(404, f"POST endpoint not found: {self.path}")

        except ValueError as ve:
            self.send_error_json(400, str(ve))
        except Exception as e:
            self.send_error_json(500, f"Server execution error: {str(e)}")

    # -------------------------------------------------------------
    # Handlers
    # -------------------------------------------------------------
    def handle_health(self):
        db_exists = DB_FILE.exists()
        res_count = 0
        bill_count = 0

        if db_exists:
            with self.query_engine.get_connection() as conn:
                cur = conn.cursor()
                cur.execute("SELECT count(*) FROM residents_master")
                res_count = cur.fetchone()[0]
                cur.execute("SELECT count(*) FROM monthly_billing_ledger")
                bill_count = cur.fetchone()[0]

        self.send_json(200, {
            "status": "healthy",
            "service": "ThatJoint Co-Living Property Sentinel Backend",
            "version": "2.4.0-colive",
            "database": {
                "file": str(DB_FILE),
                "connected": db_exists,
                "residents_count": res_count,
                "billing_records_count": bill_count,
                "date_coverage": "2023-11 to 2026-10 (36 Months)"
            }
        })

    def handle_chat(self, body: Dict[str, Any]):
        query = body.get("query") or body.get("message") or body.get("prompt")
        if not query or not query.strip():
            return self.send_error_json(400, "Missing 'query' field in chat request.")

        # Synthesize grounded answer
        result = self.query_engine.ask(query.strip())

        self.send_json(200, {
            "success": True,
            "query": query,
            "response": result
        })

    def handle_residents_list(self, params: Dict[str, list]):
        search = params.get("search", [None])[0]
        nationality = params.get("nationality", [None])[0]
        employer = params.get("employer", [None])[0]
        room_type = params.get("room_type", [None])[0]
        payment = params.get("payment_system", [None])[0]

        sql = """
            SELECT r.resident_id, r.full_name, r.nationality, r.room_type, r.room_no,
                   r.employer_organization, r.payment_system, r.primary_auth_doc_type,
                   sum(b.total_monthly_bill_inr) as total_3yr_spend
            FROM residents_master r
            LEFT JOIN monthly_billing_ledger b ON r.resident_id = b.resident_id
            WHERE 1=1
        """
        args = []

        if search:
            sql += " AND (r.full_name LIKE ? OR r.resident_id LIKE ? OR r.room_no LIKE ? OR r.employer_organization LIKE ?)"
            s_term = f"%{search}%"
            args.extend([s_term, s_term, s_term, s_term])

        if nationality:
            sql += " AND r.nationality = ?"
            args.append(nationality)

        if employer:
            sql += " AND r.employer_organization LIKE ?"
            args.append(f"%{employer}%")

        if room_type:
            sql += " AND r.room_type = ?"
            args.append(room_type)

        if payment:
            sql += " AND r.payment_system LIKE ?"
            args.append(f"%{payment}%")

        sql += " GROUP BY r.resident_id ORDER BY r.resident_id"

        with self.query_engine.get_connection() as conn:
            cur = conn.cursor()
            cur.execute(sql, args)
            rows = [dict(r) for r in cur.fetchall()]

        self.send_json(200, {
            "success": True,
            "total_residents": len(rows),
            "residents": rows
        })

    def handle_resident_detail(self, resident_id: str):
        dossier = self.query_engine.get_resident_dossier(resident_id)
        if dossier.get("data") is None:
            return self.send_error_json(404, f"Resident not found: {resident_id}")

        self.send_json(200, {
            "success": True,
            "resident_id": resident_id,
            "profile": dossier["data"]["resident"],
            "financial_summary": dossier["data"]["billing_summary"],
            "formatted_markdown": dossier["text"]
        })

    def handle_billing_summary(self):
        summary = self.query_engine.answer_total_revenue()
        yearly = self.query_engine.answer_yearly_revenue()
        top5 = self.query_engine.answer_top_spenders()
        by_room = self.query_engine.answer_room_type_billing()

        self.send_json(200, {
            "success": True,
            "overall": summary["data"],
            "yearly_breakdown": yearly["data"],
            "top_spenders": top5["data"],
            "revenue_by_room_type": by_room["data"]
        })

    def handle_billing_monthly(self):
        with self.query_engine.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT billing_month,
                       sum(total_monthly_bill_inr) as total_revenue,
                       sum(base_rent_inr) as base_rent,
                       sum(food_plan_inr) as food_plan,
                       sum(late_night_spend_inr) as late_night_spend,
                       sum(late_night_orders) as orders,
                       avg(avg_delivery_dist_km) as avg_dist
                FROM monthly_billing_ledger
                GROUP BY billing_month
                ORDER BY billing_month
            """)
            months = [dict(r) for r in cur.fetchall()]

        self.send_json(200, {
            "success": True,
            "total_months": len(months),
            "monthly_ledger": months
        })

    def handle_resident_billing(self, resident_id: str):
        with self.query_engine.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT billing_id, billing_month, base_rent_inr, food_plan_inr,
                       late_night_orders, avg_delivery_dist_km, late_night_spend_inr,
                       total_monthly_bill_inr
                FROM monthly_billing_ledger
                WHERE resident_id = ?
                ORDER BY billing_month
            """, (resident_id,))
            rows = [dict(r) for r in cur.fetchall()]

        if not rows:
            return self.send_error_json(404, f"No billing records found for resident: {resident_id}")

        self.send_json(200, {
            "success": True,
            "resident_id": resident_id,
            "total_months": len(rows),
            "ledger": rows
        })

    def handle_kyc_compliance(self):
        ans = self.query_engine.answer_kyc_and_laws("")
        with self.query_engine.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT nationality, count(*) as count
                FROM residents_master
                GROUP BY nationality
            """)
            nat = [dict(r) for r in cur.fetchall()]

        self.send_json(200, {
            "success": True,
            "nationalities": nat,
            "document_breakdown": ans["data"],
            "legal_citations": self.query_engine.knowledge.get("legal_regulations", [])
        })

    def handle_late_night_analytics(self):
        ans = self.query_engine.answer_food_delivery()
        self.send_json(200, {
            "success": True,
            "analytics": ans["data"]
        })

    def handle_sql_query(self, body: Dict[str, Any]):
        sql = body.get("sql") or body.get("query")
        if not sql:
            return self.send_error_json(400, "Missing 'sql' query parameter.")

        try:
            result = self.query_engine.execute_raw_sql(sql)
            self.send_json(200, {
                "success": True,
                "data": result
            })
        except ValueError as ve:
            self.send_error_json(400, str(ve))
        except Exception as e:
            self.send_error_json(500, f"SQL Execution Failed: {str(e)}")

    def handle_summary(self):
        self.send_json(200, {
            "success": True,
            "knowledge": self.query_engine.knowledge
        })

    def handle_enquiry(self, body: Dict[str, Any]):
        mode = body.get("mode", "Schedule Demo")
        name = body.get("name", "").strip()
        email = body.get("email", "").strip()
        phone = body.get("phone", "").strip()
        org = body.get("organization") or body.get("org") or body.get("focus", "")
        msg = body.get("message") or body.get("notes", "")
        currency = body.get("currency", "USD")
        tier = body.get("tier", "Growth Portfolio")

        target_email = "dinde.infosec@gmail.com"
        timestamp = datetime.datetime.utcnow().isoformat() + "Z"
        enquiry_id = f"ENQ-{int(time.time() * 1000)}"

        try:
            with self.query_engine.get_connection() as conn:
                cur = conn.cursor()
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS business_enquiries (
                        id TEXT PRIMARY KEY,
                        timestamp TEXT,
                        mode TEXT,
                        name TEXT,
                        email TEXT,
                        phone TEXT,
                        organization TEXT,
                        message TEXT,
                        tier TEXT,
                        currency TEXT,
                        target_email TEXT,
                        status TEXT
                    )
                """)
                cur.execute("""
                    INSERT INTO business_enquiries 
                    (id, timestamp, mode, name, email, phone, organization, message, tier, currency, target_email, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (enquiry_id, timestamp, mode, name, email, phone, org, msg, tier, currency, target_email, "RECEIVED"))
                conn.commit()
        except Exception as e:
            sys.stderr.write(f"Warning: could not insert enquiry to db: {e}\n")

        # Also write to backend/data/enquiries.json
        try:
            enquiries_file = BACKEND_DIR / "data" / "enquiries.json"
            all_enquiries = []
            if enquiries_file.exists():
                try:
                    all_enquiries = json.loads(enquiries_file.read_text(encoding="utf-8"))
                except Exception:
                    all_enquiries = []
            all_enquiries.append({
                "id": enquiry_id,
                "timestamp": timestamp,
                "mode": mode,
                "name": name,
                "email": email,
                "phone": phone,
                "organization": org,
                "message": msg,
                "tier": tier,
                "currency": currency,
                "target_email": target_email,
                "status": "RECEIVED"
            })
            enquiries_file.write_text(json.dumps(all_enquiries, indent=2), encoding="utf-8")
        except Exception as e:
            sys.stderr.write(f"Warning: could not write enquiry json: {e}\n")

        self.send_json(200, {
            "ok": True,
            "enquiry_id": enquiry_id,
            "message": "Your Request is processed , Thanks for interest!"
        })

    def handle_static_file(self, req_path: str):
        root_dir = BACKEND_DIR.parent
        clean_path = req_path.lstrip("/")
        if not clean_path:
            clean_path = "index.html"

        file_path = (root_dir / clean_path).resolve()

        # Path traversal guard
        try:
            file_path.relative_to(root_dir)
        except ValueError:
            return self.send_error_json(403, "Access forbidden.")

        if not file_path.exists() or file_path.is_dir():
            if (root_dir / f"{clean_path}.html").exists():
                file_path = (root_dir / f"{clean_path}.html").resolve()
            else:
                return self.send_error_json(404, f"Static asset not found: {req_path}")

        mime_types = {
            ".html": "text/html; charset=utf-8",
            ".css": "text/css; charset=utf-8",
            ".js": "application/javascript; charset=utf-8",
            ".json": "application/json; charset=utf-8",
            ".svg": "image/svg+xml",
            ".png": "image/png",
            ".webp": "image/webp",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".ico": "image/x-icon",
            ".woff": "font/woff",
            ".woff2": "font/woff2",
            ".ttf": "font/ttf",
            ".txt": "text/plain; charset=utf-8",
            ".pdf": "application/pdf"
        }
        content_type = mime_types.get(file_path.suffix.lower(), "application/octet-stream")

        try:
            content = file_path.read_bytes()
            self.send_response(200)
            self.send_cors_headers()
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_error_json(500, f"Error reading static file: {str(e)}")

    def log_message(self, format, *args):
        """Custom clean logging."""
        sys.stderr.write(f"[{self.log_date_time_string()}] {self.command} {self.path} -> {args[0]}\n")


def run_server(host: str = "0.0.0.0", port: int = 8000):
    server = ThreadedHTTPServer((host, port), ThatJointApiHandler)
    print(f"\n=======================================================")
    print(f"  THΛTJOINT / Property Sentinel Backend Service")
    print(f"  Version: 2.4.0 (3-Year Co-Living KYC & Billing)")
    print(f"=======================================================")
    print(f"  [✓] Listening on: http://{host}:{port}")
    print(f"  [✓] Healthcheck:  http://{host}:{port}/api/health")
    print(f"  [✓] Chatbot API:  POST http://{host}:{port}/api/chat")
    print(f"  [✓] Residents:    http://{host}:{port}/api/residents")
    print(f"  [✓] Financials:   http://{host}:{port}/api/billing/summary")
    print(f"  [✓] Database:     {DB_FILE}")
    print(f"=======================================================\n")

    def handle_exit(sig, frame):
        print("\n[*] Shutting down ThatJoint backend service...")
        server.shutdown()
        server.server_close()
        sys.exit(0)

    signal.signal(signal.SIGINT, handle_exit)
    signal.signal(signal.SIGTERM, handle_exit)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="ThatJoint Co-Living Backend API Server")
    parser.add_argument("--host", default="0.0.0.0", help="Binding host interface (default: 0.0.0.0)")
    parser.add_argument("--port", type=int, default=8000, help="Binding port (default: 8000)")
    args = parser.parse_args()

    run_server(host=args.host, port=args.port)
