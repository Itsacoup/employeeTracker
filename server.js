// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("easy-table");
const cTable = require('console.table');
const Employee = require("./lib/newEmployee")





const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employees"
});



function employeeMenu() {
  inquirer.prompt([
      {
          type: "list",
          name: "options",
          message: "What would you like to do?",
          choices: [
            "view all employees", 
            "view all employees by department", 
            "view all employees by manager", 
            "add employee",
            "remove employee",
            "update employee role",
            "update employee manager"
          ]  
      }

  ]).then(answer => {
    
    switch (answer.options) {
      case "view all employees":
        allEmloyees();
        break;
      case "view all employees by department":
        employeeByDept();
        break;
      case "view all employees by manager":
        employeeByManager();
        break;
      case "add employee":
        addEmployee();
        break;
      case "remove employee":
        break;
      case "update employee role":
        break;
      case "update employee manager":
        break;
      default:
        console.log(`Sorry, couldn't find what you were looking for.`);
    }
  });
};


// view all employess
function allEmloyees() {
  
  
  connection.query("SELECT employee.first_name AS 'first name', employee.last_name AS 'last name', role.title, role.salary, department.name AS 'department', CONCAT(e.first_name, ' ' ,e.last_name) AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", function(err, res) {
    if (err) throw err;
    
    console.log("\n")
    console.table(res)
  });

  employeeMenu();
}

// view all employees by department
function employeeByDept() {
  inquirer.prompt([
    {
        type: "list",
        name: "options",
        message: "Which department would you like",
        choices: [
          "Kitchen", 
          "Brewery", 
          "Service", 
        ]  
    }
  ]).then(answer => {
    
    switch (answer.options) {
      
      case "Kitchen":
        const kitchen = "Kitchen"
        getDept(kitchen);
        break;
      case "Brewery":
        const brewery = "Brewery"
        getDept(brewery);
        break;
      case "Service":
        const service = "Service"
        getDept(service);
        break;
      default:
        console.log(`Sorry, couldn't find what you were looking for.`);
    }
    function getDept(deptChoice) {

      console.log(deptChoice)
    
      connection.query(`SELECT employee.first_name AS 'first name', employee.last_name AS 'last name', role.title, role.salary, department.name AS 'department', CONCAT(e.first_name, ' ' ,e.last_name) AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE name = '${deptChoice}';`, 
      function(err, res) {
      if (err) throw err;
      
      console.log("\n")
      console.table(res)
      });

    };
    employeeMenu();
  });
};
 

// view all employees by manager

function employeeByManager() {
  inquirer.prompt([
    {
        type: "list",
        name: "options",
        message: "Which manager's staff would you like",
        choices: [
          "James Redford", 
          "Shaun Yasaki", 
          "Bill Riley", 
        ]  
    }
  ]).then(answer => {
    
    switch (answer.options) {
      
      case "James Redford":
        const james = 1
        getDept(james);
        break;
      case "Shaun Yasaki":
        const shaun = 4
        getDept(shaun);
        break;
      case "Bill Riley":
        const bill = 5
        getDept(bill);
        break;
      default:
        console.log(`Sorry, couldn't find what you were looking for.`);
    }
    function getDept(manChoice) {

      console.log(manChoice)
    
      connection.query(`SELECT employee.first_name AS 'first name', employee.last_name AS 'last name', role.title, role.salary, department.name AS 'department', CONCAT(e.first_name, ' ' ,e.last_name) AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE employee.manager_id = '${manChoice}';`, 
      function(err, res) {
      if (err) throw err;
      
      console.log("\n")
      console.table(res)
      });
      
    };
    employeeMenu();
  });
};

// add employee
function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is your employees first name?",
      validate: answer => {
        if (answer !== "") {
          return true;
        }

        return "Please enter a name";
      }
    },
    {
      type: "input",
      name: "last_name",
      message: "What is your employees last name?",
      validate: answer => {
        if (answer !== "") {
          return true;
        }

        return "Please enter a ID";
      }
    },
    {
      type: "list",
      name: "option1",
      message: "What is your employees title",
      choices: [
        "Head Chef",
        "Sous Chef",
        "Cook",
        "Head Brewer",
        "Assistant Brewer",
        "General Manager",
        "Shift Manager",
        "Bartender"
      ]
    },
    {
      type: "list",
      name: "option2",
      message: "Who is your employees manager",
      choices: [
        "James Redford",
        "Shaun Yasaki",
        "Bill Riley"
      ]
    }
    // {
    //   type: "input",
    //   name: "salary",
    //   message: "What is your employees salary?",
    //   validate: answer => {
    //     if (answer !== "") {
    //       return true;
    //     }

    //     return "Please enter a valid number";
    //   }
    // },
    // {
    //   type: "list",
    //   name: "option3",
    //   message: "What department does your employee work in?",
    //   choices: [
    //     "Kitchen",
    //     "Brewery",
    //     "Service"
    //   ]
    // }


  ]).then(answers => {
    const newEmployee = new Employee(answers.first_name, answers.last_name, answers.option1, answers.option2);

    switch (newEmployee.role_id) {

      case "Head Chef":
        newEmployee.role_id = 1;
        break;
      case "Sous Chef":
        newEmployee.role_id = 2;
        break;
      case "Cook":
        newEmployee.role_id = 3;
        break;
      case "Head Brewer":
        newEmployee.role_id = 4;
        break;
      case "Assistant Brewer":
        newEmployee.role_id = 5;
        break;
      case "General Manager":
        newEmployee.role_id = 6;
        break;
      case "Shift Manager":
        newEmployee.role_id = 7;
        break;
      case "Bartender":
        newEmployee.role_id = 8;
        break;
      default:
        console.log(`Sorry, couldn't find what you were looking for.`);
    };

    switch (newEmployee.manager_id) {

      case "James Redford":
        newEmployee.manager_id = 1;
        break;
      case "Shaun Yasaki":
        newEmployee.manager_id = 2;
        break;
      case "Bill Riley":
        newEmployee.manager_id = 3;
        break;
      default:
        console.log(`Sorry, couldn't find what you were looking for.`);
    };

    createEmployee(newEmployee);

    function createEmployee(newEmployee) {

      console.log(newEmployee)
    
      connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${newEmployee.first_name}', '${newEmployee.last_name}', '${newEmployee.role_id}', '${newEmployee.manager_id}')`, 
      function(err, res) {
      if (err) throw err;
      
      console.log("Employee successfully added...")
      });
      
    };
    employeeMenu();



    
  });
};

// remove employee
// update employee
// update employee role
// update employee manager


employeeMenu();
