-- This query identifies merchants with the lowest number of transactions.
-- LEFT JOIN ensures merchants with zero transactions are included.

SELECT TOP 10
    m.BusinessName,
    COUNT(tl.EntryID) AS TotalTransactions
FROM Merchants m
LEFT JOIN Wallets w ON m.UserID = w.UserID
LEFT JOIN TransactionLedger tl ON w.WalletID = tl.WalletID
GROUP BY m.BusinessName
ORDER BY TotalTransactions ASC;
