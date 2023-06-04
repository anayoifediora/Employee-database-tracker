const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1luvAfoma$',
        database: 'employee_db'
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
    db.promise().query('SELECT * FROM role')
    .then(([rows, fields]) => {
        console.log(rows)
    })
}

function viewEmployees() {
    db.promise().query('SELECT * FROM employee')
    .then(([rows, fields]) => {
        console.log(rows)
    })
}


module.exports = {viewDepartments, viewRoles, viewEmployees}