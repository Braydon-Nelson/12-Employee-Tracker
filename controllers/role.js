const {
    getAllDepartmentNames
} = require('./department');
const {
    getDepartmentID
} = require('../models/department');
const {
    getAllRoles
} = require('../models/role');
// const {
//     displayHeadline,
//     displayFooter
// } = require('../utils/log');

function addRole() {
    // try {
    const departmentNames = getAllDepartmentNames();

    const role = inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter the role that you would like to add: '
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary assigned for this role: '
        },
        {
            type: 'list',
            name: 'department',
            message: 'To which department would you like to add this role? ',
            choices: departmentNames
        }
    ]);

    role.departmentID = getDepartmentID(role.department);
    insertRole(role);
    // } catch (err) {
    //     if (err) throw err;
    // }
}

function getAllRoleNames() {
    // try {
    const roles = getAllRoles();

    let roleNames = [];
    for (const role of roles) {
        roleNames.push(role.Title);
    }

    return roleNames;
    // } catch (err) {
    //     if (err) throw err;
    // }
}

function removeRole() {
    // try {
    const roleNames = getAllRoleNames;

    const role = inquirer.prompt([
        {
            type: 'list',
            name: 'title',
            message: 'Which role would you like to remove? ',
            choices: roleNames
        }
    ]);

    deleteRole(role.title);
    // } catch (err) {
    //     if (err) throw err;
    // }
}

function displayAllRoles() {
    // try {
    const roles = getAllRoles();
    // const footer = displayHeadline('All Roles');
    console.table(roles);
    // displayFooter(footer);
    //     } catch (err) {
    //         if (err) throw err;
    //     }
}

module.exports = {
    addRole,
    getAllRoleNames,
    removeRole,
    displayAllRoles
};
