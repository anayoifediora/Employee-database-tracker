const mysql = require('mysql2');
const inquirer = require('inquirer');

require('dotenv').config()

let employeeQuery =  `SELECT employee.id, employee.first_name, employee.last_name, 
                            role.title AS position, department.name AS department,
                            role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                            FROM employee
                            LEFT JOIN role ON employee.role_id = role.id
                            LEFT JOIN department ON department.id = role.department_id
                            LEFT JOIN employee manager ON manager.id = employee.manager_id;` 

const db = mysql.createConnection(
    {
        
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the employee_db.`)
);



function viewDepartments() {
    db.query('SELECT * FROM department', (err, rows) => {
        if(err) throw err;
        console.table(rows)
    })
        
}

function viewRoles() {
    const roleQuery = `SELECT department.name AS department, role.title, role.salary
                        FROM department
                        LEFT JOIN role ON department.id = role.department_id;`
    db.query(roleQuery, (err, rows) => {
        if (err) throw err;
        console.table(rows)
        
    })
    
}

function viewEmployees() {
     
    db.query(employeeQuery, (err, rows) => {
        if (err) throw err;
        console.table(rows)
        
    })

}

function addDepartment() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ])
    .then(({department}) => {
        db.promise().query(`INSERT INTO department (name)
                            VALUES ("${department}");`)
        console.log(`Added ${department} to the database`)
    })
    .catch((error) => {
        console.error(error)
    })
};

function addRole() {
    db.promise().query(`SELECT id, name FROM department;`)
        .then((res) => {
            let department = res[0].map((item) => {
                return {
                    name: item.name,
                    value: item.id
                }
            })
            
        inquirer.prompt([
            {
                type: 'input',
                name: 'rolename',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department does the role belong to?',
                choices: department
            },
        ])
        
        .then((res) => {
            
            db.promise().query(`INSERT INTO role (title, salary, department_id)
                                VALUES ('${res.rolename}', ${res.salary}, ${res.department});
                                `)
            console.log(`Added ${res.rolename} to the database`)
        })
        .catch((error) => {
            console.error(error)
        })
    })
    
}

function addEmployee() {
    const addEmployeeQuery = `SELECT employee.id, role.title AS Position, employee.manager_id AS manager_id,
                              CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                              FROM employee
                              INNER JOIN role ON employee.role_id = role.id
                              INNER JOIN employee manager ON manager.id = employee.manager_id;`
    db.promise().query(addEmployeeQuery)
    .then(async (res) => {
        let managerName = res[0].map((item) => {
            return {
                    name: item.manager,
                    value: item.manager_id
                }
        
        })

        let roles = await db.promise().query(`SELECT * FROM role;`)
        .then((res) => res)
          let employeeRole = roles[0].map((item) => {
            return {
                name: item.title,
                value: item.id
            }
        })
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstname',
                message: 'What is the employee first name?'
            },
            {
                type: 'input',
                name: 'lastname',
                message: 'What is the employee last name?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the employee role?',
                choices: employeeRole
            },
            {
                type: 'list',
                name: 'manager',
                message: `Who is the employee's manager?`,
                choices: managerName
            }
        ])
        .then((res) => {
            db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                VALUES ('${res.firstname}', '${res.lastname}', 
                                ${res.role}, ${res.manager});
                                `)
            console.log(`Added ${res.firstname} ${res.lastname} to the database`)
        })
        .catch((error) => {
            console.error(error)
        })
    })

}

function updateEmployeeRole() {
    const employeeUpdateQuery = `SELECT employee.id, CONCAT(first_name, ' ', last_name) AS employee, role.title
                             FROM employee
                             LEFT JOIN role ON employee.role_id = role.id;`
    db.promise().query(employeeUpdateQuery) 
        .then(async (res) => {
            let employeeName = res[0].map((item) => {
                return {
                        name: item.employee,
                        value: item.id
                    }
            
            })
        let roles = await db.promise().query(`SELECT * FROM role;`)
        .then((res) => res)
        console.log(roles[0])
        let employeeRole = roles[0].map((item) => {
            return {
                name: item.title,
                value: item.id
            }
        })
        
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Which employee do you want to update?',
                choices: employeeName
            },
            {
                type: 'list',
                name: 'role',
                message: 'Which role do you want to assign the selected employee?',
                choices: employeeRole
            }
            
        ])
        .then(({role, employee_id}) => {
            db.promise().query(`UPDATE employee SET role_id = ${role} 
                                WHERE id = ${employee_id}`)
            console.log(`Added employee role on the database`)
        })
        .catch((error) => {
            console.error(error)
        })
    })
    .catch((err) => {
        console.error(err)
    })
}

module.exports = {viewDepartments, viewRoles, viewEmployees, 
                 addDepartment, addRole, addEmployee, updateEmployeeRole}