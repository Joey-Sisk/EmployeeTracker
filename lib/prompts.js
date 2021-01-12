const inquirer = require("inquirer"); // connects questions to switch statement is app.js
const [
  VIEW_EMPLOYEES,
  VIEW_ROLES,
  VIEW_DEPARTMENTS,
  ADD_EMPLOYEE,
  ADD_DEPARTMENT,
  ADD_ROLE,
  UPDATE_EMPLOYEE_ROLE,
  REMOVE_EMPLOYEE,
  REMOVE_DEPARTMENT,
  REMOVE_ROLE
] = require("./const");

async function promptChoices() { // "home page" that the user returns to after every option is finished
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
      UPDATE_EMPLOYEE_ROLE,
      REMOVE_EMPLOYEE,
      REMOVE_DEPARTMENT,
      REMOVE_ROLE,
      "EXIT\n",
    ],
  });
  return answer;
}

async function promptAddEmployee(roleTitles, managerNames) { 
  try { // the logic that creates the arrays from the sql db is in the switch statement
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

async function promptUpdateEmployee(employeeNames, roleTitles) {
  try {
    answer = await inquirer.prompt([
      {
        name: "which_employee",
        type: "list",
        message: "Which employee would you like to update?",
        choices: employeeNames,
      },
      {
        name: "role_title",
        type: "list",
        message: "What new role is this employee filling?",
        choices: roleTitles, // inquire should call this function immediatly
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

async function promptRemoveDepartment(choiceArray) {
  try {
    answer = await inquirer.prompt({
      name: "dep_name",
      type: "rawlist",
      message: "Which department do you want to remove?",
      choices: choiceArray,
    });

    return answer;
  } catch (error) {
    console.log(error);
  }
}

async function promptRemoveRole(choiceArray) {
  try {
    answer = await inquirer.prompt({
      name: "role_name",
      type: "rawlist",
      message: "Which role do you want to remove?",
      choices: choiceArray,
    });

    return answer;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  promptChoices,
  promptAddEmployee,
  promptUpdateEmployee,
  promptAddDepartment,
  promptAddRole,
  promptRemoveEmployee,
  promptRemoveDepartment,
  promptRemoveRole
};
