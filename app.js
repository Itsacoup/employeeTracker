// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("easy-table");
const cTable = require('console.table');
const Employee = require("./lib/newEmployee")


//connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employees"
});

//welcome message upon launch
function welcome(){
  
  console.log("\n")
  console.log("=".repeat(100));
  console.log(" ".repeat(36) + "WELCOME TO EMPLOYEE TRACKER")
  console.log(" ".repeat(38) + "A CLI DATABASE MANAGER")
  console.log("=".repeat(100));
  console.log("\n")
  
};
welcome();

//Navigation menu that calls all pieces of functionality by feeding prompt selection to switch statement
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
            "update employee manager",
            "exit"
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
        removeEmployee();
        break;
      case "update employee role":
        updateEmployeeRole();
        break;
      case "update employee manager":
        updateEmployeeManager();
        break;
      case "exit":
        exitApp();
        break;
      default:
        console.log(`Sorry, couldn't find what you were looking for.`);
    }
  });
};

// view all employess, sql SELECT statement sent to database that returns a table made up of coloums from all tables in DB
function allEmloyees() {
  connection.query("SELECT employee.first_name AS 'first name', employee.last_name AS 'last name', role.title, role.salary, department.name AS 'department', CONCAT(e.first_name, ' ' ,e.last_name) AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", function(err, res) {
    if (err) throw err;
    
    console.log("\n")
    console.table(res)
  });
  employeeMenu();
}
// view all employees by department, sql SELECT statement to return only employees by a selected department, making use of the foreign keys set in role_id and department_id
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

// view all employees by manager. sql SELECT statement similar to above but uses manager_id, which uses a switch to take in the "name" and covert it to the approiate id
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

// add employee, sql INSERT statement allows you to make new employee. Builds response object through series of prompts, passes that into the newEmployee.js class
// constructor which returns an new object that role and manager id are added too, via switch statements. This is then utilized through template literals in the 
// insert statement.
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
      });
    console.log("Employee successfully added... \n" )
    };
    employeeMenu();  
  });
};

// remove employee. first a SELECT is used to render a list of all employees. It creates a data array of objects with id and names for reference, and creates and empty array. 
// A loop is then used to combine first/last names to one var and the fill the array with until length of object is met. This array allows for a dynamic list in the
// prompt for who you would like to remove. Once selected the name var is split into an array with first and last name indexes. These 2 indexs are compared against the 2 
// appropriate values in the data array returned earlier via another loop. When the match is found, the ID value of the current object is retrieved and set as a variable.
// that variable is then passed in to the Delete statement as a template literal.
function removeEmployee() {
  connection.query("SELECT id, first_name, last_name from employee;", function(err, res) {
    if (err) throw err;
    console.log("\n")
    const nameByid = res;
    const nameList = [];
    for (i=0; i < res.length; i++) {
      let first = res[i].first_name;
      let last = res[i].last_name;
      let name = first + " " + last;
      nameList.push(name);
    }
    inquirer.prompt([
      {
        type: "list",
        name: "empName",
        message: "Which employee would you like to remove?",
        choices: nameList,
      }
    ]).then(answer => {
      const queryName = answer.empName.split(" ");
      let idForQuery = 0;
      for (i=0; i < nameByid.length; i++) {
          if ( queryName[0] === nameByid[i].first_name && queryName[1] === nameByid[i].last_name ) {
            idForQuery = nameByid[i].id;
          }
              
      };
      console.log(idForQuery);
      connection.query(
        `DELETE FROM employee WHERE id = ${idForQuery}`,
        function(err, res) {
          if (err) throw err;
        console.log("\n Employee Succesfully Deleted...  \n") 
        employeeMenu()
        }
      );
    })
  });
};

