SELECT * FROM department;

SELECT department.name AS department, role.title, role.salary
FROM department
LEFT JOIN role ON department.id = role.department_id;

SELECT employee.id, employee.first_name, employee.last_name, 
        role.title AS position, department.name AS department,
        role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON department.id = role.department_id
LEFT JOIN employee manager ON manager.id = employee.manager_id;



INSERT INTO department (name)
VALUES ('${department}')

SELECT employee.id, employee.first_name, employee.last_name, 
        role.title AS position, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN employee manager ON manager.id = employee.manager_id;

SELECT employee.id, CONCAT(first_name, ' ', last_name) AS employee, role.title
FROM employee
LEFT JOIN role ON employee.role_id = role.id;