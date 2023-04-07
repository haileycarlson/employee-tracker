// const fs = require('fs')
// const { request } = require('http')
const inquirer = require('inquirer')
const mysql = require('mysql2')

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    // Database being used
    database: 'company_db',
  },
  console.log(`Connected to the company_db database.`),
)


function questions() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          {
            name: 'View All Employees',
            value: 'VIEW_ALL_EMPLOYEES',
          },
          {
            name: 'Add Empolyee',
            value: 'ADD_EMPLOYEE',
          },
          {
            name: 'Update Employee Role',
            value: 'UPDATE_EMPLOYEE_ROLE',
          },
          {
            name: 'View All Roles',
            value: 'VIEW_ALL_ROLES',
          },
          {
            name: 'Add Role',
            value: 'ADD_ROLE',
          },
          {
            name: 'View All Departments',
            value: 'VIEW_ALL_DEPARTMENTS',
          },
          {
            name: 'Add Department',
            value: 'ADD_DEPARTMENT',
          },
          {
            name: 'Quit',
            value: 'QUIT',
          },
        ],
      },
    ])
    .then((res) => {
      console.log(res)
      // while(Quit ! = true);
      const choice = res.choice
      if (choice === 'VIEW_ALL_EMPLOYEES') {
        console.log('Running query')
        db.query(
          'SELECT id, first_name, last_name, role_id, manager_id FROM employee',
          function (err, rows, fields) {
            if (err) throw err
            let employees = []
            Object.keys(rows).forEach(function (key, results) {
              let row = rows[key]
              employees.push(row)
            })
            // db.end()
            console.table(employees)
            questions()
          },
        )
      } 
      if (choice === 'ADD_EMPLOYEE') {
        // insert new employee into database
        // Query the database for all roles
        getRoles().then(([rows]) => {
          //convert database response into array of role_title role_id
          const employeeRoles = rows.map((row) => {
            return {
              title: row.title,
              role_id: row.id,
            }
          })
          inquirer
            .prompt([
              {
                name: 'first_name',
                message: 'What is the name of the employee',
              },
              {
                name: 'last_name',
                message: 'What is the last name of the employee',
              },
              {
                type: 'list',
                name: 'role_id',
                message: 'What is the employees role?',
                choices: employeeRoles.map((role) => {
                  return {
                    // Set the input name to the human readable name of the role
                    name: role.title,
                    // Set the value of the input to the id of the role
                    value: role.role_id,
                  }
                }),
              },
              {
                name: 'manager_id',
                message: 'What is the employees manager id?',
              },
            ])
            .then((answer) => {
              console.log(answer)
              db.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.first_name}', '${answer.last_name}', '${answer.role_id}', '${answer.manager_id}')`,
                function (err, result) {
                  if (err) throw err
                  // console.table(employees)
                  console.log(
                    `${answer.first_name} has been added to the database`,
                  )
                  questions()
                },
              )
            })
        })
      }
      if (choice === 'UPDATE_EMPLOYEE_ROLE') {
        // insert new employee into database
        inquirer
          .prompt([
            {
              name: 'id',
              message: 'What is the employees id?',
            },
            {
              name: 'first_name',
              message: 'What is the name of the employee',
            },
            {
              name: 'last_name',
              message: 'What is the last name of the employee',
            },
            {
              type: 'list',
              name: 'title',
              message: 'What is the employees role?',
              choices: [
                'Marketing Head',
                'Marketer',
                'Finance Head',
                'Number Cruncher',
                'Operations Head',
                'Op Assistant',
                'Therapist',
                'HR filing',
                'Tech God',
                'Hacker',
              ],
            },
            {
              type: 'list',
              name: 'manager_name',
              message: 'Who is the employees manager?',
              choices: ['Osbourne', 'Myles', 'Millhouse', 'Coke', 'Lawson'],
            },
          ])
          .then((answer) => {
            console.log(answer.first_name)

            let role_id = 0
            // console.log(answer)
            db.query(
              `SELECT * FROM role WHERE title = '${answer.title}'`,
              function (err, result, fields) {
                if (err) throw err
                // console.log(result[0].id)
                console.log(result)
                role_id = result[0].id

                let manager_id = 0
                // console.log(answer)
                db.query(
                  `SELECT * FROM employee WHERE last_name = '${answer.manager_name}'`,
                  function (err, result, fields) {
                    if (err) throw err
                    // console.log(result[0].id)
                    console.log('result', result)
                    manager_id = result[0].id

                    const id = parseInt(answer.id)

                    db.query(
                      `UPDATE employee set first_name = '${answer.first_name}', last_name='${answer.last_name}', role_id='${role_id}', manager_id='${manager_id}' WHERE id=${id}`,
                      // `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES ('${answer.id}', '${answer.first_name}', '${answer.last_name}', '${answer.role_id}', '${answer.manager_id}')`,
                      function (err, result) {
                        if (err) throw err
                        // console.table(employees)
                        console.log(
                          `${answer.first_name}'s role has been updated!`,
                        )
                        questions()
                      },
                    )
                  },
                )
              },
            )
          })
      } 
      if (choice === 'VIEW_ALL_ROLES') {
        db.query('SELECT id, title FROM role', function (err, rows, fields) {
          if (err) throw err
          let roles = []
          Object.keys(rows).forEach(function (key, results) {
            let row = rows[key]
            roles.push(row)
          })
          // db.end()
          console.table(roles)
          questions()
        })
      } 
      if (choice === 'ADD_ROLE') {
        // insert new employee into database
        // do this
        inquirer
          .prompt([
            {
              name: 'title',
              message: 'What is the name of the role?',
            },
            {
              name: 'salary',
              message: 'What is the salary of the role?',
            },
            {
              type: 'list',
              name: 'department_names',
              message: 'Which department does this role belong to?',
              choices: [
                'Marketing',
                'Finance',
                'Operations Management',
                'Human Resources',
                'IT',
              ],
            },
          ])
          .then((answer) => {
            let department_id = 0
            // console.log(answer)
            db.query(
              `SELECT * FROM department WHERE name = '${answer.department_names}'`,
              function (err, result, fields) {
                if (err) throw err
                // console.log(result[0].id)
                console.log(result)
                department_id = result[0].id
                // console.log(rows)
                // console.log(`line 226 - ${department_id}`)
                db.query(
                  `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', '${department_id}')`,
                  function (err, result) {
                    if (err) throw err
                    // console.table(roles)
                    console.log(
                      `${answer.title} has been added to the database`,
                    )
                    questions()
                  },
                )
              },
            )
          })
      }
      if (choice === 'VIEW_ALL_DEPARTMENTS') {
        db.query('SELECT id, name FROM department', function (
          err,
          rows,
          fields,
        ) {
          if (err) throw err
          let departments = []
          Object.keys(rows).forEach(function (key, results) {
            let row = rows[key]
            departments.push(row)
          })
          // db.end()
          console.table(departments)
          questions()
        })
      }
      if (choice === 'ADD_DEPARTMENT') {
        // insert new employee into database
        //do this
        inquirer
          .prompt([
            {
              name: 'department_name',
              message: 'What is the name of the department?',
            },
          ])
          .then((answer) => {
            db.query(
              `INSERT INTO department (name) VALUES ('${answer.department_name}')`,
              function (err, result) {
                if (err) throw err
                // console.table(departments)
                console.log(
                  `${answer.department_name} has been added to the database`,
                )
                questions()
              },
            )
          })
      }
      if (choice === 'QUIT') {
        
        console.log('Goodbye :)')

        process.exit()
      }
    })
}
questions()
// prompt.ui.close()

function getRoles() {
  let roles = []
  return db.promise().query('SELECT * FROM role')}