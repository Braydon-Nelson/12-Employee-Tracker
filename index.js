const mysql = require('mysql');
const db = require('./db/');

const {
    addEmployee,
    removeEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    displayAllEmployees,
    displayAllByManager,
    displayAllByDepartment
} = require('./controllers/employee');

const {
    addDepartment,
    removeDepartment,
    displayAllDepartments
} = require('./controllers/departments');

const {
    addRole,
    removeRole,
    displayAllRoles
} = require('./controllers/roles');

