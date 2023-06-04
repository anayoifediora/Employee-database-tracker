INSERT INTO department (name)
    VALUES ('Finance'),
           ('Legal'),
           ('Marketing'),
           ('Shared Services');


INSERT INTO role (department_id, title, salary)
    VALUES  (001,'Financial Controller', 150000),
            (001, 'Finance Officer', 85000),
            (002, 'Head Legal', 200000),
            (002, 'Lawyer', 100000),
            (003, 'Branch Manager', 100000),
            (003, 'Relationship Officer', 80000),
            (004, 'Team Lead, Corporate Services', 100000),
            (004, 'Corporate Services Officer', 80000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES  ('Nikola', 'Jokic', 001, NULL),
            ('Jamal', 'Murray', 002, 001),
            ('Jimmy', 'Butler', 003, NULL),
            ('Bam', 'Adebayo', 004, 003),
            ('Lebron', 'James', 005, NULL),
            ('Anthony', 'Davis', 006, 005),
            ('Jayson', 'Tatum', 007, NULL),
            ('Jaylen', 'Brown', 008, 007);
