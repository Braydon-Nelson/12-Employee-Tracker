const mysql = require('mysql');
// Conect to employee_db database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'employeeDB'
});

function getRoleID(roleTitle) {
    const query = "SELECT id FROM role WHERE title = ?"
    db.query(query, [roleTitle], (err, results, fields) => {
        if (err) {
            throw err;
        } else {
            console.log(results[0].id);
        }
    });
};

function insertRole(role) {
    const query =
        `INSERT INTO role (title, salary, department_id)
     VALUES (?, ?, ?)`;
    db.query(query, [role.title, role.salary, role.departmentID], err => {
        if (err) {
            throw err;
        } else {
            console.log('Role added');
        }
    });
};

function deleteRole(roleTitle) {
    const query = "DELETE FROM role WHERE title = ?";
    db.query(query, [roleTitle], err => {
        if (err) {
            throw err;
        } else {
            console.log('Role Deleted');
        }
    });
};

function getAllRoles() {
    const query = "SELECT id AS 'ID', title AS 'Title', salary AS 'Salary' FROM role";
    db.query(query, (err, results, fields) => {
        if (err) {
            throw err;
        } else {
            console.log(results);
        }
    });
};

function getAllTitles() {
    const query = "SELECT id AS 'ID', title AS 'Title', salary AS 'Salary' FROM role";
    // Get the list of all titles
    const titles = [];
    db.query(query, (err, results, fields) => {
        if (err) throw err;

        for (const role of results) {
            titles.push(role.Title);
        }

        console.log(titles);
    });
};



module.exports = {
    getRoleID,
    insertRole,
    deleteRole,
    getAllRoles,
    getAllTitles
}
