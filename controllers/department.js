const {
    insertDepartment,
    getAllDepartments,
    deleteDepartment
} = require('../models/department');
// const {
//     displayHeadline,
//     displayFooter
// } = require('../utils/log');

function addDepartment() {
    try {
        const department = inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the new department you would like to add '
            }
        ]);

        insertDepartment(department.name);
    } catch (err) {
        if (err) throw err;
    }
}


function getAllDepartmentNames() {
    try {
        const departments = getAllDepartments();

        let departmentNames = [];
        for (const department of departments) {
            departmentNames.push(department.Name);
        }

        return departmentNames;
    } catch (err) {
        if (err) throw err;
    }
}

function removeDepartment() {
    try {
        const departmentNames = getAllDepartmentNames();

        const department = inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which department would you like to remove? ',
                choices: departmentNames
            }
        ]);

        deleteDepartment(department.name);
    } catch (err) {
        if (err) throw err;
    }
}

function displayAllDepartments() {
    try {
        const departments = getAllDepartments();
        // const footer = displayHeadline('All Departments');
        console.table(departments);
        // displayFooter(footer);
    } catch (err) {
        if (err) throw err;
    }
}

module.exports = {
    addDepartment,
    getAllDepartmentNames,
    removeDepartment,
    displayAllDepartments
};
