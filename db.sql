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
("Sales"), -- 1
("HR"), -- 2
("Accounting"), -- 3
("IT"), -- 4
("Legal"); -- 5

INSERT INTO roles_db (title, salary, department_id)
VALUES
("Sales Manager", 140000.00, 1), -- 1
("HR Manager", 90000.00, 2), -- 2
("Accounting Manager", 130000.00, 3), -- 3
("IT Manager", 80000.00, 4), -- 4
("Salesperson", 60000.00, 1), -- 5
("HR Consultant", 50000.00, 2), -- 6
("Accountant", 70000.00, 3), -- 7
("IT Professional", 50000.00, 4), -- 8 
("Attourney", 200000.00, 5); -- 9

INSERT INTO employee_db (first_name, last_name, role_id, manager_id, is_manager)
VALUES
("Piper", "Sisk", 1, null, true), -- 1
("Spencer", "Carlson", 2, null, true), -- 2
("Oscar", "Charland", 3, null, true), -- 3
("Jefferson", "Ellinger", 5, 1, false), -- 4
("Tyler", "Mappes", 6, 2, false), -- 5
("Alex", "Windhelm", 7, 3, false), -- 6
("Winry", "Ember", 8, 4, false); -- 7

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
UPDATE employee_db
SET manager_id = ? -- new manager id
WHERE id = ?; -- employee id

-- bonus: view employees by manager
    -- innerjoin?
SELECT *
FROM employee_db
WHERE manager_id = ?;

-- bonus: delete departments, roles, and employees
DELETE FROM department_db
WHERE id = ?;

-- bonus: view the total utilized budget of a department

SELECT title
FROM roles_db;
