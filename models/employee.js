const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'employeesDB'
});

function getEmployeeID(employeeName) {
    if (employeeName === '') {
        return null;
    } else {
        return function () {
            const first = employeeName.split(' ')[0];
            const last = employeeName.split(' ')[1];
            const query = `SELECT id FROM employees WHERE fisrName = ? AND lastName = ?`;
            db.query(query, [first, last], function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return err;
                } else {
                    return results[0].id;
                }
            });
        }
    }
}

function insertEmployee(employee) {
    if (employee) {

    }
}