-- returns all transaction without a digital voucher

SELECT tl.*
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv
    ON tl.EntryID = dv.EntryID
WHERE tl.ProcessingStatus = 'Completed'
  AND dv.EntryID IS NULL;

 --returns all ghost transactions with txn id, wallet id, username and amount 

 SELECT tl.EntryID, w.WalletID, u.UserID, u.FullName, tl.Amount
FROM TransactionLedger tl
JOIN Wallets w ON tl.WalletID = w.WalletID
JOIN Users u ON w.UserID = u.UserID
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE tl.ProcessingStatus = 'Completed'
  AND dv.EntryID IS NULL; 

-- returns all completed ghost transaction

 SELECT *
FROM TransactionLedger tl
WHERE tl.ProcessingStatus = 'Completed'
  AND NOT EXISTS (
      SELECT 1
      FROM DigitalVouchers dv
      WHERE dv.EntryID = tl.EntryID
  );

  -- returns total count of ghost transactions

  SELECT COUNT(*) AS GhostTransactionCount
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE tl.ProcessingStatus = 'Completed'
  AND dv.EntryID IS NULL;

  -- returns total sum amount of ghost tranasctions

  SELECT SUM(tl.Amount) AS TotalGhostValue
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE tl.ProcessingStatus = 'Completed'
  AND dv.EntryID IS NULL;

 -- returns ghost transactions per user

SELECT u.UserID, u.FullName, COUNT(*) AS GhostCount
FROM TransactionLedger tl
JOIN Wallets w ON tl.WalletID = w.WalletID
JOIN Users u ON w.UserID = u.UserID
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE tl.ProcessingStatus = 'Completed'
  AND dv.EntryID IS NULL
GROUP BY u.UserID, u.FullName;  

-- returns ghost transactions from most recent to oldest

SELECT *
FROM TransactionLedger tl
WHERE tl.ProcessingStatus = 'Completed'
  AND NOT EXISTS (
      SELECT 1 FROM DigitalVouchers dv WHERE dv.EntryID = tl.EntryID
  )
ORDER BY tl.CreatedTimestamp DESC;

-- returns  how many transactions by grouping product description and counting how many such missing voucher records exist per product.

SELECT p.Description, COUNT(*) AS GhostCount
FROM TransactionLedger tl
JOIN Products p ON tl.ProductID = p.ProductID
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE tl.ProcessingStatus = 'Completed'
  AND dv.EntryID IS NULL
GROUP BY p.Description;

-- returns entry ids for completed ghost transactions

SELECT EntryID
FROM TransactionLedger
WHERE ProcessingStatus = 'Completed'

EXCEPT

SELECT EntryID
FROM DigitalVouchers;

-- returns ghost transactions that have zero voucher count

SELECT *
FROM (
    SELECT tl.*, 
           COUNT(dv.EntryID) OVER (PARTITION BY tl.EntryID) AS voucher_count
    FROM TransactionLedger tl
    LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
    WHERE tl.ProcessingStatus = 'Completed'
) t
WHERE voucher_count = 0;

-- returns ghost transactions for disabled users

SELECT tl.EntryID, u.UserID, u.ServiceStatus
FROM TransactionLedger tl
JOIN Wallets w ON tl.WalletID = w.WalletID
JOIN Users u ON w.UserID = u.UserID
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE dv.EntryID IS NULL
  AND tl.ProcessingStatus = 'Completed'
  AND u.ServiceStatus IN ('Disabled', 'Suspended');

  -- ghost transactions with duplicate references

  SELECT tl.ExternalReference, COUNT(*) AS CountRef
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE dv.EntryID IS NULL
  AND tl.ProcessingStatus = 'Completed'
GROUP BY tl.ExternalReference
HAVING COUNT(*) > 1;

-- returns daily count of ghost transactions completed

SELECT CAST(tl.CreatedTimestamp AS DATE) AS TxDate, COUNT(*) AS Ghosts
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE dv.EntryID IS NULL
  AND tl.ProcessingStatus = 'Completed'
GROUP BY CAST(tl.CreatedTimestamp AS DATE)
ORDER BY TxDate;

-- returns list of all ghost tramsactions with amount and commission

SELECT tl.EntryID, tl.Amount, tl.CommissionAmount
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE dv.EntryID IS NULL
  AND tl.ProcessingStatus = 'Completed';

  -- returns detailed report for ghost transactions

  SELECT 
    tl.EntryID,
    u.FullName,
    p.Description,
    tl.Amount,
    tl.CommissionAmount,
    tl.CreatedTimestamp
FROM TransactionLedger tl
JOIN Wallets w ON tl.WalletID = w.WalletID
JOIN Users u ON w.UserID = u.UserID
JOIN Products p ON tl.ProductID = p.ProductID
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE tl.ProcessingStatus = 'Completed'
  AND dv.EntryID IS NULL
ORDER BY tl.CreatedTimestamp DESC;

