USE company_db;

INSERT INTO department (id, name)
VALUES (1, "Marketing"),
       (2, "Finance"),
       (3, "Operations Management"),
       (4, "Human Resources"),
       (5, "IT");

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
       (27, "Hacker", 54000, 5),

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (254, "Fabian", "Osbourne", 25, 38),
       (372, "Wilma", "Brooks", 37, 25),
       (892, "Angelina", "Myles", 89, 38),
       (298, "Darlene", "Peter", 29, 89),
       (382, "Astrid", "Millhouse", 38, 38),
       (820, "Arn", "Carver", 82, 89),
       (629, "Dex", "Coke", 62, 89),
       (209, "Maria", "Heath", 20, 62),
       (980,"Lefty", "Lawson", 98, 89),
       (276, "Meadow", "Banks", 27, 98),