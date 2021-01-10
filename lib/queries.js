const { promptRemoveEmployee } = require("./prompts");

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
    console.table(rows);
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

function removeAnEmployee(connection, employeeId) {
  return this.connection.query(
    "DELETE FROM employee_db WHERE id = ?;",
    employeeId
  );
}

function findEmployees(connection) {
  connection.query("SELECT first_name FROM employee_db", (err, results) => {
    if (err) throw err;
    let choiceArray = [];
    for (var i = 0; i < results.length; i++) {
      choiceArray.push(results[i].first_name);
    }
    console.log(choiceArray);
  });
}

module.exports = {
  addNewEmployee,
  viewEmployees,
  viewADepartment,
  viewARoles,
  removeAnEmployee,
  findEmployees,
};
