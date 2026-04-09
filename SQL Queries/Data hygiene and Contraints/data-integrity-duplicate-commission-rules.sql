-- This query identifies duplicate commission rules for the same ProductID and MerchantTier.
-- There should only be one active commission rule per product per tier.
-- Multiple entries can cause incorrect commission calculations.

SELECT ProductID, MerchantTier, COUNT(*) AS Count
FROM Commissions
GROUP BY ProductID, MerchantTier
HAVING COUNT(*) > 1;
