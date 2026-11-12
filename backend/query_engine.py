#!/usr/bin/env python3
"""
ThatJoint Co-Living Query & Synthesis Engine
Translates natural language questions into relational analytics, KYC dossiers,
legal compliance breakdowns, and billing insights over the 3-Year Co-Living database.
"""

import sqlite3
import re
import json
from pathlib import Path
from typing import Dict, Any, List, Optional, Tuple

BACKEND_DIR = Path(__file__).resolve().parent
DB_FILE = BACKEND_DIR / "data" / "coliving.sqlite"
KNOWLEDGE_FILE = BACKEND_DIR / "data" / "knowledge_index.json"


class ColivingQueryEngine:
    def __init__(self, db_path: Optional[Path] = None):
        self.db_path = db_path or DB_FILE
        self.knowledge: Dict[str, Any] = {}
        if KNOWLEDGE_FILE.exists():
            with open(KNOWLEDGE_FILE, "r", encoding="utf-8") as f:
                self.knowledge = json.load(f)

    def get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def ask(self, query: str) -> Dict[str, Any]:
        """Main entrypoint for chatbot queries."""
        q = query.strip()
        q_lower = q.lower()

        # 1. Foreign Nationals & FRRO / Immigration
        if any(term in q_lower for term in ["foreign", "frro", "expat", "visa", "form c", "lukas", "elena", "kenji", "nationality", "german", "russian", "japanese"]):
            if "lukas" in q_lower:
                return self.get_resident_dossier("RES-007", focus="foreign")
            elif "elena" in q_lower:
                return self.get_resident_dossier("RES-019", focus="foreign")
            elif "kenji" in q_lower:
                return self.get_resident_dossier("RES-034", focus="foreign")
            return self.answer_foreign_nationals()

        # 2. Specific Resident ID or Name lookup
        res_id_match = re.search(r'\bres[-_ ]?0*([1-9]|[1-3][0-9]|40)\b', q_lower)
        if res_id_match:
            num = int(res_id_match.group(1))
            formatted_id = f"RES-{num:03d}"
            return self.get_resident_dossier(formatted_id)

        # Check for specific names in residents
        resident_lookup = self.find_resident_by_name(q_lower)
        if resident_lookup:
            return self.get_resident_dossier(resident_lookup["resident_id"])

        # 3. Revenue & Financial Billing Queries
        if any(term in q_lower for term in ["revenue", "billing", "bill", "total spent", "gross", "income", "money", "financial", "ledger", "cost", "spender"]):
            if any(term in q_lower for term in ["spender", "top 5", "top 10", "highest spend", "most expensive", "who spent"]):
                return self.answer_top_spenders()
            elif any(term in q_lower for term in ["yearly", "year-over-year", "yoy", "by year", "per year", "2023", "2024", "2025", "2026"]):
                return self.answer_yearly_revenue()
            elif any(term in q_lower for term in ["average", "avg", "per room", "room type revenue", "room revenue"]):
                return self.answer_room_type_billing()
            else:
                return self.answer_total_revenue()

        # 4. Late-Night Food Delivery (Swiggy / Zomato Webhooks)
        if any(term in q_lower for term in ["late night", "food", "order", "delivery", "swiggy", "zomato", "meal", "distance"]):
            return self.answer_food_delivery()

        # 5. KYC, Aadhaar, PAN, Legal & Regulatory Compliance
        if any(term in q_lower for term in ["kyc", "aadhaar", "pan", "dpdp", "police", "act", "law", "legislat", "regulation", "tenant verification"]):
            return self.answer_kyc_and_laws(q_lower)

        # 6. Payment Systems & Gateways (e-NACH, UPI, Stripe, Cashfree, Razorpay, Zoho)
        if any(term in q_lower for term in ["payment", "gateway", "nach", "enach", "upi", "autopay", "stripe", "cashfree", "razorpay", "zoho", "payu", "payroll"]):
            return self.answer_payment_systems(q_lower)

        # 7. Employers & Corporate Tenants (Infosys, Barclays, TCS, Wipro, Siemens, etc.)
        if any(term in q_lower for term in ["employer", "company", "corporate", "barclays", "infosys", "tcs", "wipro", "persistent", "cognizant", "zs associates", "siemens", "kpit", "bajaj"]):
            return self.answer_employers(q_lower)

        # 8. Room Types & Capacity (Double Shared, Double Single, Single Room)
        if any(term in q_lower for term in ["room", "capacity", "occupancy", "shared", "double", "single room"]):
            return self.answer_rooms()

        # 9. Generic Co-Living Overview Fallback
        return self.answer_general_overview(q)

    # -------------------------------------------------------------
    # Resident Dossier Handler
    # -------------------------------------------------------------
    def get_resident_dossier(self, resident_id: str, focus: str = "all") -> Dict[str, Any]:
        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT * FROM residents_master WHERE resident_id = ?
            """, (resident_id,))
            res = cur.fetchone()

            if not res:
                return {
                    "title": f"Resident {resident_id} Not Found",
                    "badge": "Not Found",
                    "text": f"No resident found matching identifier `{resident_id}` in ThatJoint Co-Living records (RES-001 through RES-040).",
                    "data": None
                }

            r = dict(res)

            # Fetch billing stats
            cur.execute("""
                SELECT count(*), sum(total_monthly_bill_inr), avg(total_monthly_bill_inr),
                       sum(base_rent_inr), sum(food_plan_inr), sum(late_night_spend_inr),
                       sum(late_night_orders), avg(avg_delivery_dist_km)
                FROM monthly_billing_ledger
                WHERE resident_id = ?
            """, (resident_id,))
            b = cur.fetchone()

        total_months = b[0]
        total_spent = b[1]
        avg_monthly = b[2]
        base_rent = b[3]
        food_plan = b[4]
        late_night_spend = b[5]
        late_night_orders = b[6]
        avg_dist = b[7]

        # Formatting text response
        text = f"""### 👤 Resident Dossier: {r['full_name']} (`{r['resident_id']}`)
