-- This query calculates the total commission earned across all transactions.
-- Useful for financial and profitability analysis.

SELECT 
    SUM(CommissionAmount) AS TotalCommission
FROM TransactionLedger;
