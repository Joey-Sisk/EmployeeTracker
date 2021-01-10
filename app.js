const mysql = require("mysql2");

const [
  VIEW_EMPLOYEES,
  VIEW_ROLES,
  VIEW_DEPARTMENTS,
  ADD_EMPLOYEE,
  REMOVE_EMPLOYEE,
] = require("./lib/const");

const {
  promptChoices,
  promptAddEmployee,
  promptRemoveEmployee,
} = require("./lib/prompts");

const {
  addNewEmployee,
  viewEmployees,
  viewADepartment,
  viewARoles,
  removeAnEmployee,
} = require("./lib/queries");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "T0mW@it$",
  database: "employee_manager_db",
});

connection.connect(async (err) => {
  // connect to the mysql server and sql database
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  await startApp();
  // connection.end();
});

// function which prompts the user for what action they should take
async function startApp() {
  let answer, newEmp, remEmp;

  answer = await promptChoices();

  switch (answer.name) {
    case VIEW_EMPLOYEES:
      viewEmployees(connection);
      break;
    case VIEW_DEPARTMENTS:
      viewADepartment(connection);
      break;
    case VIEW_ROLES:
      viewARoles(connection);
      break;
    case ADD_EMPLOYEE:
      newEmp = await promptAddEmployee();
      addNewEmployee(
        connection,
        newEmp.firstName,
        newEmp.lastName,
        newEmp.roleId,
        newEmp.managerId,
        newEmp.isManager
      );
      break;
    case REMOVE_EMPLOYEE:
      remEmp = await promptRemoveEmployee(connection);
      removeAnEmployee(connection, employeeId);
      break;
  }
}
