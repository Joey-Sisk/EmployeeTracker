async function addNewEmployee(
  connection,
  firstName,
  lastName,
  roleId,
  managerId,
  isManager
) {
  const SQL_STATEMENT = `INSERT INTO employee_db
    (first_name, last_name, role_id, manager_id ,is_manager)
    VALUES (?, ?, ?, ?, ?);`;

  try {
    const [rows, fields] = await connection
      .promise()
      .query(SQL_STATEMENT, [
        firstName,
        lastName,
        roleId,
        managerId,
        isManager,
      ]);
    console.table(`Successfully added a new employee.`);
  } catch (error) {
    console.log(error);
  }
}

async function addNewDepartment(connection, newDep) {
  const SQL_STATEMENT = `INSERT INTO department_db (name) VALUES (?);`;

  try {
    const [rows, fields] = await connection
      .promise()
      .query(SQL_STATEMENT, [newDep]);
    console.table(`Successfully added a new department.`);
  } catch (error) {
    console.log(error);
  }
}

async function addNewRole(connection, title, salary, departmentId) {
  const SQL_STATEMENT = `INSERT INTO roles_db
    (title, salary, department_id)
    VALUES (?, ?, ?);`;

  try {
    const [rows, fields] = await connection
      .promise()
      .query(SQL_STATEMENT, [title, salary, departmentId]);
    console.table(`Successfully added a new role.`);
  } catch (error) {
    console.log(error);
  }
}

async function viewEmployees(connection) {
  const SQL_STATEMENT = `SELECT *
  FROM employee_db;`;

  try {
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT, []);
    console.table(rows);
  } catch (error) {
    console.log(error);
  }
}

async function viewADepartment(connection) {
  const SQL_STATEMENT = `SELECT *
  FROM department_db;`;

  try {
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT, []);
    console.table(rows);
  } catch (error) {
    console.log(error);
  }
}

async function viewARoles(connection) {
  const SQL_STATEMENT = `SELECT *
  FROM roles_db;`;

  try {
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT, []);
    console.table(rows);
  } catch (error) {
    console.log(error);
  }
}

async function getRoles(connection) {
  const SQL_STATEMENT = `SELECT *
  FROM roles_db;`;

  try {
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT, []);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getManagers(connection) {
  const SQL_STATEMENT = `SELECT * FROM employee_db WHERE is_manager = true;`;
  try {
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT, []);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getDepartments(connection) {
  const SQL_STATEMENT = `SELECT *
  FROM department_db;`;

  try {
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT, []);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateAnEmployee(connection, role, employee) {
  const SQL_STATEMENT = `UPDATE employee_db
  SET role_id = ? -- new role id
  WHERE id = ?; -- employee id`;

  try {
    const [rows, fields] = await connection
      .promise()
      .query(SQL_STATEMENT, [ role, employee]);
    console.table(`Successfully updated the employee with a new role.`);
  } catch (error) {
    console.log(error);
  }
}

async function removeAnEmployee(connection, employeeId) {
  try {
    const [rows, field] = await connection
      .promise()
      .query("DELETE FROM employee_db WHERE id = ?;", employeeId);
    console.log(`Employee successfully deleted`);
  } catch (error) {
    console.log(error);
  }
}

async function removeADepartment(connection, departmentId) {
  try {
    const [rows, field] = await connection
      .promise()
      .query("DELETE FROM department_db WHERE id = ?;", departmentId);
    console.log(`Department successfully deleted`);
  } catch (error) {
    console.log(error);
  }
}

async function removeARole(connection, roleId) {
  try {
    const [rows, field] = await connection
      .promise()
      .query("DELETE FROM roles_db WHERE id = ?;", roleId);
    console.log(`Role successfully deleted`);
  } catch (error) {
    console.log(error);
  }
}

async function findEmployees(connection) {
  try {
    const [rows, fields] = await connection
      .promise()
      .query("SELECT * FROM employee_db");
    return rows;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addNewEmployee,
  addNewDepartment,
  addNewRole,
  viewEmployees,
  viewADepartment,
  viewARoles,
  updateAnEmployee,
  removeAnEmployee,
  findEmployees,
  getRoles,
  getManagers,
  getDepartments,
  removeADepartment,
  removeARole,
};
