-- Drops and creates a company_db so you have one to work with
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

-- Makes company_db the main DB in use
USE company_db;

-- Creates a table for departments in the company
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

-- Creates a table for roles in the company with collumns and different values
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

-- Creates a table for the employees in the company with collumns and different values
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id),
    FOREIGN KEY (role_id)
    REFERENCES role(id)
);


