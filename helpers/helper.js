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
        initialize()
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
    db.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err
        console.log(res)
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department does the role belong to?',
                choices: res
            }
        ])
        .then(({title, salary, department}) => {
            db.promise().query(`INSERT INTO role (title, salary, department)
                                VALUES ('${title}', ${salary}, '${department}');
                                `)
            console.log(`Added ${role} to the database`)
        })
        .catch((error) => {
            console.error(error)
        })
    })
}

function addEmployee() {
    const addEmployeeQuery = `SELECT employee.id, employee.first_name, employee.last_name, 
                              role.title AS position, 
                              CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                              FROM employee
                              LEFT JOIN role ON employee.role_id = role.id
                              LEFT JOIN employee manager ON manager.id = employee.manager_id;`
    db.query(addEmployeeQuery, (err, res) => {
        if (err) throw err
        console.log(res)
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
                choices: positions
            },
            {
                type: 'list',
                name: 'role',
                message: 'Who is the employee'+'s' + 'manager?',
                choices: managerNames
            }
        ])
        // .then(({title, salary, department}) => {
        //     db.promise().query(`INSERT INTO role (title, salary, department)
        //                         VALUES ('${title}', ${salary}, '${department}');
        //                         `)
        //     console.log(`Added ${role} to the database`)
        // })
        // .catch((error) => {
        //     console.error(error)
        // })
    })

}

function updateEmployeeRole() {
    const roleUpdateQuery = `SELECT employee.id, CONCAT(first_name, ' ', last_name) AS employee, role.title
                             FROM employee
                             LEFT JOIN role ON employee.role_id = role.id;`
    db.query(roleUpdateQuery, (err, res) => {
        if (err) throw err
        console.log(res)
        res.forEach(res => console.log(res.employee))
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee_name',
                message: 'Which employee do you want to update?',
                choices: []
            },
            {
                type: 'list',
                name: 'role',
                message: 'Which role do you want to assign the selected employee?',
                choices: []
            }
            
        ])
    //     .then(({title, salary, department}) => {
    //         db.promise().query(`INSERT INTO role (title, salary, department)
    //                             VALUES ('${title}', ${salary}, '${department}');
    //                             `)
    //         console.log(`Added ${role} to the database`)
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })
    })
    
}

module.exports = {viewDepartments, viewRoles, viewEmployees, 
                 addDepartment, addRole, addEmployee, updateEmployeeRole}