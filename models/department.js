const database = require('../database');
const mysql = require('mysql');

// Conect to employee_db database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'employeeDB'
});

function getDepartmentID(departmentName) {
    const query = "SELECT id FROM department WHERE name = ?";
    db.query(query, [departmentName], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results[0].id);
        }
    });
};

function insertDepartment(departmentName) {
    const query = "INSERT INTO department (name) VALUES (?)";
    db.query(query, [departmentName], err => {
        if (err) {
            console.log(err);
        } else {
            console.log('Department Added');
        }
    });
};

function deleteDepartment(departmentName) {
    const query = "DELETE FROM department WHERE name = ?";
    db.query(query, [departmentName], err => {
        if (err) {
            console.log(err);
        } else {
            console.log('Department Deleted');
        }
    });
};

function getAllDepartments() {
    const query = "SELECT id AS 'ID', name AS 'Name' FROM department";
    db.query(query, (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
};

module.exports = {
    getDepartmentID,
    insertDepartment,
    deleteDepartment,
    getAllDepartments
}
