const mysql = require("mysql");
const inquirer = require("inquirer");

const VIEW_EMPLOYEES = "View all employees";
const VIEW_ROLES = "View all role's";
const VIEW_DEPARTMENTS = "View all department's"
const ADD_EMPLOYEE = "Add a new employee";
const REMOVE_EMPLOYEE = "Remove an existing employee";

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "T0mW@it$",
  database: "employee_manager_db",
});


connection.connect(async (err) => { // connect to the mysql server and sql database
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  await startApp();
  connection.end();
});

// function which prompts the user for what action they should take
async function startApp() {

  let answer, query;

  answer = await promptChoices();

  switch(answer.name) {
    case VIEW_DEPARTMENTS:
      query = await promptViewDepartment();
      viewADepartment();
      break;
    case VIEW_ROLES:
      query = await promptViewRoles();
      viewARoles();
      break;
    case VIEW_EMPLOYEES:
      query = await promptViewEmployees();
      viewEmployees();
      break;
    case ADD_EMPLOYEE:
      addNewEmployee();
      break;
    case REMOVE_EMPLOYEE:
      removeAnEmployee();
      break;
  }




//   try {
//     answer = await inquirer.prompt({
//       name: "main",
//       type: "list",
//       message: "What would you lke to do?",
//       choices: [
//         VIEW_EMPLOYEES,
//         VIEW_ROLES,
//         VIEW_DEPARTMENTS,
//         ADD_EMPLOYEE,
//         REMOVE_EMPLOYEE,
//         "EXIT",
//       ],
//     });
//   } catch (error) {
//     consol.log(error);
//   }
// }


