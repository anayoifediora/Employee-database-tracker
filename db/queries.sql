SELECT * FROM department;

SELECT department.name AS department, role.title, role.salary
FROM department
LEFT JOIN role ON department.id = role.department_id;

SELECT employee.id, employee.first_name, employee.last_name, 
        role.title AS position, department.name AS department,
        role.salary, employee.manager_id
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON department.id = role.department_id;



INSERT INTO department (name)
VALUES ('${department}')

INSERT INTO role (title, salary, department.id)