const mysql = require("mysql");
const inquirer = require("inquirer");

const [
  VIEW_EMPLOYEES,
  VIEW_ROLES,
  VIEW_DEPARTMENTS,
  ADD_EMPLOYEE,
  REMOVE_EMPLOYEE,
] = require("./lib/const");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "T0mW@it$",
  database: "employee_db",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
async function start() {
  try {
    answer = await inquirer.prompt({
      name: "main",
      type: "list",
      message: "What would you lke to do?",
      choices: [
        VIEW_EMPLOYEES,
        VIEW_ROLES,
        VIEW_DEPARTMENTS,
        ADD_EMPLOYEE,
        REMOVE_EMPLOYEE,
        "EXIT",
      ],
    });
  } catch (error) {
    consol.log(error);
  }
}

