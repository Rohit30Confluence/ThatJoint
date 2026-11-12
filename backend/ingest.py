#!/usr/bin/env python3
"""
ThatJoint Co-Living Database Ingestion & Indexer
Loads coliving_3year_full_kyc_billing.sql into SQLite and builds pre-aggregated knowledge indices.
"""

import sqlite3
import json
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent
DATA_DIR = BACKEND_DIR / "data"
SQL_FILE = DATA_DIR / "coliving_3year_full_kyc_billing.sql"
DB_FILE = DATA_DIR / "coliving.sqlite"
KNOWLEDGE_JSON = DATA_DIR / "knowledge_index.json"
RESIDENTS_JSON = DATA_DIR / "residents_dossier.json"


def ingest_database():
    print(f"[*] Reading SQL from {SQL_FILE}...")
    if not SQL_FILE.exists():
        raise FileNotFoundError(f"Missing SQL file: {SQL_FILE}")

    with open(SQL_FILE, "r", encoding="utf-8") as f:
        raw_sql = f.read()

    # Adapt MySQL syntax for SQLite
    clean_sql = raw_sql.replace(
        "INT AUTO_INCREMENT PRIMARY KEY", "INTEGER PRIMARY KEY AUTOINCREMENT"
    )

    # Remove existing DB for clean rebuild
    if DB_FILE.exists():
        DB_FILE.unlink()

    print(f"[*] Initializing SQLite database at {DB_FILE}...")
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Execute schema & inserts
    cursor.executescript(clean_sql)

    # Create performance indexes
    print("[*] Creating database indexes...")
    indexes = [
        "CREATE INDEX idx_res_nationality ON residents_master(nationality);",
        "CREATE INDEX idx_res_employer ON residents_master(employer_organization);",
        "CREATE INDEX idx_res_room_type ON residents_master(room_type);",
        "CREATE INDEX idx_res_room_no ON residents_master(room_no);",
        "CREATE INDEX idx_res_payment ON residents_master(payment_system);",
        "CREATE INDEX idx_bill_res ON monthly_billing_ledger(resident_id);",
        "CREATE INDEX idx_bill_month ON monthly_billing_ledger(billing_month);",
        "CREATE INDEX idx_bill_res_month ON monthly_billing_ledger(resident_id, billing_month);",
    ]
    for idx_sql in indexes:
        cursor.execute(idx_sql)

    conn.commit()

    # Validation
    cursor.execute("SELECT count(*) FROM residents_master")
    res_count = cursor.fetchone()[0]
    cursor.execute("SELECT count(*) FROM monthly_billing_ledger")
    bill_count = cursor.fetchone()[0]

    cursor.execute("""
        SELECT min(billing_month), max(billing_month), 
               sum(total_monthly_bill_inr), sum(base_rent_inr), 
               sum(food_plan_inr), sum(late_night_spend_inr),
               avg(avg_delivery_dist_km), sum(late_night_orders)
        FROM monthly_billing_ledger
    """)
    totals = cursor.fetchone()

    print(f"[✓] Successfully ingested {res_count} residents and {bill_count} billing records.")
    print(f"    Date span: {totals[0]} to {totals[1]} (36 months)")
    print(f"    Gross 3-Year Revenue: ₹{totals[2]:,} (Base Rent: ₹{totals[3]:,}, Food: ₹{totals[4]:,}, Late-Night: ₹{totals[5]:,})")

    # Build Knowledge Index
    build_indices(conn)
    conn.close()


