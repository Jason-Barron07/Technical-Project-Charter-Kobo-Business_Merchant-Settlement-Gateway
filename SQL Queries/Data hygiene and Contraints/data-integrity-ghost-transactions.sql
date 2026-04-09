-- This query detects "ghost transactions" where a transaction exists
-- but no corresponding digital voucher was generated.
-- This indicates a breakdown in the transaction-to-voucher process.

SELECT tl.EntryID
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE dv.EntryID IS NULL
AND tl.ProcessingStatus = 'Completed';
