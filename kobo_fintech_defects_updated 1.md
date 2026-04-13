# Kobo Fintech Database — Defect Analysis Report

## Overview
This document outlines critical defects identified in the Kobo Fintech database schema, seed data, stored procedures, and application behavior. These defects impact financial accuracy, security, data integrity, and user experience.

---

# Critical Defects (Financial & Security Risk)

## 1. FLOAT Used for Financial Calculations
- Affected columns:
  - Wallets.Balance
  - Products.FaceValue
  - TransactionLedger.Amount
  - CommissionAmount

Issue:
FLOAT introduces rounding errors.

Impact:
- Incorrect balances
- Settlement mismatches
- Regulatory risk

Fix:
DECIMAL(18,2)

---

## 2. No Balance Validation Before Debit

Issue:
- No check for sufficient funds

Impact:
- Negative balances
- Financial loss

---

## 3. No Transaction Handling (Atomicity Issue)

Process:
1. Deduct wallet balance  
2. Insert ledger entry  
3. Generate voucher  

Issue:
- No BEGIN TRANSACTION

Impact:
- Partial failures → money deducted without voucher  
- Ghost transactions

---

## 4. No Service Status Validation

Issue:
- Disabled/Suspended users can transact

Impact:
- Fraud risk
- Policy violations

---

## 5. No Role-Based Access Control (RBAC)

Critical Finding:
Merchants can access the Settlements ledger

Issue:
- No restriction on:
  - Settlements
  - TransactionLedger
  - AuditLog

Impact:
- Exposure of sensitive financial data
- Merchants can view other merchants' settlements
- Regulatory violations (POPIA/GDPR)

Severity: CRITICAL

---

# Data Integrity Defects

## 6. Invalid MSISDN Formats
Examples:
- Too short
- Too long
- Contains letters

Impact:
- Failed transactions
- Invalid user records

---

## 7. Duplicate Transaction References

Issue:
- ExternalReference is not unique

Impact:
- Duplicate processing
- Idempotency failure

---

## 8. Duplicate Commission Rules

Issue:
- Same Product + Tier appears twice

Impact:
- Incorrect commission calculations

---

## 9. Settlement Calculation Errors

Example:
- Gross = 9500  
- Commission = 475  
- Net = 8900 (Incorrect)

Impact:
- Financial reporting inaccuracies

---

## 10. Negative Wallet Balances

Issue:
- Wallets can go below zero

Impact:
- Indicates broken business rules

---

# Business Logic Defects

## 11. Ghost Transactions
- Transactions exist without vouchers

Impact:
- Customers charged without receiving value

---

## 12. Expired Vouchers Not Filtered

Issue:
- Expired vouchers still returned

Impact:
- Customer dissatisfaction
- Invalid product delivery

---

## 13. Merchant Status Ignored

Issue:
- Suspended/Deactivated merchants can transact

Impact:
- Unauthorized operations

---

## 14. Incorrect Commission Tier Usage

Issue:
- Only Standard tier used

Impact:
- Incorrect payouts

---

## 15. Incorrect Commission Calculation

Issue:
- The system calculates and stores commission values that do not align with the expected formula

Impact:
- Financial discrepancies
- Incorrect merchant payouts
- Reporting inconsistencies

---

# Application & Security Defects

## 16. Session Timeout Failure

Issue:
- After session expiry or cookie clearing, the user remains authenticated

Impact:
- Security vulnerability
- Unauthorized access risk

---

## 17. Phone Number Validation Defect

Issue:
- System accepts invalid phone number formats (e.g., numbers with spaces or letters)

Impact:
- Data integrity issues
- Failed communications and transactions

---

## 18. Quantity Increment Page Reload Defect

Issue:
- Increasing product quantity triggers full page reload instead of dynamic update

Impact:
- Poor user experience
- Slower transaction flow
- Increased friction during bulk purchases

---

# Architecture & Design Defects

## 19. No Unique Constraint on ExternalReference

Fix:
UNIQUE (ExternalReference)

---

## 20. No Indexing Strategy

Issue:
- Large tables (e.g. TransactionLedger)

Impact:
- Slow queries
- Poor scalability

---

## 21. Audit Log Not Enforced

Issue:
- No triggers or enforcement

Impact:
- No traceability of actions

---

## 22. Weak Voucher PIN Generation

Issue:
- Predictable
- Not secure

Impact:
- Fraud risk

---

# Top 5 Critical Risks

1. FLOAT used for financial calculations  
2. No transaction handling (atomicity failure)  
3. No balance validation  
4. No RBAC (Merchants accessing settlements ledger)  
5. Session timeout failure  

---

# Executive Summary

The Kobo Fintech system contains multiple high-risk defects affecting financial accuracy, data security, system integrity, and user experience.

The most severe issues include lack of role-based access control, improper financial calculations, and session management failures. These expose the platform to financial loss, data breaches, and regulatory non-compliance.
