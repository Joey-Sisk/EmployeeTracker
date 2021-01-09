const inquirer = require("inquirer");
const [
  VIEW_EMPLOYEES,
  VIEW_ROLES,
  VIEW_DEPARTMENTS,
  ADD_EMPLOYEE,
  REMOVE_EMPLOYEE,
] = require("./const");

async function promptChoices() {
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

async function promptAddEmployee() {
  try {
    department = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        name: "roleId",
        type: "list",
        message: "What role is this employee filling?",
        choices: [
          // put a function here that grabs the roles from the db to be chosen from
        ],
      },
      {
        name: "managerId",
        type: "list",
        message: "Which manager does this employee report too?",
        choices: [
          // put a function here that grabs the managers
        ],
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

module.exports = {
  promptChoices,
  promptAddEmployee
};