// update employee role. sql UPDATE statement. The first part is nearly identical to the previous block in how it obtains an ID based on a name selection.
// Once the id is available the query is made based on the prompt reponses. In the case and role (by name) is selected in prompt and it goes through a switch to
// convert it to that roles approiate id key in the DB. and then updates the role of the chosen employee using the selected ID
function updateEmployeeRole() {
  connection.query("SELECT id, first_name, last_name from employee;", function(err, res) {
    if (err) throw err;
    console.log("\n")
    const nameByid = res;
    const nameList = [];
    for (i=0; i < res.length; i++) {
      let first = res[i].first_name;
      let last = res[i].last_name;
      let name = first + " " + last;
      nameList.push(name); 
    }
    inquirer.prompt([
      {
        type: "list",
        name: "empName",
        message: "Which employee would you like to update?",
        choices: nameList,
      },
      {
        type: "list",
        name: "newRole",
        message: "What will there new role be?",
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
      }
    ]).then(answer => {
      const queryName = answer.empName.split(" ");
      let idForQuery = 0;
      let roleidForQuery = 0;
      for (i=0; i < nameByid.length; i++) {
          if ( queryName[0] === nameByid[i].first_name && queryName[1] === nameByid[i].last_name ) {
            idForQuery = nameByid[i].id;
          }     
      };
      switch (answer.newRole) {

        case "Head Chef":
          roleidForQuery = 1;
          break;
        case "Sous Chef":
          roleidForQuery = 2;
          break;
        case "Cook":
          roleidForQuery = 3;
          break;
        case "Head Brewer":
          roleidForQuery = 4;
          break;
        case "Assistant Brewer":
          roleidForQuery = 5;
          break;
        case "General Manager":
          roleidForQuery = 6;
          break;
        case "Shift Manager":
          roleidForQuery = 7;
          break;
        case "Bartender":
          roleidForQuery = 8;
          break;
        default:
          console.log(`Sorry, couldn't find what you were looking for.`);
      };
      connection.query(
        `UPDATE employee Set role_id = ${roleidForQuery} WHERE id = ${idForQuery}`,
        function(err, res) {
          if (err) throw err;
        console.log("\n Employee Succesfully Deleted...  \n") 
        employeeMenu()
        }
      );
    })
  });
};


// update employee manager. sql UPDATE statement. Near indentical to last statement, save that it updates the manager id instead of role
function updateEmployeeManager() {
  connection.query("SELECT id, first_name, last_name from employee;", function(err, res) {
    if (err) throw err;
    console.log("\n")
    const nameByid = res;
    const nameList = [];
    for (i=0; i < res.length; i++) {
      let first = res[i].first_name;
      let last = res[i].last_name;
      let name = first + " " + last;
      nameList.push(name);
    }
    inquirer.prompt([
      {
        type: "list",
        name: "empName",
        message: "Which employee would you like to update?",
        choices: nameList,
      },
      {
        type: "list",
        name: "newManager",
        message: "Who will their new manager be?",
        choices: [
          "James Redford",
          "Shaun Yasaki",
          "Bill Riley"
        ]
      }
    ]).then(answer => {
      const queryName = answer.empName.split(" ");
      let idForQuery = 0;
      let manageridForQuery = 0;
      for (i=0; i < nameByid.length; i++) {
          if ( queryName[0] === nameByid[i].first_name && queryName[1] === nameByid[i].last_name ) {
            idForQuery = nameByid[i].id;
          }       
      };
      switch (answer.newManager) {

        case "James Redford":
          manageridForQuery = 1;
          break;
        case "Shaun Yasaki":
          manageridForQuery = 4;
          break;
        case "Bill Riley":
          manageridForQuery = 5;
          break;
        default:
          console.log(`Sorry, couldn't find what you were looking for.`);
      };
      connection.query(
        `UPDATE employee Set manager_id = ${manageridForQuery} WHERE id = ${idForQuery}`,
        
        function(err, res) {
          if (err) throw err;
        console.log("\n Employee Succesfully Deleted...  \n") 
        employeeMenu()
        }
      );
    })
  }); 
};

// exits the app
function exitApp() {
  console.log("\n Thank you for using employee tracker app! \n")
  setTimeout(function(){ console.log("closing app in ... 3 \n"); }, 1000);
  setTimeout(function(){ console.log(" ... 2 \n"); }, 2000);
  setTimeout(function(){ console.log(" ... 1 \n"); }, 3000);
  setTimeout(function(){ console.log("Good Bye!"); }, 4000);
  setTimeout(function(){ process.exit()}, 5000);
};


//initializes
employeeMenu();
