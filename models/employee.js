const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'employeeDB'
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
    if (employee.managerID) {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`;
        db.query(
            query,
            [
                employee.firstName,
                employee.lastName,
                employee.roleID,
                employee.managerID
            ],
            err => {
                if (err) {
                    throw err;
                } else {
                    console.log(`Employee added with ManagerID`);

                }
            }
        );
    } else {
        const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES(?, ?, ?)`;
        db.query(
            query,
            [
                employee.firstName,
                employee.lastName,
                employee.roleID
            ],
            err => {
                if (err) {
                    throw err;
                } else {
                    console.log(`Employee added with out ManagerID`);

                }
            }
        )
    }
}

function deleteEmployee(employeeName) {
    const firstName = employeeName.split(' ')[0];
    const lastName = employeeName.split(' ')[1];
    query = 'DELETE FROM employee WHERE first_name = ? AND last_name = ?';
    db.query(query, [firstName, lastName], err => {
        if (err) {
            throw err;
        } else {
            console.log(`Employee Deleted`);
        }
    });
}

function setEmployeeRole(employeeName, role) {
    const firstName = employeeName.split(' ')[0];
    const lastName = employeeName.split(' ')[1];
    const query = 'UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?';
    db.query(query, [firstName, lastName, role.id], err => {
        if (err) {
            throw err;
        } else {
            console.log(`Role set for Employee`);

        }
    })
}

function setEmployeeManager(employee, managerID = null) {
    const firstName = employee.split(' ')[0];
    const lastName = employee.split(' ')[1];
    let query = '';
    if (managerID != null) {
        query = 'UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?';
        db.query(query, [firstName, lastName], err/*, result, field)*/ => {
            if (err) {
                throw err;
            } else {
                console.log('Manager ID set for Employee');

            }
        })
    }
}

function setEmployeeDepartment(employeeName, department) {
    const firstName = employeeName.split(' ')[0];
    const lastName = employeeName.split(' ')[1];
    const query = `UPDATE employee SET id = ? WHERE first_name = ? AND last_name = ?`;
    db.query(query, [department.id, firstName, lastName], err => {
        if (err) {
            throw err;
        } else {
            console.log(`Department set for Employee`);
        }
    });
}

function getAllEmployees() {
    const query = 'SELECT * FROM employee';
    db.query(query, (err, results/*, fields*/) => {
        if (err) {
            throw err;
        } else {
            const employees = [];
            for (const employee of results) {
                const firstName = employee['first_name'];
                const lastName = employee['last_name'];
                employees.push(`${firstName} ${lastName}`);
            }
            console.log(employees);
        }
    });
};

function getManagerByID(managerID) {
    const query = 'SELECT * FROM employee WHERE id = ?';
    db.query(query, [managerID], (err, results, fields) => {
        if (err) {
            throw err;
        } else {
            const manager = `${results[0]['first_name']} ${results[0]['last_name']}`;
            console.log(manager);
        }
    });
};

function getAllManagers() {
    const query =
        'SELECT * FROM employee, employee manager WHERE employee.manager_id = manager.id';
    db.query(query, (err, results, fields) => {
        if (err) {
            throw err;
        } else {
            const managers = [];
            for (const manager of results) {
                const firstName = manager['first_name'];
                const lastName = manager['last_name'];
                managers.push(`${firstName} ${lastName}`);
            }
            console.log(managers);
        }
    });
};

function getAllEmployeesDetails() {
    const query = `SELECT employee.id AS 'ID', 
          first_name AS 'First Name', 
          last_name AS 'Last Name', 
          role.title AS 'Title', 
          department.name AS 'Department', 
          role.salary AS 'Salary', 
          manager_id
        FROM employee, role, department
        WHERE employee.role_id = role.id
          AND role.department_id = department.id
        ORDER BY employee.id ASC`;

    db.query(query, (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
};

function getAllEmployeesByDepartment(departmentID) {
    const query = `SELECT employee.id AS 'ID', 
          first_name AS 'First Name', 
          last_name AS 'Last Name'
        FROM employee
        WHERE employee.role_id = ANY (SELECT role.id FROM role WHERE role.department_id = ?)
        ORDER BY employee.id ASC`;
    db.query(query, [departmentID], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
};

function getAllEmployeesByManager(managerID) {
    const query = `SELECT id AS 'ID', 
          first_name AS 'First Name', 
          last_name AS 'Last Name'
        FROM employee WHERE employee.manager_id = ? 
        ORDER BY employee.first_name ASC`;
    db.query(query, [managerID], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
};

module.exports = {
    getEmployeeID,
    insertEmployee,
    deleteEmployee,
    setEmployeeRole,
    setEmployeeManager,
    setEmployeeDepartment,
    getAllEmployees,
    getManagerByID,
    getAllManagers,
    getAllEmployeesDetails,
    getAllEmployeesByDepartment,
    getAllEmployeesByManager
};
