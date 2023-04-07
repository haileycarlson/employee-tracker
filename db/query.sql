-- Combines the role tables department with the department's id
SELECT *
FROM role
JOIN role.department = department.id;

-- Combines the employee's role id with the table role's id
SELECT *
FROM employee
JOIN empoyee.role_id = role.id;