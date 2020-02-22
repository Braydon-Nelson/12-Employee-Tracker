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
          ('UNSC Command'),
          ('UNSC Squad Lead'),
          ('UNSC Itelligence'),
          ('UNSC Riflemen'),
          ('UNSC Rookie')`,
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
          ('Noble One', 60000, 1),
          ('Noble Two', 50000, 2),
          ('Noble Three', 40000, 2),
          ('Noble Four', 30000, 4),
          ('Noble Five', 20000, 3),
          ('Noble Six', 10000, 5)`,
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
          ('Kat', 'B320', 2, 2),
          ('Jun', 'A266', 3, 2),
          ('Emile', 'A239', 4, 2),
          ('Jorge', '052', 5, 2)`,
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
