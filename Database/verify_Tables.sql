SELECT TABLE_NAME, TABLE_TYPE
FROM KoboFintech.INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE';

SELECT COUNT(*) AS UserCount FROM KoboFintech.dbo.Users;


SELECT TOP 5 u.FullName, w.Balance, w.CurrencyCode
FROM KoboFintech.dbo.Users u
JOIN KoboFintech.dbo.Wallets w ON u.UserID = w.UserID
ORDER BY u.UserID;



SELECT w.WalletID, w.Balance, u.FullName
FROM KoboFintech.dbo.Wallets w
JOIN KoboFintech.dbo.Users u ON w.UserID = u.UserID
WHERE w.WalletID = 10;

SELECT COUNT(*) AS UserCount FROM KoboFintech.dbo.TransactionLedger;

SELECT * FROM KoboFintech.dbo.Wallets
ORDER BY  Balance; 