const mysql = require("mysql2");

const [ // imports questions which will be used for inquirer and the switch statement
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
] = require("./lib/const");

const { //all inquirer prompts
  promptChoices,
  promptAddEmployee,
  promptUpdateEmployee,
  promptAddDepartment,
  promptAddRole,
  promptRemoveEmployee,
  promptRemoveDepartment,
  promptRemoveRole,
} = require("./lib/prompts");

const { // all database queries. If I had more time I would reduce these and make them more flexable using CRUD and ORM
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
} = require("./lib/queries");

const connection = mysql.createConnection({ // connect to the database
  host: "localhost",
  port: 3306,
  user: "root",
  password: "T0mW@it$",
  database: "employee_manager_db",
});

connection.connect(async (err) => {
  // connect to the mysql server and sql database and start the app
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  await startApp();
});

// function which prompts the user for what action they should take
async function startApp() {
  let answer, // given more time I would reduce this clutter and put more of these in functions
    roles,
    roleTitles,
    managers,
    managersFullName,
    newEmp,
    newEmployeeRole,
    newEmployeeMgr,
    isManagerFlag,
    employees_row,
    choiceArray,
    employee_full_name,
    removeEmployee,
    newDep,
    newRole,
    salaryInt,
    depNames,
    newRoleDepartment,
    deps,
    remDep,
    whichRoleId,
    roleRows,
    roleNames,
    remRole,
    updateEmployee,
    employeeNames;

  answer = await promptChoices(); // "home page" main inquirer questions

  switch (answer.name) {
    case VIEW_EMPLOYEES: // simple functiont use console.table()
      await viewEmployees(connection);
      startApp();
      break;

    case VIEW_DEPARTMENTS:
      await viewADepartment(connection);
      startApp();
      break;

    case VIEW_ROLES:
      await viewARoles(connection);
      startApp();
      break;

    case ADD_EMPLOYEE: // add employee by giving options taken from the sql db
      roles = await getRoles(connection);
      roleTitles = roles.map((role) => role.title); // Use map to create an array of only the role titles

      managers = await getManagers(connection);
      managersFullName = managers.map(
        (manager) => `${manager.first_name} ${manager.last_name}`
      ); // Use map to create an array of only the managers first and last name
      newEmp = await promptAddEmployee(roleTitles, managersFullName);
      newEmployeeRole = roles.find((role) => role.title === newEmp.role_title);
      newEmployeeMgr = managers.find(
        (employee) =>
          `${employee.first_name} ${employee.last_name}` ===
          newEmp.manager_full_name
      );
      isManagerFlag = newEmp.isManager === "YES";

      await addNewEmployee( 
        connection,
        newEmp.firstName,
        newEmp.lastName,
        newEmployeeRole.id,
        (newEmployeeMgr && newEmployeeMgr.id) || 0, // let's default to 0, if manager ID was not found
        isManagerFlag
      );
      startApp(); // by running this after every case you will always return to main menu
      break;

    case ADD_DEPARTMENT:
      newDep = await promptAddDepartment(); // prompts that dont require a list from the sql are kept simple
      await addNewDepartment(connection, newDep.name);
      startApp();
      break;

    case ADD_ROLE:
      deps = await getDepartments(connection);
      depNames = deps.map((dep) => dep.name);
      newRole = await promptAddRole(depNames);
      newRoleDepartment = deps.find(
        (dep) => dep.name === newRole.department_name
      );
      salaryInt = parseInt(newRole.salary);
      await addNewRole(
        connection,
        newRole.roleName,
        salaryInt,
        newRoleDepartment
      );
      startApp();
      break;

    case UPDATE_EMPLOYEE_ROLE:
      employees_row = await findEmployees(connection);
      employeeNames = employees_row.map(
        (employee) => `${employee.first_name} ${employee.last_name}`
      );
      roleRows = await getRoles(connection);
      roleNames = roleRows.map((role) => role.title);
      employeeAndRole = await promptUpdateEmployee(employeeNames, roleNames);
      updateEmployee = employees_row.find(
        (employee) =>
          `${employee.first_name} ${employee.last_name}` ===
          employeeAndRole.which_employee
      );
      whichRoleId = roleRows.find(
        (role) => role.title === employeeAndRole.role_title
      );
      await updateAnEmployee(connection, whichRoleId.id, updateEmployee.id);
      startApp();
      break;

    case REMOVE_EMPLOYEE:
      employees_row = await findEmployees(connection);
      choiceArray = employees_row.map(
        (employee) => `${employee.first_name} ${employee.last_name}`
      );
      employee_full_name = await promptRemoveEmployee(choiceArray);
      removeEmployee = employees_row.find(
        (employee) =>
          `${employee.first_name} ${employee.last_name}` === employee_full_name
      );
      await removeAnEmployee(connection, removeEmployee.id);
      startApp();
      break;

    case REMOVE_DEPARTMENT:
      deps = await getDepartments(connection);
      depNames = deps.map((dep) => dep.name);
      remDep = await promptRemoveDepartment(depNames);
      whichRoleId = deps.find((dep) => dep.name === remDep.dep_name);
      await removeADepartment(connection, whichRoleId.id);
      startApp();
      break;

    case REMOVE_ROLE:
      roleRows = await getRoles(connection);
      roleNames = roleRows.map((role) => role.title);
      remRole = await promptRemoveRole(roleNames);
      whichRoleId = roleRows.find((role) => role.title === remRole.role_name);
      console.log(whichRoleId);
      await removeARole(connection, whichRoleId.id);
      startApp();
      break;

    default:
      connection.end(); // the user can close the server by choosing EXIT
  }
}
