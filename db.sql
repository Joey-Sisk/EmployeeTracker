DROP DATABASE IF EXISTS employee_manager_db;

CREATE DATABASE employee_manager_db;
USE employee_manager_db;

CREATE TABLE employee_db (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT NULL,
manager_id INT,
is_manager BOOLEAN DEFAULT FALSE,
PRIMARY KEY (id)
);

CREATE TABLE roles_db (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(10, 2) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE department_db (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30),
PRIMARY KEY (id)
);

INSERT INTO department_db (name) 
VALUES
("Sales"),
("HR"),
("Accounting"),
("IT"),
("Legal");

INSERT INTO roles_db (title, salary, department_id)
VALUES
("Sales Manager", 140000.00, 1),
("HR Manager", 90000.00, 2),
("Accounting Manager", 130000.00, 3),
("IT Manager", 80000.00, 4),
("Salesperson", 60000.00, 1),
("HR Consultant", 50000.00, 2),
("Accountant", 70000.00, 3),
("IT Professional", 50000.00, 4),
("Attourney", 200000.00, 5);

INSERT INTO employee_db (first_name, last_name, role_id, manager_id, is_manager)
VALUES
("Piper", "Sisk", 100, null, true),
("Spencer", "Carlson", 200, null, true),
("Oscar", "Charland", 300, null, true),
("Jefferson", "Ellinger", 110, 1, false),
("Tyler", "Mappes", 210, 2, false),
("Alex", "Windhelm", 310, 3, false),
("Winry", "Ember", 410, 4, false);

-- add departments, roles, employee's
INSERT INTO employee_db (first_name, last_name, role_id, manager_id ,is_manager) VALUES (?, ?, ?, ?, ?);

-- view departments, roles, employee's
SELECT *
FROM department_db;

SELECT *
FROM roles_db;

SELECT *
FROM employee_db;

-- update roles

UPDATE employee_db
SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?, is_manager = ?
where id = ?;

-- SELECT title, first_name, last_name
-- FROM role_db
-- LEFT JOIN employee_db
-- ON 

-- bonus: update employee managers

-- bonus: view employees by manager
    -- innerjoin?

-- bonus: delete departments, roles, and employees

-- bonus: view the total utilized budget of a department
