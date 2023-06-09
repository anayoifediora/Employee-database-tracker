const mysql = require('mysql2');
const inquirer = require('inquirer');

require('dotenv').config()


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
    db.promise().query('SELECT * FROM department')
        .then(([rows, fields]) => {
            console.log(rows);
        })
        
}

function viewRoles() {
    db.promise().query(`SELECT department.name AS department, role.title, role.salary
        FROM department
        LEFT JOIN role ON department.id = role.department_id;`)
    .then(([rows, fields]) => {
        console.log(rows)
    })
}

function viewEmployees() {
    db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, 
                        role.title AS position, department.name AS department,
                        role.salary, employee.manager_id
                        FROM employee
                        JOIN role ON employee.role_id = role.id
                        JOIN department ON department.id = role.department_id;` )
    .then(([rows, fields]) => {
        console.log(rows)
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
    return inquirer.prompt([
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
            type: 'input',
            name: 'department',
            message: 'What department does the role belong to?',
    
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
}
module.exports = {viewDepartments, viewRoles, viewEmployees, addDepartment, addRole}