def build_indices(conn):
    print("[*] Building precomputed knowledge index for fast chatbot synthesis...")
    cursor = conn.cursor()

    # 1. Resident Dossiers
    cursor.execute("""
        SELECT 
            r.resident_id, r.full_name, r.nationality, r.room_type, r.room_no,
            r.primary_auth_doc_type, r.simulated_doc_numbers, r.aadhaar_masked_simulated,
            r.pan_simulated, r.driving_license_simulated, r.employer_organization,
            r.work_permit_or_company_id, r.payment_system, r.payment_gateway_integration_id,
            r.application_id, r.tenant_app_user_uuid, r.app_integration_stack,
            r.payment_regulation, r.applicable_legislature,
            count(b.billing_id) as total_months,
            sum(b.total_monthly_bill_inr) as total_spent,
            avg(b.total_monthly_bill_inr) as avg_monthly_bill,
            sum(b.late_night_spend_inr) as total_late_night_spend,
            sum(b.late_night_orders) as total_late_night_orders,
            avg(b.avg_delivery_dist_km) as avg_delivery_dist
        FROM residents_master r
        LEFT JOIN monthly_billing_ledger b ON r.resident_id = b.resident_id
        GROUP BY r.resident_id
        ORDER BY r.resident_id
    """)

    col_names = [d[0] for d in cursor.description]
    resident_rows = cursor.fetchall()
    residents_list = [dict(zip(col_names, row)) for row in resident_rows]

    # Save resident dossier json
    with open(RESIDENTS_JSON, "w", encoding="utf-8") as f:
        json.dump(residents_list, f, indent=2)

    # 2. Aggregated Knowledge Base
    cursor.execute("SELECT nationality, count(*) FROM residents_master GROUP BY nationality")
    nationalities = {row[0]: row[1] for row in cursor.fetchall()}

    cursor.execute("SELECT room_type, count(*), count(distinct room_no) FROM residents_master GROUP BY room_type")
    room_types = [{"room_type": r[0], "residents": r[1], "rooms": r[2]} for r in cursor.fetchall()]

    cursor.execute("SELECT employer_organization, count(*) FROM residents_master GROUP BY employer_organization ORDER BY count(*) DESC")
    employers = [{"employer": r[0], "count": r[1]} for r in cursor.fetchall()]

    cursor.execute("SELECT payment_system, payment_gateway_integration_id, count(*) FROM residents_master GROUP BY payment_system")
    payment_systems = [{"payment_system": r[0], "gateway": r[1], "count": r[2]} for r in cursor.fetchall()]

    cursor.execute("""
        SELECT substr(billing_month, 1, 4) as year, 
               sum(total_monthly_bill_inr) as total,
               sum(base_rent_inr) as base_rent,
               sum(food_plan_inr) as food_plan,
               sum(late_night_spend_inr) as late_night_spend,
               sum(late_night_orders) as orders
        FROM monthly_billing_ledger
        GROUP BY year
        ORDER BY year
    """)
    yearly_totals = [
        {
            "year": r[0],
            "total_revenue_inr": r[1],
            "base_rent_inr": r[2],
            "food_plan_inr": r[3],
            "late_night_spend_inr": r[4],
            "late_night_orders": r[5]
        }
        for r in cursor.fetchall()
    ]

    cursor.execute("""
        SELECT billing_month, sum(total_monthly_bill_inr), sum(late_night_spend_inr), sum(late_night_orders)
        FROM monthly_billing_ledger
        GROUP BY billing_month
        ORDER BY billing_month
    """)
    monthly_trends = [
        {"month": r[0], "total_revenue": r[1], "late_night_spend": r[2], "orders": r[3]}
        for r in cursor.fetchall()
    ]

    cursor.execute("""
        SELECT r.resident_id, r.full_name, r.room_type, r.employer_organization, 
               sum(b.total_monthly_bill_inr) as total_spent,
               sum(b.late_night_spend_inr) as late_night_spent,
               sum(b.late_night_orders) as total_orders
        FROM residents_master r
        JOIN monthly_billing_ledger b ON r.resident_id = b.resident_id
        GROUP BY r.resident_id
        ORDER BY total_spent DESC
        LIMIT 10
    """)
    top_spenders = [
        {
            "resident_id": r[0],
            "full_name": r[1],
            "room_type": r[2],
            "employer": r[3],
            "total_spent_inr": r[4],
            "late_night_spent_inr": r[5],
            "total_orders": r[6]
        }
        for r in cursor.fetchall()
    ]

    # Foreign nationals specifically
    cursor.execute("""
        SELECT resident_id, full_name, nationality, room_type, room_no, 
               employer_organization, primary_auth_doc_type, simulated_doc_numbers,
               work_permit_or_company_id, payment_system, applicable_legislature
        FROM residents_master
        WHERE nationality != 'Indian'
    """)
    foreign_nationals = [
        {
            "resident_id": r[0],
            "full_name": r[1],
            "nationality": r[2],
            "room_type": r[3],
            "room_no": r[4],
            "employer": r[5],
            "doc_type": r[6],
            "frro_number": r[7],
            "work_permit": r[8],
            "payment_system": r[9],
            "legal_framework": r[10]
        }
        for r in cursor.fetchall()
    ]

    knowledge_base = {
        "dataset_name": "ThatJoint 3-Year Co-Living Portfolio (Pune Tech Corridor)",
        "summary": {
            "total_residents": len(resident_rows),
            "date_range": "2023-11 to 2026-10",
            "total_months": 36,
            "total_records": 1440,
            "total_revenue_inr": sum(y["total_revenue_inr"] for y in yearly_totals),
            "total_base_rent_inr": sum(y["base_rent_inr"] for y in yearly_totals),
            "total_food_plan_inr": sum(y["food_plan_inr"] for y in yearly_totals),
            "total_late_night_spend_inr": sum(y["late_night_spend_inr"] for y in yearly_totals),
            "total_late_night_orders": sum(y["late_night_orders"] for y in yearly_totals)
        },
        "nationalities": nationalities,
        "room_types": room_types,
        "employers": employers,
        "payment_systems": payment_systems,
        "yearly_revenue": yearly_totals,
        "monthly_trends": monthly_trends,
        "top_spenders": top_spenders,
        "foreign_nationals": foreign_nationals,
        "legal_regulations": [
            "Digital Personal Data Protection (DPDP) Act 2023",
            "Aadhaar (Targeted Delivery of Financial Subsidies) Act 2016 & UIDAI Offline e-KYC Norms",
            "Income Tax Act 1961 Sec 139A (PAN Verification) & Sec 194I / GST B2B Invoicing",
            "Maharashtra Rent Control Act 1999 & Police Tenant Verification (Sec 144 CrPC / BNSS)",
            "Foreigners Act 1946 & Registration of Foreigners Rules 1992 (Form C Filing within 24 hrs)",
            "Foreign Exchange Management Act (FEMA) 1999 (NRO Account / Authorised Dealer Payment)",
            "Payment and Settlement Systems Act 2007 (RBI NACH Guidelines)",
            "RBI Card Tokenization & e-Mandate Recurring Payment Directives",
            "NPCI Unified Payments Interface (UPI) AutoPay Mandate Rules",
            "RBI Master Directions on Prepaid Payment Instruments (PPI Wallets)"
        ]
    }

    with open(KNOWLEDGE_JSON, "w", encoding="utf-8") as f:
        json.dump(knowledge_base, f, indent=2)

    print(f"[✓] Knowledge index written to {KNOWLEDGE_JSON}")
    print(f"[✓] Resident dossiers written to {RESIDENTS_JSON}")


if __name__ == "__main__":
    ingest_database()
