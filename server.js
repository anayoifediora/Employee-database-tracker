const inquirer = require('inquirer');

const mysql = require('mysql2');
const helpers = require('./helpers/helper')

inquirer.prompt([
    {
        type: 'list',
        name: 'task',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Update Employee Role', 'View all roles', 'Add role', 
        'View all departments', 'Add Department', 'Quit']
    }
])
.then(({task}) => {
    if (task === 'View all departments') {
        helpers.viewDepartments()
    } else if (task === 'View all roles') {
        helpers.viewRoles()
    } else if (task === 'View All Employees') {
        helpers.viewEmployees()
    }
})
.catch((err) => {
    console.log(err)
})
