-- This query counts how many transactions each merchant has processed.
-- Useful for measuring merchant activity levels.

SELECT 
    m.BusinessName,
    COUNT(*) AS TotalTransactions
FROM TransactionLedger tl
JOIN Wallets w ON tl.WalletID = w.WalletID
JOIN Merchants m ON w.UserID = m.UserID
GROUP BY m.BusinessName;
