DROP DATABASE employee_manager_db;

CREATE TABLE employee_manager_db;
USE employee_manager_db;

CREATE TABLE employee_db (
	id INT NOT NULL;
    first_name VARCHAR(30);
    last_name VARCHAR(30);
    role_id INT NULL;
    manager_id INT NOT NULL;
    is_manager BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (position)
);

CREATE TABLE role_db (
	id INT PRIMARY KEY;
    title VARCHAR(30);
    salary DECIMAL(10, 4) NOT NULL;
    department_id INT NOT NULL;
);

CREATE TABLE department_db (
	id INT NOT NULL;
    name VARCHAR(30);
);

SELECT * FROM employee_manager_db

--------------------------------------

-- TRUNCATE TABLE role_db; ~~to clear out info~~

INSERT INTO department_db (name, id) VALUES ("sales", 100);
INSERT INTO department_db (name, id) VALUES ("hr", 200);
INSERT INTO department_db (name, id) VALUES ("accounting", 300);
INSERT INTO department_db (name, id) VALUES ("it", 400);
INSERT INTO department_db (name, id) VALUES ("legal", 500)

-- add departments, roles, employee's
INSERT INTO employee_db (first_name, last_name, role_id, manager_id ,is_manager) VALUES (?, ?, ?, ?, ?);

-- view departments, roles, employee's
SELECT *
FROM department_db

SELECT *
FROM role_db

SELECT *
FROM employee_db

-- update roles
SELECT title, first_name, last_name
FROM role_db
LEFT JOIN employee_db
ON 

-- bonus: update employee managers

-- bonus: view employees by manager
    -- innerjoin?

-- bonus: delete departments, roles, and employees

-- bonus: view the total utilized budget of a department
