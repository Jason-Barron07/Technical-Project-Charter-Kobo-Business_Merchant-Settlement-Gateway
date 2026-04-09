-- This query identifies products with the lowest total sales.
-- Useful for detecting underperforming products that may need review.

SELECT 
    p.SKU,
    SUM(tl.Amount) AS TotalSales
FROM TransactionLedger tl
JOIN Products p ON tl.ProductID = p.ProductID
GROUP BY p.SKU
ORDER BY TotalSales ASC;
