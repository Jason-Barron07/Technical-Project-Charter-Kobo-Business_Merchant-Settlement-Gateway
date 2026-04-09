-- This query identifies users with the highest wallet balances.
-- Helps highlight high-value customers.

SELECT TOP 10
    u.FullName,
    w.Balance
FROM Wallets w
JOIN Users u ON w.UserID = u.UserID
ORDER BY w.Balance DESC;