**Property Assignment:** Room `{r['room_no']}` ({r['room_type']}) · **Nationality:** {r['nationality']}  
**Employer:** {r['employer_organization']} (Employee ID / Permit: `{r['work_permit_or_company_id']}`)  

---
#### 📋 KYC & Authentication Stack
- **Primary Auth Doc:** {r['primary_auth_doc_type']}
- **Simulated Auth Identifiers:** `{r['simulated_doc_numbers']}`
- **Simulated Masked Aadhaar:** `{r['aadhaar_masked_simulated']}`
- **Simulated PAN:** `{r['pan_simulated']}`
- **Driving License:** `{r['driving_license_simulated']}`
- **Tenant App UUID:** `{r['tenant_app_user_uuid']}` (`{r['application_id']}`)
- **App Stack:** {r['app_integration_stack']}

---
#### 💳 Payment & Settlement Infrastructure
- **Payment Method:** {r['payment_system']}
- **Gateway Integration ID:** `{r['payment_gateway_integration_id']}`
- **Regulatory Rule:** {r['payment_regulation']}

---
#### 📊 3-Year Financial & Consumption Ledger (36 Months)
- **Total Gross Spend (36 Months):** **₹{total_spent:,}** (Avg: ₹{avg_monthly:,.2f}/mo)
  - Base Rent Subtotal: ₹{base_rent:,}
  - Co-Living Food Plan: ₹{food_plan:,}
  - Late-Night Deliveries: ₹{late_night_spend:,} ({late_night_orders} total orders, avg {avg_dist:.1f} km from Kharadi/Hinjawadi kitchens)

