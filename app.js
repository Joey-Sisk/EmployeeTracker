const mysql = require("mysql2");

const [
  VIEW_EMPLOYEES,
  VIEW_ROLES,
  VIEW_DEPARTMENTS,
  ADD_EMPLOYEE,
  ADD_DEPARTMENT,
  ADD_ROLE,
  REMOVE_EMPLOYEE,
] = require("./lib/const");

const {
  promptChoices,
  promptAddEmployee,
  promptAddDepartment,
  promptAddRole,
  promptRemoveEmployee,
} = require("./lib/prompts");

const {
  addNewEmployee,
  addNewDepartment,
  addNewRole,
  viewEmployees,
  viewADepartment,
  viewARoles,
  removeAnEmployee,
  findEmployees,
  getRoles,
  getManagers,
  getDepartments,
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
});

// function which prompts the user for what action they should take
async function startApp() {
  let answer,
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
    departments,
    departmentNames,
    newRole,
    newDepartmentId,
    salaryInt;

  answer = await promptChoices();

  switch (answer.name) {
    case VIEW_EMPLOYEES:
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
    case ADD_EMPLOYEE:
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
      startApp();
      break;
    case ADD_DEPARTMENT:
      newDep = await promptAddDepartment();
      console.log(newDep);
      await addNewDepartment(connection, newDep.name);
      startApp();
      break;
    case ADD_ROLE:
      // roles = await getRoles(connection);
      // roleTitles = roles.map((role) => role.title);
      // newEmp = await promptAddEmployee(roleTitles, managersFullName);
      // newEmployeeRole = roles.find((role) => role.title === newEmp.role_title);

      departments = await getDepartments(connection);
      departmentNames = departments.map((department) => department.name);
      newRole = await promptAddRole(departmentNames);
      console.log(newRole.department_name);
      newDepartmentId = departments.find(
        (department) => department.name === newRole.department_name
      );

      salaryInt = parseInt(newRole.salary);

      await addNewRole(
        connection,
        newRole.role_name,
        salaryInt,
        newDepartmentId
      );
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
    default:
      connection.end();
  }
}
