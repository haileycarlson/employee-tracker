USE company_db;

-- Adds different departments and thier ID's into the department table
INSERT INTO department (id, name)
VALUES (1, "Marketing"),
       (2, "Finance"),
       (3, "Operations Management"),
       (4, "Human Resources"),
       (5, "IT");

-- Adds different roles for different departments and their description into the role table
INSERT INTO role (id, title, salary, department_id)
VALUES (25, "Marketing Head", 56000, 1),
       (37, "Marketer", 50000, 1),
       (89, "Finance Head", 55000, 2),
       (29, "Number Cruncher", 52000, 2),
       (38, "Operations Head", 60000, 3),
       (82, "Op Assistant", 35000, 3),
       (62, "Therapist", 49000, 4),
       (20, "HR filing", 40000, 4),
       (98, "Tech God", 55000, 5),
       (27, "Hacker", 54000, 5);

-- Adds different employees with thier role_id and manager_id into the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (254, "Fabian", "Osbourne", 25, null),
       (372, "Wilma", "Brooks", 37, 254),
       (892, "Angelina", "Myles", 89, null),
       (298, "Darlene", "Peter", 29, 892),
       (382, "Astrid", "Millhouse", 38, null),
       (820, "Arn", "Carver", 82, 382),
       (629, "Dex", "Coke", 62, null),
       (209, "Maria", "Heath", 20, 629),
       (980,"Lefty", "Lawson", 98, null),
       (276, "Meadow", "Banks", 27, 980);