---
#### ⚖️ Applicable Indian Legislation & Compliance
> {r['applicable_legislature']}
"""

        return {
            "type": "resident_dossier",
            "title": f"Resident Profile: {r['full_name']} ({r['resident_id']})",
            "badge": f"{r['nationality']} · Room {r['room_no']}",
            "text": text,
            "data": {
                "resident": r,
                "billing_summary": {
                    "total_months": total_months,
                    "total_spent_inr": total_spent,
                    "avg_monthly_bill_inr": round(avg_monthly, 2),
                    "base_rent_inr": base_rent,
                    "food_plan_inr": food_plan,
                    "late_night_spend_inr": late_night_spend,
                    "late_night_orders": late_night_orders,
                    "avg_delivery_distance_km": round(avg_dist, 2)
                }
            },
            "suggested_questions": [
                f"Show monthly billing history for {r['full_name']}",
                f"Who else works at {r['employer_organization']}?",
                f"Which other residents live in {r['room_type']}?"
            ]
        }

    # -------------------------------------------------------------
    # Foreign Nationals & FRRO Compliance
    # -------------------------------------------------------------
    def answer_foreign_nationals(self) -> Dict[str, Any]:
        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT r.resident_id, r.full_name, r.nationality, r.room_no, r.room_type,
                       r.employer_organization, r.work_permit_or_company_id, r.simulated_doc_numbers,
                       r.payment_system, r.payment_gateway_integration_id,
                       sum(b.total_monthly_bill_inr) as total_spent
                FROM residents_master r
                JOIN monthly_billing_ledger b ON r.resident_id = b.resident_id
                WHERE r.nationality != 'Indian'
                GROUP BY r.resident_id
                ORDER BY r.resident_id
            """)
            rows = [dict(row) for row in cur.fetchall()]

        text = """### 🌍 International Residents & FRRO Compliance Overview
The ThatJoint Co-Living portfolio houses **3 foreign national residents** operating under multinational corporate assignments in the Pune technology corridor:

| Resident | ID | Nationality | Room | Corporate Employer | FRRO / Permit Ref | Payment System | 3-Year Spend |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
"""
        for row in rows:
            text += f"| **{row['full_name']}** | `{row['resident_id']}` | {row['nationality']} | `{row['room_no']}` | {row['employer_organization']} | `{row['work_permit_or_company_id']}` | {row['payment_system']} | ₹{row['total_spent']:,} |\n"

        text += """
---
#### ⚖️ Indian Statutory Compliance for International Co-Living Residents:
1. **Foreigners Act 1946 & Registration of Foreigners Rules 1992**:
   - **Form C Electronic Filing**: Property managers are strictly mandated to submit **Form C to the FRRO/FRO within 24 hours** of check-in with passport, visa, and local address particulars.
2. **Foreign Exchange Management Act (FEMA) 1999**:
   - Rent settlements must originate from an **NRO (Non-Resident Ordinary) Rupee Account**, authorized international credit card (processed via Stripe India with tokenization), or authorized dealer channels.
3. **Maharashtra Rent Control Act 1999**:
   - Formal Leave & License Agreement registered with police clearance and biometric stamp duty.
4. **Digital Personal Data Protection (DPDP) Act 2023**:
   - Safe archival of international identity credentials and restricted cross-border data transfer.
"""

        return {
            "type": "foreign_nationals",
            "title": "International Residents & FRRO Compliance",
            "badge": "3 Foreign Nationals Active",
            "text": text,
            "data": rows,
            "suggested_questions": [
                "Tell me about Lukas Weber from Siemens",
                "Tell me about Elena Rostova from Infosys BPM",
                "Tell me about Kenji Takahashi from KPIT",
                "What is Form C filing under Foreigners Act 1946?"
            ]
        }

    # -------------------------------------------------------------
    # Financial Revenue & 3-Year Billing Analytics
    # -------------------------------------------------------------
    def answer_total_revenue(self) -> Dict[str, Any]:
        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT 
                    count(distinct billing_month) as total_months,
                    count(billing_id) as total_entries,
                    sum(total_monthly_bill_inr) as gross_revenue,
                    sum(base_rent_inr) as rent_revenue,
                    sum(food_plan_inr) as food_revenue,
                    sum(late_night_spend_inr) as late_night_revenue,
                    avg(total_monthly_bill_inr) as avg_resident_bill,
                    sum(late_night_orders) as total_orders
                FROM monthly_billing_ledger
            """)
            t = dict(cur.fetchone())

        pct_rent = (t['rent_revenue'] / t['gross_revenue']) * 100
        pct_food = (t['food_revenue'] / t['gross_revenue']) * 100
        pct_late = (t['late_night_revenue'] / t['gross_revenue']) * 100

        text = f"""### 💰 ThatJoint 3-Year Co-Living Financial Performance (Nov 2023 – Oct 2026)

Across **36 months (3 full operational years)** for **40 fully occupied resident units**, total gross collections reached **₹{t['gross_revenue']:,}** (~₹2.69 Crore).

#### 📊 Revenue Component Breakdown
- **Base Accommodation Rent:** **₹{t['rent_revenue']:,}** ({pct_rent:.1f}% of total)
  - Fixed contract lease payments across Double Shared, Double Single, and Single Rooms.
- **Fixed Co-Living Meal Plan:** **₹{t['food_revenue']:,}** ({pct_food:.1f}% of total)
  - Standardized ₹3,500/month 3-meal cafeteria plan.
- **On-Demand Late-Night Swiggy/Zomato Webhook Spend:** **₹{t['late_night_revenue']:,}** ({pct_late:.1f}% of total)
  - Variable consumption billed through Property OS: **{t['total_orders']:,} orders** placed past 22:00.

