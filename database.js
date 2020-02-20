const mysql = require('mysql');
// Conect to employee_db database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'employeeDB'
});

const database = {
    dropEmployeeTable: 'DROP TABLE IF EXISTS employee',
    dropRoleTable: 'DROP TABLE IF EXISTS role',
    dropDepartmentTable: 'DROP TABLE IF EXISTS department',
    createDepartmentTable: `CREATE TABLE IF NOT EXISTS department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
  )`,
    createRoleTable: `CREATE TABLE IF NOT EXISTS role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
  )`,
    createEmployeeTable: `CREATE TABLE IF NOT EXISTS employee(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id) 
  )`,
    reset: function () {
        db.query(this.dropEmployeeTable, err => {
            if (err) throw err;
        });

        db.query(this.dropRoleTable, err => {
            if (err) throw err;
        });

        db.query(this.dropDepartmentTable, err => {
            if (err) throw err;
        });

        db.query(this.createDepartmentTable, err => {
            if (err) throw err;
        });

        db.query(this.createRoleTable, err => {
            if (err) throw err;
        });

        db.query(this.createEmployeeTable, err => {
            if (err) throw err;
        });
    },
    init: function () {
        // Seed department table
        db.query(
            `INSERT INTO department (name) 
        VALUES 
          ('Sales'),
          ('Legal'),
          ('Fianace'),
          ('Engineering')`,
            err => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            }
        );

        // Seed role table
        db.query(
            `INSERT INTO role (title, salary, department_id) 
        VALUES 
          ('Sales Lead', 100000, 1),
          ('Salesperson', 200000, 1),
          ('Lawyer', 300000, 2),
          ('Legal Team Lead', 400000, 2),
          ('Accountant', 500000, 3),
          ('Software Engineer', 600000, 4),
          ('Lead Software Engineer', 700000, 4)`,
            err => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            }
        );

        // Seed employees
        db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES 
          ('Carter', 'A259', 1, 1),
          ('Kat', 'B320', 2, null),
          ('Jun', 'A266', 3, null),
          ('Emile', 'A239', 4, 3),
          ('Jorge', '052', 5, null)`,
            err => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            }
        );
    },
    dropAndInit: function () {
        this.reset();
        this.init();
    },
    dropAndEnd: function () {
        db.query(this.dropEmployeeTable, err => {
            if (err) throw err;
        });

        db.query(this.dropRoleTable, err => {
            if (err) throw err;
        });

        db.query(this.dropDepartmentTable, err => {
            if (err) throw err;
        });

        db.end();
    }
};

module.exports = database;
