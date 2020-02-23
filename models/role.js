const mysql = require('mysql');
// Conect to employee database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'employeeDB'
});

function getRoleID(roleTitle) {
    return new Promise((resolve, reject) => {
        const query = "SELECT id FROM role WHERE title = ?"
        db.query(query, [roleTitle.title], (err, results) => {
            if (err) {
                reject(err);
            } else {
                console.log('RESULTS VVVVVVVVV');
                console.log(roleTitle);

                console.log(results);
                console.log('RESULTS ^^^^^^^^^^');


                resolve(results[0].id);
            }
        });
    });
};

function insertRole(role) {
    return new Promise((resolve, reject) => {
        const query =
            `INSERT INTO role (title, salary, department_id)
     VALUES (?, ?, ?)`;
        db.query(query, [role.title, role.salary, role.departmentID], err => {
            if (err) {
                reject(err);
            } else {
                resolve('Success');
            }
        });
    });
};

function deleteRole(roleTitle) {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM role WHERE title = ?";
        db.query(query, [roleTitle], err => {
            if (err) {
                reject(err);
            } else {
                resolve('Success');
            }
        });
    });
};

function getAllRoles() {
    return new Promise((resolve, reject) => {
        const query = "SELECT id AS 'ID', title AS 'Title', salary AS 'Salary' FROM role";
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

function getAllTitles() {
    return new Promise((resolve, reject) => {
        const query = "SELECT id AS 'ID', title AS 'Title', salary AS 'Salary' FROM role";
        // Get the list of all titles
        const titles = [];
        db.query(query, (err, results) => {
            if (err) reject(err);

            for (const role of results) {
                titles.push(role.Title);
            }

            resolve(titles);
        });
    });
};



module.exports = {
    getRoleID,
    insertRole,
    deleteRole,
    getAllRoles,
    getAllTitles
}