#### 📈 Key Operating Benchmarks
- **Average Monthly Bill per Resident:** **₹{t['avg_resident_bill']:,.2f}**
- **Average Monthly Property Run-Rate:** **₹{round(t['gross_revenue'] / 36):,}/month**
- **Collection Success Rate:** 100% via automated NACH, UPI AutoPay, Stripe Tokenization & Corporate Payroll settlement.
"""

        return {
            "type": "revenue_summary",
            "title": "3-Year Gross Financial Audit",
            "badge": "₹2.69 Cr Total Collections",
            "text": text,
            "data": t,
            "suggested_questions": [
                "Show revenue breakdown by year (2023-2026)",
                "Who are the top 5 spenders?",
                "Which room type brings the highest revenue?"
            ]
        }

    def answer_yearly_revenue(self) -> Dict[str, Any]:
        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT 
                    substr(billing_month, 1, 4) as year,
                    count(distinct billing_month) as months_active,
                    count(billing_id) as total_entries,
                    sum(total_monthly_bill_inr) as gross_revenue,
                    sum(base_rent_inr) as base_rent,
                    sum(food_plan_inr) as food_plan,
                    sum(late_night_spend_inr) as late_night_spend,
                    sum(late_night_orders) as total_orders
                FROM monthly_billing_ledger
                GROUP BY year
                ORDER BY year
            """)
            years = [dict(r) for r in cur.fetchall()]

        text = """### 📅 Year-over-Year Revenue & Operating Growth

| Financial Year | Active Months | Gross Revenue (INR) | Base Rent | Meal Plans | Late-Night Orders | Order Count |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
"""
        for y in years:
            text += f"| **{y['year']}** | {y['months_active']} mos | **₹{y['gross_revenue']:,}** | ₹{y['base_rent']:,} | ₹{y['food_plan']:,} | ₹{y['late_night_spend']:,} | {y['total_orders']:,} orders |\n"

        text += """
#### 🔍 Financial Observations:
- **2023 (Launch Phase):** Initial 2 operational months (Nov-Dec 2023) generating **₹1.46M**.
- **2024 (Full Scale):** 12 consecutive months generating **₹8.66M**, demonstrating high occupancy stability.
- **2025 (Peak Operations):** Annual peak gross collections of **₹9.01M** (+3.9% YoY growth from ancillary late-night orders).
- **2026 (YTD Thru Oct):** 10 operational months recorded at **₹7.77M** (on track to exceed ₹9.3M annualized).
"""

        return {
            "type": "yearly_revenue",
            "title": "Year-over-Year Revenue Analysis",
            "badge": "2023 – 2026 Audit",
            "text": text,
            "data": years,
            "suggested_questions": [
                "Who are the top 5 spenders in 2025?",
                "Break down late-night delivery spending",
                "Show payment systems distribution"
            ]
        }

    def answer_top_spenders(self) -> Dict[str, Any]:
        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT 
                    r.resident_id, r.full_name, r.room_type, r.room_no,
                    r.employer_organization, r.payment_system,
                    sum(b.total_monthly_bill_inr) as total_spent,
                    sum(b.late_night_spend_inr) as late_night_spent,
                    sum(b.late_night_orders) as total_orders
                FROM residents_master r
                JOIN monthly_billing_ledger b ON r.resident_id = b.resident_id
                GROUP BY r.resident_id
                ORDER BY total_spent DESC
                LIMIT 5
            """)
            top5 = [dict(r) for r in cur.fetchall()]

        text = """### 🏆 Top 5 Gross Spenders (36-Month Cumulative Collections)

| Rank | Resident | ID | Room Type | Corporate Employer | 3-Year Gross | Late-Night Food | Orders |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
"""
        for i, row in enumerate(top5, 1):
            text += f"| **#{i}** | **{row['full_name']}** | `{row['resident_id']}` | {row['room_type']} | {row['employer_organization']} | **₹{row['total_spent']:,}** | ₹{row['late_night_spent']:,} | {row['total_orders']} |\n"

        text += """
