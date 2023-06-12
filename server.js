const inquirer = require('inquirer');

const mysql = require('mysql2');
const helpers = require('./helpers/helper');

const db = mysql.createConnection(
    {
        
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    // console.log(`Connected to the employee_db.`)
)


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
                    helpers.viewDepartments().then((res) => {
                        console.table(res[0])
                        initialize()
                    })
                    .catch((err) => {
                        console.error(err)
                    })
                    break;
                case 'View all roles': 
                    helpers.viewRoles().then((res) => {
                        console.table(res[0])
                        initialize()
                    })
                    .catch((err) => {
                        console.error(err)
                    })
                    break;
                case 'View All Employees':
                    helpers.viewEmployees().then((res) => {
                        console.table(res[0])
                        initialize()
                    })
                    break;
                case 'Add Department':
                    helpers.addDepartment()
                    .then(({department}) => {
                        db.promise().query(`INSERT INTO department (name)
                                            VALUES ("${department}");`)
                        console.log(`Added ${department} to the database`)
                        initialize()
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                    break;
                case 'Add role':
                    helpers.addRole()  
                    break;
                case 'Add Employee':
                    helpers.addEmployee()   
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

