const inquirer = require('inquirer');
const db = require('./database');
const {
    addEmployee,
    removeEmployee,
    updateEmployeeManager,
    updateEmployeeRole,
    displayAllEmployees,
    displayAllEmployeesByDepartment,
    displayAllEmployeesByManager
} = require('./controllers/employee');
const {
    addDepartment,
    removeDepartment,
    displayAllDepartments
} = require('./controllers/department');
const { addRole, removeRole, displayAllRoles } = require('./controllers/role');
// const { displayBanner } = require('./utils/banner');

function init() {
    db.dropAndInit();
    // displayBanner();
    app();
}

function app() {
    console.log('\n');
    const answer = inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Select an option?',
            choices: [
                'View All Employees',
                'View All Employees by Department',
                'View All Employees by Manager',
                'View All Roles',
                'View All Departments',
                'Add Employee',
                'Remove Employee',
                'Update Employee Manager',
                'Update Employee Role',
                'Add Department',
                'Remove Department',
                'Add Role',
                'Remove Role',
                'View Total Budget',
                'View Total Department Budget',
                'Exit'
            ]
        }
    ]);

    switch (answer.action.toLowerCase()) {
        case 'view all employees':
            displayAllEmployees();
            app();
            break;
        case 'view all employees by department':
            displayAllEmployeesByDepartment();
            app();
            break;
        case 'view all employees by manager':
            displayAllEmployeesByManager();
            app();
            break;
        case 'view all roles':
            displayAllRoles();
            app();
            break;
        case 'view all departments':
            displayAllDepartments();
            app();
            break;
        case 'add employee':
            addEmployee();
            app();
            break;
        case 'remove employee':
            removeEmployee();
            app();
            break;
        case 'update employee manager':
            updateEmployeeManager();
            app();
            break;
        case 'update employee role':
            updateEmployeeRole();
            app();
            break;
        case 'update employee department':
            updateEmployeeDepartment();
            app();
            break;
        case 'add department':
            addDepartment();
            app();
            break;
        case 'remove department':
            removeDepartment();
            app();
            break;
        case 'add role':
            addRole();
            app();
            break;
        case 'remove role':
            removeRole();
            app();
            break;
        case 'exit':
            console.log('Have a nice day!');
            db.dropAndEnd();
        default:
            break;
    }
}

init();