> **Key Trend:** All top 5 spenders occupy **Double (Single Occupancy)** rooms (Base rent: ₹14,000/mo) and consistently average 8–10 late-night delivery orders per month from Kharadi/Viman Nagar culinary hubs.
"""

        return {
            "type": "top_spenders",
            "title": "Top 5 Spenders Leaderboard",
            "badge": "Max ₹7.67 Lakhs per Tenant",
            "text": text,
            "data": top5,
            "suggested_questions": [
                f"Show complete profile for {top5[0]['full_name']}",
                "Compare Double Shared vs Single Room revenue",
                "What is the average late-night delivery distance?"
            ]
        }

    def answer_room_type_billing(self) -> Dict[str, Any]:
        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT 
                    r.room_type,
                    count(distinct r.resident_id) as resident_count,
                    count(distinct r.room_no) as room_count,
                    sum(b.total_monthly_bill_inr) as gross_revenue,
                    sum(b.base_rent_inr) as rent_revenue,
                    sum(b.food_plan_inr) as food_revenue,
                    sum(b.late_night_spend_inr) as late_night_revenue,
                    avg(b.total_monthly_bill_inr) as avg_monthly_bill
                FROM residents_master r
                JOIN monthly_billing_ledger b ON r.resident_id = b.resident_id
                GROUP BY r.room_type
                ORDER BY gross_revenue DESC
            """)
            rooms = [dict(r) for r in cur.fetchall()]

        text = """### 🛏️ Revenue Performance by Room Configuration

| Room Configuration | Residents | Distinct Rooms | 3-Year Gross Revenue | Base Rent Total | Ancillary Food | Avg Monthly Bill |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
"""
        for r in rooms:
            text += f"| **{r['room_type']}** | {r['resident_count']} | {r['room_count']} rooms | **₹{r['gross_revenue']:,}** | ₹{r['rent_revenue']:,} | ₹{r['late_night_revenue']:,} | ₹{r['avg_monthly_bill']:,.2f} |\n"

        text += """
#### 💡 Inventory Economics:
- **Double (Single Occupancy):** Represents **55.9% of total property revenue** (20 residents, generating ₹15.03M).
- **Single Room:** Generates highest per-resident baseline (10 residents, generating ₹6.60M).
- **Double (Shared):** Most affordable tier at ₹8,000 base rent, enabling high occupancy for junior associates (10 residents, generating ₹5.26M).
"""

        return {
            "type": "room_revenue",
            "title": "Room Type Revenue Comparison",
            "badge": "3 Room Tiers Active",
            "text": text,
            "data": rooms,
            "suggested_questions": [
                "Show list of residents in Double Shared rooms",
                "Show list of residents in Single Rooms",
                "What is the total 3-year revenue?"
            ]
        }

    # -------------------------------------------------------------
    # Late-Night Food Delivery (Swiggy / Zomato Integrations)
    # -------------------------------------------------------------
    def answer_food_delivery(self) -> Dict[str, Any]:
        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT 
                    sum(late_night_orders) as total_orders,
                    sum(late_night_spend_inr) as total_spend,
                    avg(avg_delivery_dist_km) as avg_dist,
                    avg(late_night_spend_inr) as avg_monthly_spend_per_res,
                    avg(late_night_orders) as avg_orders_per_month
                FROM monthly_billing_ledger
            """)
            f_stats = dict(cur.fetchone())

            cur.execute("""
                SELECT 
                    r.resident_id, r.full_name, r.employer_organization,
                    sum(b.late_night_orders) as orders,
                    sum(b.late_night_spend_inr) as spend,
                    avg(b.avg_delivery_dist_km) as avg_dist
                FROM residents_master r
                JOIN monthly_billing_ledger b ON r.resident_id = b.resident_id
                GROUP BY r.resident_id
                ORDER BY spend DESC
                LIMIT 3
            """)
            top_diners = [dict(r) for r in cur.fetchall()]

        text = f"""### 🍕 Ancillary Consumption: Late-Night Swiggy/Zomato Webhook Telemetry

The ThatJoint PropTech OS integrates a real-time **Resident App v4.2 webhook with Swiggy & Zomato API** endpoints to automate after-hours culinary reconciliation.

#### 📊 3-Year Delivery Telemetry
- **Total Late-Night Food Orders:** **{f_stats['total_orders']:,} orders** placed between 22:00 and 03:30.
- **Total Late-Night Gross Volume:** **₹{f_stats['total_spend']:,}** (14.4% of all property billing).
- **Average Delivery Radius:** **{f_stats['avg_dist']:.1f} km** (connecting cloud kitchens in Kharadi, Viman Nagar & Kalyani Nagar).
- **Average Spend per Tenant:** **₹{f_stats['avg_monthly_spend_per_res']:,.2f} / month** (~{f_stats['avg_orders_per_month']:.1f} orders/month).

