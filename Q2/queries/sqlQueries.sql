    
 --Query 2:

SELECT transition_date AS signed_deal_time 
FROM CRM
WHERE customer = 'Google'
AND deal_name = 'InfiniGrow ARR'
AND funnel = 'closedWon'

--Query 3:

SELECT COUNT(email) AS number_of_contacts
FROM CRM
WHERE customer = 'Microsoft'
AND funnel = 'lead'
AND transition_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 Month) AND CURDATE()






    