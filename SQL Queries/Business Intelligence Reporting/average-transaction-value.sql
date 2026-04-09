-- This query calculates the average transaction amount across the system.
-- Provides insight into typical transaction size.

SELECT 
    AVG(Amount) AS AvgTransactionValue
FROM TransactionLedger;

