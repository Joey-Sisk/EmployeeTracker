const inquirer = require("inquirer");
const [
  VIEW_EMPLOYEES,
  VIEW_ROLES,
  VIEW_DEPARTMENTS,
  ADD_EMPLOYEE,
  REMOVE_EMPLOYEE,
] = require("./const");

async function promptChoices() {
  answer = await inquirer.prompt({
    name: "name",
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

  return answer;
}

async function promptAddEmployee() {
  try {
    answer = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleId",
        type: "list",
        message: "What role is this employee filling?",
        choices: findRoles, // inquire should call this function immediatly
      },
      {
        name: "managerId",
        type: "list",
        message: "Which manager does this employee report too?",
        choices: findManagers,
      },
      {
        name: "isManager",
        type: "list",
        message: "Is this new employee a managger?",
        choices: [true, false],
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

async function promptRemoveEmployee(connection) {
  try {
    answer = await inquirer.prompt([
      {
        name: "title",
        type: "list",
        message: "Which employee do you want to remove?",
        choices: findEmployees,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

async function findRoles() {
  let allRoles = connection.query("SELECT title FROM roles_db;", []);
  console.log(allRoles);

  return allRoles;
}

async function findManagers() {
  let allManagers = connection.query(
    "SELECT first_name FROM employee_db WHERE is_manager = true",
    []
  );
  console.log(allManagers);

  return allManagers;
}

let findEmployees = (connection) => {
  connection.query(
    "SELECT first_name FROM employee_db",
    function (err, results) {
      if (err) throw err;
      var choiceArray = [];
      for (var i = 0; i < results.length; i++) {
        choiceArray.push(results[i].first_name);
      }
      console.log(choiceArray);
      return choiceArray;
    }
  );
}

module.exports = {
  promptChoices,
  promptAddEmployee,
  promptRemoveEmployee,
};
