-- This query checks for MSISDN values that are not exactly 11 digits long.
-- A valid South African MSISDN should be 11 numeric characters.
-- Any deviation indicates invalid or corrupted data.

SELECT UserID, MSISDN
FROM Users
WHERE LEN(MSISDN) != 11;
