USE employees;

INSERT INTO department (name)
VALUES ("Kitchen");

INSERT INTO department (name)
VALUES ("Brewery");

INSERT INTO department (name)
VALUES ("Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Head Chef", 0.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sous Chef", 0.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Cook", 0.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Head Brewer", 0.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Assistant Brewer", 0.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("General Manager", 0.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Shift Manager", 0.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Bartender", 0.00, 3);

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

