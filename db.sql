DROP DATABASE employee_manager_db;

CREATE TABLE employee_manager_db;
USE employee_manager_db;

CREATE TABLE employee_db (
	id INT NOT NULL;
    first_name VARCHAR(30);
    last_name VARCHAR(30);
    role_id INT NULL;
    manager_id INT NOT NULL;
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

-- add departments, roles, employee's

-- view departments, roles, employee's
SELECT *
FROM department_db

SELECT *
FROM role_db

SELECT *
FROM employee_db

-- update roles

-- bonus: update employee managers

-- bonus: view employees by manager

-- bonus: delete departments, roles, and employees

-- bonus: view the total utilized budget of a department