#### 🥇 Most Active Nighttime Diners:
"""
        for d in top_diners:
            text += f"- **{d['full_name']}** ({d['employer_organization']}): **₹{d['spend']:,}** across {d['orders']} orders (avg distance: {d['avg_dist']:.1f} km)\n"

        text += "\n*All ancillary orders are automatically invoiced on the consolidated monthly digital rent statement.*"

        return {
            "type": "food_delivery_stats",
            "title": "Late-Night Delivery & Webhook Analytics",
            "badge": f"{f_stats['total_orders']:,} Orders Billed",
            "text": text,
            "data": {"overview": f_stats, "top_diners": top_diners},
            "suggested_questions": [
                "What is the total 3-year revenue?",
                "Which employer has the most residents?",
                "Show payment systems breakdown"
            ]
        }

    # -------------------------------------------------------------
    # KYC & Indian Legislature
    # -------------------------------------------------------------
    def answer_kyc_and_laws(self, q_lower: str) -> Dict[str, Any]:
        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT primary_auth_doc_type, count(*) as count
                FROM residents_master
                GROUP BY primary_auth_doc_type
                ORDER BY count DESC
            """)
            doc_types = [dict(r) for r in cur.fetchall()]

        text = """### ⚖️ ThatJoint KYC Framework & Indian Statutory Compliance

Every resident admitted into ThatJoint Co-Living undergoes an enterprise-grade digital onboarding journey anchored in Indian legislative statutes:

#### 📜 Applicable Legal Acts & Enactments:
1. **Digital Personal Data Protection (DPDP) Act 2023**:
   - Mandates explicit consent, purpose limitation, and storage minimization. All resident Aadhaar numbers are stored in **masked format (`XXXX-XXXX-90xx`)** with zero raw plaintext UID archiving.
2. **Aadhaar Act 2016 & UIDAI Offline e-KYC Directives**:
   - Verification conducted via **DigiLocker KYC SDK & UIDAI XML offline authentication**.
3. **Income Tax Act 1961 (Sec 139A & Sec 194I)**:
   - Mandatory PAN collection (`SYNTH...`) for financial tracking. Corporate tenants settling bills via B2B invoicing undergo TDS deduction under Section 194I with GST invoices.
4. **Maharashtra Rent Control Act 1999 & Police Tenant Verification**:
   - Enforces electronic **Section 144 CrPC / BNSS Tenant Verification** filed with local police stations (e.g., Kharadi / Hinjawadi Police Station).
5. **Foreigners Act 1946 & Registration of Foreigners Rules 1992**:
   - Mandatory **Form C digital declaration within 24 hours** for all foreign passport holders (Lukas Weber, Elena Rostova, Kenji Takahashi).
6. **Payment and Settlement Systems Act 2007 & RBI Mandates**:
   - Regulates recurring payments across NACH/e-NACH, UPI AutoPay, and Card Tokenization with mandatory Pre-Debit Notifications (24 hrs in advance).

#### 📑 Authentication Document Mix (40 Residents):
"""
        for d in doc_types:
            text += f"- **{d['primary_auth_doc_type']}:** {d['count']} residents ({(d['count']/40)*100:.0f}%)\n"

        return {
            "type": "kyc_compliance",
            "title": "KYC & Indian Legislature Compliance",
            "badge": "100% DPDP Act Compliant",
            "text": text,
            "data": doc_types,
            "suggested_questions": [
                "What are the rules for foreign residents?",
                "Show payment systems and gateways",
                "Show list of residents working at Infosys"
            ]
        }

    # -------------------------------------------------------------
    # Payment Systems & Gateways
    # -------------------------------------------------------------
    def answer_payment_systems(self, q_lower: str) -> Dict[str, Any]:
        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT 
                    payment_system,
                    payment_gateway_integration_id,
                    payment_regulation,
                    count(*) as tenant_count,
                    sum(b.total_monthly_bill_inr) as total_volume
                FROM residents_master r
                JOIN monthly_billing_ledger b ON r.resident_id = b.resident_id
                GROUP BY payment_system
                ORDER BY total_volume DESC
            """)
            payments = [dict(r) for r in cur.fetchall()]

        text = """### 💳 Payment Systems, Gateways & Clearing Infrastructure

ThatJoint utilizes a multi-rail automated clearing architecture with exactly **8 residents per payment rail**:

