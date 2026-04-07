-- all transaction without a digital voucher

SELECT tl.*
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv
    ON tl.EntryID = dv.EntryID
WHERE tl.ProcessingStatus = 'Completed'
  AND dv.EntryID IS NULL;

  -- wallet + user

 SELECT tl.EntryID, w.WalletID, u.UserID, u.FullName, tl.Amount
FROM TransactionLedger tl
JOIN Wallets w ON tl.WalletID = w.WalletID
JOIN Users u ON w.UserID = u.UserID
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE tl.ProcessingStatus = 'Completed'
  AND dv.EntryID IS NULL; 

  -- not exist

 SELECT *
FROM TransactionLedger tl
WHERE tl.ProcessingStatus = 'Completed'
  AND NOT EXISTS (
      SELECT 1
      FROM DigitalVouchers dv
      WHERE dv.EntryID = tl.EntryID
  );

  -- count total ghost transaction

  SELECT COUNT(*) AS GhostTransactionCount
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE tl.ProcessingStatus = 'Completed'
  AND dv.EntryID IS NULL;

  -- sum of ghost tranasctions

  SELECT SUM(tl.Amount) AS TotalGhostValue
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE tl.ProcessingStatus = 'Completed'
  AND dv.EntryID IS NULL;

  -- ghost transactions per user/names and count

SELECT u.UserID, u.FullName, COUNT(*) AS GhostCount
FROM TransactionLedger tl
JOIN Wallets w ON tl.WalletID = w.WalletID
JOIN Users u ON w.UserID = u.UserID
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE tl.ProcessingStatus = 'Completed'
  AND dv.EntryID IS NULL
GROUP BY u.UserID, u.FullName;  

-- recent ghost transactions/by desc timestamp

SELECT *
FROM TransactionLedger tl
WHERE tl.ProcessingStatus = 'Completed'
  AND NOT EXISTS (
      SELECT 1 FROM DigitalVouchers dv WHERE dv.EntryID = tl.EntryID
  )
ORDER BY tl.CreatedTimestamp DESC;

-- ghost by product

SELECT p.Description, COUNT(*) AS GhostCount
FROM TransactionLedger tl
JOIN Products p ON tl.ProductID = p.ProductID
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE tl.ProcessingStatus = 'Completed'
  AND dv.EntryID IS NULL
GROUP BY p.Description;

-- except method/entryId for ghosts

SELECT EntryID
FROM TransactionLedger
WHERE ProcessingStatus = 'Completed'

EXCEPT

SELECT EntryID
FROM DigitalVouchers;

--zero associated digital vouchers

SELECT *
FROM (
    SELECT tl.*, 
           COUNT(dv.EntryID) OVER (PARTITION BY tl.EntryID) AS voucher_count
    FROM TransactionLedger tl
    LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
    WHERE tl.ProcessingStatus = 'Completed'
) t
WHERE voucher_count = 0;

-- ghost for disabled users

SELECT tl.EntryID, u.UserID, u.ServiceStatus
FROM TransactionLedger tl
JOIN Wallets w ON tl.WalletID = w.WalletID
JOIN Users u ON w.UserID = u.UserID
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE dv.EntryID IS NULL
  AND tl.ProcessingStatus = 'Completed'
  AND u.ServiceStatus IN ('Disabled', 'Suspended');

  -- ghost with duplicate references

  SELECT tl.ExternalReference, COUNT(*) AS CountRef
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE dv.EntryID IS NULL
  AND tl.ProcessingStatus = 'Completed'
GROUP BY tl.ExternalReference
HAVING COUNT(*) > 1;

-- time-based anomaly detection

SELECT CAST(tl.CreatedTimestamp AS DATE) AS TxDate, COUNT(*) AS Ghosts
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE dv.EntryID IS NULL
  AND tl.ProcessingStatus = 'Completed'
GROUP BY CAST(tl.CreatedTimestamp AS DATE)
ORDER BY TxDate;

--joins with commissions

SELECT tl.EntryID, tl.Amount, tl.CommissionAmount
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE dv.EntryID IS NULL
  AND tl.ProcessingStatus = 'Completed';

  -- full audit reconcilliation query 

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

