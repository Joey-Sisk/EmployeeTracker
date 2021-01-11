const inquirer = require("inquirer");
const [
  VIEW_EMPLOYEES,
  VIEW_ROLES,
  VIEW_DEPARTMENTS,
  ADD_EMPLOYEE,
  ADD_DEPARTMENT,
  ADD_ROLE,
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
      ADD_DEPARTMENT,
      ADD_ROLE,
      REMOVE_EMPLOYEE,
      "EXIT\n",
    ],
  });

  return answer;
}

async function promptAddEmployee(roleTitles, managerNames) {
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
        name: "role_title",
        type: "list",
        message: "What role is this employee filling?",
        choices: roleTitles, // inquire should call this function immediatly
      },
      {
        name: "manager_full_name",
        type: "list",
        message: "Which manager does this employee report too?",
        choices: [...managerNames, "This employee doesn't have a manager"],
      },
      {
        name: "isManager",
        type: "list",
        message: "Is this new employee a manager?",
        choices: ["YES", "NO"],
      },
    ]);

    return answer;
  } catch (error) {
    console.log(error);
  }
}

async function promptAddDepartment() {
  try {
    answer = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of this department?",
      },
    ]);

    return answer;
  } catch (error) {
    console.log(error);
  }
}

async function promptAddRole(depNames) {
  try {
    answer = await inquirer.prompt([
      {
        name: "roleName",
        type: "input",
        message: "What is the name of this role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
      },
      {
        name: "department_name",
        type: "list",
        message: "What department is this role in?",
        choices: depNames,
      },
    ]);

    return answer;
  } catch (error) {
    console.log(error);
  }
}

async function promptRemoveEmployee(choiceArray) {
  try {
    answer = await inquirer.prompt({
      name: "employee_full_name",
      type: "rawlist",
      message: "Which employee do you want to remove?",
      choices: choiceArray,
    });

    return answer.employee_full_name;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  promptChoices,
  promptAddEmployee,
  promptAddDepartment,
  promptAddRole,
  promptRemoveEmployee,
};
