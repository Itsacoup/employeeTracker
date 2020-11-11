// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");







const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employees"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

function employeeMenu() {
  inquirer.prompt([
      {
          type: "list",
          name: "team",
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
    switch (answer) {
      case "view all employees":
        break;
      case "view all employees by department":
        break;
      case "view all employees by manager":
        break;
      case "add employee":
        break;
      case "remove employee":
        break;
      case "update employee role":
        break;
      case "update employee manager":
        break;
      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }
  });
};


// view all employess
// view all employees by department
// view all employees by department
// add employee
// remove employee
// update employee
// update employee role
// eupdate employee manager