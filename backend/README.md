# 🏢 ThatJoint AI Co-Living Backend Service

A high-performance, multithreaded backend service and AI query synthesis engine grounded in the **3-Year Co-Living KYC & Billing Dataset** (`coliving_3year_full_kyc_billing.sql`). Built with pure Python 3 standard library (zero external dependencies).

---

## 🚀 Quick Start

### 1. Run the Backend Server
```bash
# Start backend server on port 8000 (default)
./backend/run.sh

# Or start on custom port / host
./backend/run.sh --port 8080 --host 0.0.0.0

# Direct python execution
python3 backend/server.py --port 8000
```

### 2. Run the Automated Test Suite (21 Tests)
```bash
./backend/run.sh --test
# or
python3 backend/test_backend.py
```

### 3. Re-ingest SQL Dataset into SQLite
```bash
./backend/run.sh --ingest
# or
python3 backend/ingest.py
```

---

## 🗄️ Grounded Dataset Schema

The backend is grounded in real operational data from ThatJoint's 3-year co-living facility in Pune's high-density tech corridor (Hinjawadi, Kharadi, Viman Nagar, Magarpatta):

- **Residents Master (`residents_master`)**:
  - **40 Working Tech Residents**: 37 Indian nationals + 3 Foreign nationals.
  - **Foreign Nationals**:
    - `RES-007`: **Lukas Weber** (German, Siemens Technology India, Room `D-Share-4`, FRRO Ref `FRRO-MH-PUN-2023-88412`).
    - `RES-019`: **Elena Rostova** (Russian, Infosys BPM Pune, Room `D-Single-9`, FRRO Ref `FRRO-MH-PUN-2024-11904`).
    - `RES-034`: **Kenji Takahashi** (Japanese, KPIT Technologies, Room `Single-4`, FRRO Ref `FRRO-MH-PUN-2023-55319`).
  - **Room Distribution**: 35 physical rooms (5 Double Shared at ₹8,000/mo, 20 Double Single Occupancy at ₹14,000/mo, 10 Single Rooms at ₹18,000/mo).
  - **Payment Rails**: Exactly 8 residents on each of 5 payment gateways:
    1. Cashfree e-NACH Auto-Debit (`CASHFREE_ENACH_v3`)
    2. Razorpay UPI AutoPay (`RAZORPAY_SUB_API_v2`)
    3. Stripe Tokenization for Cards (`STRIPE_IN_BILLING_v1`)
    4. Zoho Books Corporate B2B Payroll (`ZOHO_BOOKS_B2B_API`)
    5. PayU Virtual Accounts for IMPS/NEFT (`PAYU_VIRTUAL_ACCT_v2`)
- **Monthly Billing Ledger (`monthly_billing_ledger`)**:
  - **1,440 reconciled billing records** spanning **36 consecutive months** (`2023-11` to `2026-10`).
  - **Gross Revenue**: **₹2,69,02,673 (₹2.69 Cr)**
    - Base Rent: ₹17,793,000 (66.1%)
    - Meal Plans: ₹5,244,480 (19.5%)
    - Late-Night Food Delivery Surcharges: ₹3,865,193 (14.4%)
  - **Late-Night Food Delivery Webhooks**: 10,471 Swiggy/Zomato orders, average ticket ₹369.13, average delivery radius 5.3 km.
  - **Top Spenders**:
    1. Aditi Menon (`RES-022`): ₹767,922 (324 orders, TCS Hinjawadi)
    2. Sneha Pillai (`RES-016`): ₹766,220 (305 orders, Barclays Kharadi)
    3. Nikhil Singh (`RES-013`): ₹764,575 (302 orders, Persistent Systems)
    4. Aditya Shah (`RES-011`): ₹762,537 (292 orders, Bajaj Finserv)
    5. Abhishek Verma (`RES-027`): ₹760,183 (278 orders, Bajaj Finserv)

---

## 📡 REST API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | `GET` | Health check, uptime, and database row counters |
| `/api/chat` | `POST` | AI Query synthesis & natural language retrieval |
| `/api/residents` | `GET` | Query residents list (filters: `nationality`, `employer`, `room_type`, `payment_system`, `q`) |
| `/api/residents/<id>` | `GET` | Complete resident dossier with masked KYC, FRRO, and employer details |
| `/api/billing/summary` | `GET` | Overall 3-year financial KPIs, totals, and breakdown |
| `/api/billing/monthly` | `GET` | Month-by-month financial ledger (36 months) |
| `/api/billing/resident/<id>` | `GET` | 36-month ledger history for an individual resident |
| `/api/kyc/compliance` | `GET` | Statutory compliance summary (Form C, DPDP Act 2023, Police Verification) |
| `/api/analytics/late-night` | `GET` | Swiggy & Zomato late-night delivery order analytics |
| `/api/sql` | `POST` | Safe read-only SQL execution sandbox (`SELECT` queries only) |

### Sample POST `/api/chat`
```json
{
  "query": "What is the total revenue over 3 years?",
  "history": []
}
```
**Response:**
```json
{
  "ok": true,
  "author": "THΛTJOINT Co-Living Engine · Live Grounded (coliving_3year_full_kyc_billing.sql)",
  "title": "3-Year Gross Financial Performance (₹26,902,673)",
  "body": "<strong>Consolidated Revenue Ledger Breakdown (36 Months):</strong><br />• <strong>Gross Revenue:</strong> <strong>₹2,69,02,673 (₹2.69 Cr)</strong>...",
  "richCard": {
    "title": "3-Year Financial & Operational Audit",
    "badge": "Reconciled 100%",
    "params": [
      { "label": "Gross Revenue", "value": "₹2.69 Cr", "sub": "₹26,902,673" },
      { "label": "Active Residents", "value": "40", "sub": "3 Foreign Nationals" },
      { "label": "Delivery Spend", "value": "₹38.65 L", "sub": "10,471 orders" },
      { "label": "Rooms / Capacity", "value": "35 / 40 Beds", "sub": "100% Occupancy" }
    ],
    "actions": [
      { "label": "Top Spenders", "action": "query", "payload": "Who are the top 5 spenders?" },
      { "label": "Foreign Residents KYC", "action": "query", "payload": "Lukas Weber KYC" }
    ]
  },
  "intent": "revenue_summary"
}
```

---

## ⚖️ Indian Statutory Compliance Grounding

1. **Digital Personal Data Protection (DPDP) Act 2023**:
   - Aadhaar numbers stored in masked format (`XXXX-XXXX-1234`) adhering to UIDAI offline e-KYC guidelines.
   - Resident consent and purpose limitation enforced under Section 4 and Section 8.
2. **Foreigners Act 1946 & Form C**:
   - Mandatory electronic Form C reporting within 24 hours of arrival on the Bureau of Immigration BoI portal for all foreign nationals.
3. **FEMA 1999 (Foreign Exchange Management Act)**:
   - Non-Resident Ordinary (NRO) bank account validation and authorized dealer payment receipts for foreign national lease rent.
4. **Section 144 CrPC / BNSS Tenant Verification**:
   - Pune Police Commissionerate CCTNS tenant registration character certificates.
5. **Maharashtra Rent Control Act 1999 & Maharashtra Stamp Act**:
   - 11-month Leave & License agreements with formal electronic registration and stamp duty compliance.
