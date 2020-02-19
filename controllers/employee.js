const inquirer = require('inquirer');
const consoleTable = require('console.table');

const {
    getEmployeeID,
    insertEmployee,
    getAllEmployees,
    getManagerByID,
    getAllManagers,
    setEmployeeManager,
    deleteEmployee,
    getAllEmployeesDetails,
    getAllEmployeesByDepartment,
    getAllEmployeesByManager
} = require('../models/employees');
const {
    getAllTitles,
    getRoleID
} = require('../models/role');
const {
    getDepartmentID
} = require('../models/department');
const {
    getAllDepartmentNames
} = require('./department');
const {
    displayHeadline,
    displayFooter
} = require('../utils/log');


function addEmployee() { //--------------------------------------------- Add Employee
    // Get all titles from the role table
    const titles = getAllTitles();

    // Get the list of employees from employee table
    const employees = getAllEmployees();
    // employees.unshift('None');

    // try {
    const employee = inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name? "
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name? "
        },
        {
            type: 'list',
            name: 'title',
            message: "What is employee's role? ",
            choices: titles
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is employee's manager ?",
            choices: employees
        }
    ]);

    employee.roleID = getRoleID(employee.title);
    employee.managerID = getEmployeeID(employee.manager);

    insertEmployee(employee);
    // } catch (err) {
    //     if (err) throw err;
    // }
}

function removeEmployee() {//--------------------------------------------- remove Employee
    // try {
    // Get the list of employees from employee table
    const employees = getAllEmployees();

    const employee = inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'Which employee would you like to remove ?',
            choices: employees
        }
    ]);

    const managers = getAllManagers();

    if (managers.includes(employee.name)) {
        const managerID = getEmployeeID(employee.name);
        const employeesManaged = getAllEmployeesByManager(managerID);

        for (let employeeManaged of employeesManaged) {
            employeeManaged =
                employeeManaged['First Name'] + ' ' + employeeManaged['Last Name'];
            setEmployeeManager(employeeManaged);
        }

        deleteEmployee(employee.name);
    } else {
        deleteEmployee(employee.name);
    }
    // } catch (err) {
    //   if (err) throw err;
    // }
}

function updateEmployeeManager() {
    // try {
    // Get the list of employees
    let employees = getAllEmployees();

    let employee = inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'Please select an employee: ',
            choices: employees
        }
    ]);

    employee = employee.name;
    employees = employees.filter(element => element !== employee);

    const manager = inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'Please select an employee to assign as the manager: ',
            choices: employees
        }
    ]);

    manager.id = getEmployeeID(manager.name);

    setEmployeeManager(employee, manager.id);
    // } catch (err) {
    //     if (err) throw err;
    // }
}

function updateEmployeeRole() {
    // try {
    // Get the list of employees
    let employees = getAllEmployees();

    let employee = inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'Please select an employee: ',
            choices: employees
        }
    ]);

    const titles = getAllTitles();

    const role = inquirer.prompt([
        {
            type: 'list',
            name: 'title',
            message: "Please select a role as the employee's new role: ",
            choices: titles
        }
    ]);

    setEmployeeRole(employee.name, role);
    // } catch (err) {
    //     if (err) throw err;
    // }
}

function displayAllEmployees() {
    // try {
    const employees = getAllEmployeesDetails();

    for (const employee of employees) {
        if (employee['manager_id'] !== null) {
            employee.Manager = getManagerByID(employee['manager_id']);
            delete employee['manager_id'];
        } else {
            employee.Manager = 'None';
            delete employee['manager_id'];
        }
    }
    const footer = displayHeadline('All Employees');
    console.table(employees);
    displayFooter(footer);
    // } catch (err) {
    //   if (err) {
    //     throw err;
    //   }
    // }
}

function displayAllEmployeesByDepartment() {
    // try {
    const departmentNames = getAllDepartmentNames();

    const department = inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'Please select a department ?',
            choices: departmentNames
        }
    ]);

    const departmentID = getDepartmentID(department.name);

    const employees = getAllEmployeesByDepartment(departmentID);

    const footer = displayHeadline(`All Employees in ${department.name}`);
    console.table(employees);
    displayFooter(footer);
    // } catch (err) {
    //   if (err) throw err;
    // }
}