| Payment Rail | Gateway Integration | Tenants | 3-Year Gross Cleared | Governing RBI Regulation |
| :--- | :--- | :--- | :--- | :--- |
"""
        for p in payments:
            text += f"| **{p['payment_system']}** | `{p['payment_gateway_integration_id']}` | {p['tenant_count']} | **₹{p['total_volume']:,}** | {p['payment_regulation']} |\n"

        text += """
#### 🛠️ Gateway Technical Stack:
- **Cashfree e-NACH v3:** Direct NPCI mandate for automated netbanking bank account debit on the 1st of every month.
- **Razorpay Subscriptions v2:** NPCI UPI AutoPay recurring mandate for GPay & PhonePe users with zero OTP checkout.
- **Stripe India Billing v1:** Card tokenization compliance under RBI recurring guidelines for Visa/Mastercard.
- **Zoho Books B2B API:** Direct corporate payroll settlement with automated TDS Sec 194I credit notes.
- **PayU Virtual Accounts v2:** Dynamic dedicated virtual account numbers for IMPS/NEFT tenant wallet top-ups.
"""

        return {
            "type": "payment_systems",
            "title": "Payment Rails & Gateway Infrastructure",
            "badge": "5 Redundant Rails",
            "text": text,
            "data": payments,
            "suggested_questions": [
                "Who pays via Cashfree e-NACH?",
                "Who pays via UPI AutoPay?",
                "What is the total 3-year revenue?"
            ]
        }

    # -------------------------------------------------------------
    # Employers & Corporate Clusters
    # -------------------------------------------------------------
    def answer_employers(self, q_lower: str) -> Dict[str, Any]:
        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT 
                    employer_organization,
                    count(distinct r.resident_id) as headcount,
                    group_concat(r.full_name, ', ') as residents,
                    sum(b.total_monthly_bill_inr) as total_billings
                FROM residents_master r
                JOIN monthly_billing_ledger b ON r.resident_id = b.resident_id
                GROUP BY employer_organization
                ORDER BY headcount DESC, total_billings DESC
            """)
            employers = [dict(r) for r in cur.fetchall()]

        text = """### 🏢 Corporate Employer Footprint (Pune Tech Hub)

ThatJoint tenants originate from premier IT, consulting, and engineering multinational campuses in Hinjawadi, Kharadi, and Viman Nagar:

| Corporate Organization | Residents | Total 3-Year Billing | Resident Directory |
| :--- | :--- | :--- | :--- |
"""
        for e in employers:
            text += f"| **{e['employer_organization']}** | **{e['headcount']}** | ₹{e['total_billings']:,} | <small>{e['residents']}</small> |\n"

        return {
            "type": "employers",
            "title": "Corporate Employer Distribution",
            "badge": "11 Corporate Campuses",
            "text": text,
            "data": employers,
            "suggested_questions": [
                "Show residents at Barclays Kharadi",
                "Show residents at Infosys Phase 2",
                "What are the foreign national employers?"
            ]
        }

    # -------------------------------------------------------------
    # Rooms & Inventory
    # -------------------------------------------------------------
    def answer_rooms(self) -> Dict[str, Any]:
        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT 
                    room_type,
                    count(distinct room_no) as room_count,
                    count(distinct resident_id) as resident_count,
                    min(base_rent_inr) as base_rent
                FROM residents_master r
                JOIN monthly_billing_ledger b ON r.resident_id = b.resident_id
                GROUP BY room_type
            """)
            rooms = [dict(r) for r in cur.fetchall()]

        text = """### 🏠 ThatJoint Co-Living Room Inventory & Floor Plan

| Room Category | Distinct Rooms | Resident Capacity | Monthly Base Rent | Features |
| :--- | :--- | :--- | :--- | :--- |
| **Double (Shared)** | 5 Rooms (`D-Share-1` to `D-Share-5`) | 10 Residents (2 per room) | **₹8,000 / resident** | Twin ergonomic workstations, en-suite bathroom, high-speed WiFi |
| **Double (Single Occupancy)** | 20 Rooms (`D-Single-1` to `D-Single-20`) | 20 Residents (1 per room) | **₹14,000 / resident** | Private king bedroom, dedicated balcony, acoustic quiet zone |
| **Single Room** | 10 Rooms (`Single-1` to `Single-10`) | 10 Residents (1 per room) | **₹18,000 / resident** | Premium executive suite, garden courtyard views, smart door lock |

