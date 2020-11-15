USE employees;

INSERT INTO department (name)
VALUES ("Kitchen");

INSERT INTO department (name)
VALUES ("Brewery");

INSERT INTO department (name)
VALUES ("Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Head Chef", 60000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sous Chef", 45000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Cook", 35000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Head Brewer", 60000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Assistant Brewer", 40000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("General Manager", 500000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Shift Manager", 40000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Bartender", 30000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Redford", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brittney", "Buzzard", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Wiznig", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shaun", "Yasaki", 4, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bill", "Riley", 6, 4);

