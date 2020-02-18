const mysql = require('mysql');
const db = require('./db/');

const {
    addEmployee,
    deleteEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    displayAllEmployees,
    displayAllByManager,
    displayAllByDepartment
} = require('./controllers/employee');

const {
    addDepartment,
    deleteDepartment,
    displayAllDepartments
} = require('./controllers/departments');

const {
    addRole,
    deleteRole,
    displayAllRoles
} = require('./controllers/roles');