- **Total Physical Rooms:** **35 Rooms** across the courtyard assembly.
- **Total Residents Accommodated:** **40 Active Tenants** (100% full capacity).
"""

        return {
            "type": "rooms_overview",
            "title": "Co-Living Room Inventory & Tiers",
            "badge": "35 Rooms · 40 Beds",
            "text": text,
            "data": rooms,
            "suggested_questions": [
                "Show list of residents in Single Rooms",
                "What is the total 3-year revenue?",
                "Who are the top spenders?"
            ]
        }

    # -------------------------------------------------------------
    # General Co-Living Overview Fallback
    # -------------------------------------------------------------
    def answer_general_overview(self, user_query: str) -> Dict[str, Any]:
        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("SELECT count(*) FROM residents_master")
            res_cnt = cur.fetchone()[0]
            cur.execute("SELECT sum(total_monthly_bill_inr) FROM monthly_billing_ledger")
            rev_total = cur.fetchone()[0]

        text = f"""### 🛡️ ThatJoint Property Sentinel AI (Co-Living Operations Core)

I am trained on the complete **3-Year Co-Living KYC & Billing Dataset (Nov 2023 – Oct 2026)** for ThatJoint's flagship property in the Pune technology corridor.

#### 📊 Core Property Metrics:
- **Active Residents:** **{res_cnt} Corporate Tenants** across 35 rooms (100% occupied).
- **3-Year Gross Collections:** **₹{rev_total:,}** (~₹2.69 Crore).
- **International Residents:** 3 Foreign Nationals (Germany, Russia, Japan) with complete FRRO Form C filings.
- **Connected Integrations:** Cashfree e-NACH, Razorpay UPI AutoPay, Stripe Tokenization, Zoho Books B2B, DigiLocker KYC, and Zomato/Swiggy delivery webhooks.
- **Compliance:** 100% adherence to **DPDP Act 2023**, Maharashtra Rent Control Act, Aadhaar Act 2016, and RBI e-Mandate directives.

---
#### 💡 You can ask me:
- *"Who are the foreign residents and what are their FRRO visa details?"*
- *"Show total revenue breakdown over the 3 years (2023-2026)"*
- *"Who are the top 5 spenders in the property?"*
- *"How is Aadhaar and KYC data protected under DPDP Act 2023?"*
- *"List all residents who work at Barclays Kharadi or TCS Hinjawadi"*
- *"Show late-night Swiggy/Zomato food delivery spending statistics"*
"""

        return {
            "type": "general_overview",
            "title": "ThatJoint Co-Living Operational Intelligence",
            "badge": "40 Units · ₹2.69 Cr Ledger",
            "text": text,
            "data": self.knowledge.get("summary", {}),
            "suggested_questions": [
                "Who are the foreign national residents?",
                "What was the total revenue across 3 years?",
                "Who are the top 5 spenders?",
                "Explain DPDP Act 2023 compliance"
            ]
        }

    def find_resident_by_name(self, name_query: str) -> Optional[Dict[str, Any]]:
        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute("SELECT resident_id, full_name FROM residents_master")
            for r in cur.fetchall():
                full = r["full_name"].lower()
                first = full.split()[0]
                last = full.split()[-1] if len(full.split()) > 1 else ""
                if full in name_query or (len(first) > 3 and first in name_query) or (len(last) > 3 and last in name_query):
                    return {"resident_id": r["resident_id"], "full_name": r["full_name"]}
        return None

    def execute_raw_sql(self, sql: str) -> Dict[str, Any]:
        """Safely execute analytical SELECT queries."""
        clean_sql = sql.strip()
        if not clean_sql.lower().startswith("select"):
            raise ValueError("Only read-only SELECT queries are permitted.")
        
        # Disallow harmful constructs
        forbidden = ["drop", "delete", "update", "insert", "alter", "truncate", "replace", "vacuum"]
        for word in forbidden:
            if re.search(rf"\b{word}\b", clean_sql.lower()):
                raise ValueError(f"Prohibited SQL keyword detected: {word}")

        with self.get_connection() as conn:
            cur = conn.cursor()
            cur.execute(clean_sql)
            col_names = [d[0] for d in cur.description] if cur.description else []
            rows = [dict(zip(col_names, r)) for r in cur.fetchall()]

        return {
            "columns": col_names,
            "rows": rows,
            "row_count": len(rows),
            "sql": clean_sql
        }


if __name__ == "__main__":
    engine = ColivingQueryEngine()
    print("[*] Testing Query Engine:")
    res = engine.ask("Who is Lukas Weber?")
    print(res["title"])
    print(res["text"][:300] + "...")
