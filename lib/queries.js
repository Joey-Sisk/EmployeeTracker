async function addNewEmployee(
  connection,
  firstName,
  lastName,
  roleId,
  managerId,
  isManager
) {
  const SQL_STATEMENT = `INSERT INTO employee_db
    (first_name, last_name, role_id, manager_id ,is_manager)
    VALUES (?, ?, ?, ?, ?);`;

  try {
    const [
      rows,
      fields,
    ] = await connection.promise().query(SQL_STATEMENT, [
      firstName,
      lastName,
      roleId,
      managerId,
      isManager,
    ]);
    console.table(rows);
  } catch (error) {
    console.log(error);
  }
}
