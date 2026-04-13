#  Kobo Business – Merchant & Settlement Gateway  
##  Quality Engineering Project (FLASH)

---

## Project Overview

This project focuses on validating the **Kobo Business Fintech Platform**, ensuring it is **robust, secure, and scalable** through:

- API Validation  
- UI Automation  
- Database Auditing  

---

## Environment Setup

### 🛠 Setup Steps

1. **Initialize Database**
   - Execute `Kobo.sql` from the `/Database` folder  
   - Confirm successful schema setup  

2. **Load Transactions**
   - Verify ingestion of **500+ historical transaction records**  

3. **Start API**
   ```
   npm install
   node server.js
   ```

4. **Access API Documentation**
   - Open **Swagger UI** via local endpoint  
   - Validate all endpoints are accessible  

---

## 🔌 API Testing (Postman – 50+ Automated Tests)

### Merchant Lifecycle
- Registration → Activation flow validation  
- Edge Case Testing:
  - Duplicate MSISDN  
  - Invalid inputs  
  - Incorrect data formats  

### Financial Logic
- Voucher issuance validation  
- Commission calculation accuracy  
- Real-time wallet deductions  

### Security Testing
- Privilege escalation attempts  
- Access control validation (RBAC)  

---

## 🎭 UI Automation (Playwright – 40+ Tests)

### Happy Path Testing
- Login → Balance Check → Voucher Purchase → Transaction Success  

### Negative Testing
- Invalid inputs  
- Session timeouts  
- Insufficient balance scenarios  

### 🔄 Cross-Role Testing
- Admin updates (e.g., commission changes)  
- Reflected accurately in Merchant dashboard  

---

## 🗄 Database Validation (SQL – 50+ Audit Queries)

### Financial Reconciliation
- Detect **ghost transactions**  
  - Wallet deduction without voucher record  

### Settlement Accuracy
- Validate commission calculations across transactions  

### Data Integrity Checks
- Duplicate transaction records  
- Invalid MSISDN format  

### Reporting & Insights
- Top merchants by revenue  
- Low-performing product SKUs  

---

## Git Workflow

### 🔀 Branching Strategy
- `main` → Stable, production-ready branch  
- `feature/*` → Development branches  

### Development Rules
- No direct commits to `main`  
- All changes via **Pull Requests (PRs)**  
- Mandatory **peer review before merge**  

### Benefits
- Traceability of all changes  
- Accountability across team members  
- Reduced regression risks  
- Improved collaboration  

---

## Team & Collaboration

- **Team Size:** 3 Quality Engineers  
- **Duration:** 1 Month  

### Focus Areas
- Collaboration  
- Code Reviews  
- Defect Tracking  
- Continuous Testing  

---

## Project Objective

To deliver a **high-quality fintech system** by combining:

- ✔️ API Validation  
- ✔️ UI Automation  
- ✔️ Database Auditing  

---

## Key Outcome

A **secure, reliable, and scalable Merchant & Settlement Gateway** aligned with fintech industry standards.
