const {
    insertDepartment,
    getAllDepartments,
    deleteDepartment
} = require('../models/department');

async function addDepartment() {
    try {
        const department = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the new department you would like to add:'
            }
        ]);

        await insertDepartment(department.name);
    } catch (err) {
        if (err) throw err;
    }
}

async function getAllDepartmentNames() {
    try {
        const departments = await getAllDepartments();

        let departmentNames = [];
        for (const department of departments) {
            departmentNames.push(department.Name);
        }

        return departmentNames;
    } catch (err) {
        if (err) throw err;
    }
}

async function removeDepartment() {
    try {
        const departmentNames = await getAllDepartmentNames();

        const department = await inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which department would you like to remove? ',
                choices: departmentNames
            }
        ]);

        await deleteDepartment(department.name);
    } catch (err) {
        if (err) throw err;
    }
}

async function displayAllDepartments() {
    try {
        const departments = await getAllDepartments();
        console.table(departments);
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
