-- Latest 1000 Completed Transactions
SELECT TOP 1000 *
FROM TransactionLedger
WHERE ProcessingStatus = 'Completed'
ORDER BY CreatedTimestamp DESC;


-- Recalculate Expected Commission
SELECT TOP 1000
    tl.EntryID,
    tl.Amount,
    tl.CommissionAmount,
    c.CommissionPercentage,
    (tl.Amount * c.CommissionPercentage / 100.0) AS ExpectedCommission
FROM TransactionLedger tl
JOIN Products p ON tl.ProductID = p.ProductID
JOIN Commissions c ON p.ProductID = c.ProductID
ORDER BY tl.CreatedTimestamp DESC;

-- Compare Stored vs Expected Commission
SELECT TOP 1000
    tl.EntryID,
    tl.CommissionAmount AS Stored,
    (tl.Amount * c.CommissionPercentage / 100.0) AS Expected,
    ABS(tl.CommissionAmount - (tl.Amount * c.CommissionPercentage / 100.0)) AS Variance
FROM TransactionLedger tl
JOIN Commissions c ON tl.ProductID = c.ProductID
ORDER BY tl.CreatedTimestamp DESC;



-- Final pass / fail validation with a tolerance of 1 cent
SELECT TOP 1000
    tl.EntryID,
    tl.CommissionAmount AS Stored,
    (tl.Amount * c.CommissionPercentage / 100.0) AS Expected,
    CASE 
        WHEN ABS(tl.CommissionAmount - (tl.Amount * c.CommissionPercentage / 100.0)) < 0.01 
        THEN 'PASS'
        ELSE 'FAIL'
    END AS ValidationStatus
FROM TransactionLedger tl
JOIN Commissions c ON tl.ProductID = c.ProductID
ORDER BY tl.CreatedTimestamp DESC;


-- Count failed transactions
SELECT  COUNT(*) AS FailedCount
FROM (
    SELECT 
        ABS(tl.CommissionAmount - (tl.Amount * c.CommissionPercentage / 100.0)) AS Variance
    FROM TransactionLedger tl
    JOIN Commissions c ON tl.ProductID = c.ProductID
) q
WHERE Variance >= 0.01;

-- Top 20 Variances for Investigation
SELECT TOP 20 
    tl.EntryID,
    tl.CommissionAmount,
    c.CommissionPercentage,
    ABS(tl.CommissionAmount - (tl.Amount * c.CommissionPercentage / 100.0)) AS Variance
FROM TransactionLedger tl
JOIN Commissions c ON tl.ProductID = c.ProductID
ORDER BY Variance DESC;


-- Check for duplicate commission rules
SELECT ProductID, MerchantTier, COUNT(*) AS RuleCount
FROM Commissions
WHERE IsActive = 1
GROUP BY ProductID, MerchantTier
HAVING COUNT(*) > 1;


-- Check for invalid commission percentages
SELECT *
FROM Commissions
WHERE CommissionPercentage < 0 OR CommissionPercentage > 100;

-- Check for transactions with zero commission
SELECT *
FROM TransactionLedger
WHERE CommissionAmount = 0;


-- Check for transactions where commission is not rounded to 2 decimal places
SELECT TOP 1000*
FROM TransactionLedger
WHERE CommissionAmount <> ROUND(CommissionAmount, 2)
order by CreatedTimestamp desc;


-- Compare Average Commission per Product
SELECT 
    ProductID,
    AVG(CommissionAmount) AS AvgCommission,
    AVG(Amount) AS AvgAmount
FROM TransactionLedger
GROUP BY ProductID;

-- Check for transactions with missing product references
SELECT *
FROM TransactionLedger tl
LEFT JOIN Products p ON tl.ProductID = p.ProductID
WHERE p.ProductID IS NULL;


-- Validate Commission per Merchant Tier
SELECT 
    u.AccountTier,
    AVG(tl.CommissionAmount) AS AvgCommission
FROM TransactionLedger tl
JOIN Wallets w ON tl.WalletID = w.WalletID
JOIN Users u ON w.UserID = u.UserID
GROUP BY u.AccountTier;


-- Settlement Aggregation Check
SELECT 
    SUM(Amount) AS TotalGross,
    SUM(CommissionAmount) AS TotalCommission,
    SUM(Amount) - SUM(CommissionAmount) AS ExpectedNet
FROM TransactionLedger
WHERE ProcessingStatus = 'Completed';


--check for any settlements where the net amount does not match gross minus commission 
SELECT 
    SettlementID,
    GrossAmount,
    CommissionAmount,
    NetAmount,
    (GrossAmount - CommissionAmount) AS ExpectedNet
FROM Settlements
WHERE NetAmount <> (GrossAmount - CommissionAmount);



--check for any transactions where the commission tier used does not match the user's account tier 
SELECT 
    tl.EntryID,
    u.AccountTier AS ActualTier,
    c.MerchantTier AS CommissionTierUsed,
    tl.CommissionAmount
FROM TransactionLedger tl
JOIN Wallets w ON tl.WalletID = w.WalletID
JOIN Users u ON w.UserID = u.UserID
JOIN Commissions c 
    ON tl.ProductID = c.ProductID
WHERE c.MerchantTier = 'Standard'
  AND u.AccountTier <> 'Standard';