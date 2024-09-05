--Received complaint between any 2 dates
SELECT *
FROM ENQUIRY
WHERE e_date BETWEEN '2024-04-01' AND '2024-04-15';

--complaint in ascending order
SELECT *
FROM ENQUIRY
ORDER BY E_DATE ASC;

--turn over of mess for 1 year
SELECT SUM(FEES) AS turnover
FROM MESS;

--Number of visitor in 1 year
SELECT COUNT(*) AS visitor_count
FROM VISITOR
WHERE MONTH(VISITING_DATE) = 4 AND YEAR(VISITING_DATE) = 2024;

--student with occupied room
SELECT s.stud_id, s.NAME AS student_name, s.YEAR_OF_STUDY, r.ROOM_ID
FROM STUDENT s
INNER JOIN ROOM r ON s.HOSTEL_ID = r.HOSTEL_ID;

-- display the hostel name, mess name, and the total number of students in each hostel's mess.
SELECT H.HOSTEL_NAME, M.MESS_NAME, COUNT(S.stud_id) AS total_students
FROM HOSTEL H
JOIN MESS M ON H.MESS_ID = M.MESS_ID
LEFT JOIN STUDENT S ON H.HOSTEL_NO = S.HOSTEL_NO
GROUP BY H.HOSTEL_NAME, M.MESS_NAME;

-- the rows with the same payment method together
SELECT MODE_OF_PAYMENT, COUNT(*) AS payment_count
FROM PAYMENT P
JOIN STUDENT S ON P.STUD_ID = S.stud_id
GROUP BY MODE_OF_PAYMENT;

--check available room for each hostel 
SELECT
    HOSTEL_ID,
    COUNT(*) AS total_rooms,
    (COUNT(*) - SUM(CASE WHEN AVAIL = 'YES' THEN 1 ELSE 0 END)) AS available_rooms
FROM
    ROOM
GROUP BY
    HOSTEL_ID;


--Retrieve the top 5 hostels with the highest average mess fees
SELECT h.hostel_name, AVG(m.fees) AS avg_fees
FROM HOSTEL h
JOIN MESS m ON h.mess_no = m.mess_no
GROUP BY h.hostel_name
ORDER BY avg_fees DESC
LIMIT 5;


--Find the number of students in each year of study in each hostel
SELECT h.hostel_name, s.year_of_study, COUNT(*) AS num_students
FROM HOSTEL h
JOIN STUDENT s ON h.hostel_id = s.hostel_id
GROUP BY h.hostel_name, s.year_of_study;

--unresolved query
SELECT h.hostel_name, COUNT(e.complaint_no) AS num_unresolved_enquiries
FROM HOSTEL h
LEFT JOIN ENQUIRY e ON h.hostel_id = e.hostel_id AND e.status != 'Resolved'
GROUP BY h.hostel_name
ORDER BY num_unresolved_enquiries DESC
LIMIT 3;
