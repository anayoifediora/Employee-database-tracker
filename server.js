const inquirer = require('inquirer');

const mysql = require('mysql2');
const helpers = require('./helpers/helper');

function initialize() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'task',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Update Employee Role', 'View all roles', 'Add role', 
                'View all departments', 'Add Department', 'Add Employee', 'Quit']
            }
        ])
        .then(({task}) => {
            switch (task) {
                case 'View all departments':
                    helpers.viewDepartments()
                    break;
                case 'View all roles': 
                    helpers.viewRoles()
                    break;
                case 'View All Employees':
                    helpers.viewEmployees();
                    break;
                case 'Add Department':
                    helpers.addDepartment();
                    break;
                case 'Add role':
                    helpers.addRole();
                    break;
                case 'Add Employee':
                    helpers.addEmployee();
                    break;
                case 'Update Employee Role':
                    helpers.updateEmployeeRole()
                    break;
                default:
                    process.exit(0);
                
            }
        })
        .catch((err) => {
            console.log(err)
        })

    }
initialize()



