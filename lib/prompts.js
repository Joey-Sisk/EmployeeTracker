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
      "EXIT\n",
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

async function promptRemoveEmployee(choiceArray) {
  try {
    answer = await inquirer.prompt({
      name: "title",
      type: "rawlist",
      message: "Which employee do you want to remove?",
      choices: choiceArray,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  promptChoices,
  promptAddEmployee,
  promptRemoveEmployee,
};
