const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Array to hold team members
const teamMembers = [];
// Starter pseudocode provided in class 

// Prompts for managers information 
const promptForManager =  () => {
inquirer.prompt([{
    //manager questions
    type: 'input',
    name: 'name',
    message: 'What is the name of the team Manager?'
},
{
    type: 'input',
    name: 'id',
    message: 'What is the employee ID of the team Manager?'
},
{
    type: 'input',
    name: 'email',
    message:'What is the email address of the team Manager?'
},
{
    type: 'input',
    name: 'officeNumberl',
    message:'What is the office number of the team Manager?'  
}
]).then(response => {
    // populate manager info
    const manager = new Manager(response.naem, response.id, response.email, response.officeNumber);
    teamMembers.push(manager);
    // promptForNexEmployee ()
    promptForNextEmployee();
});
}

const promptForNextEmployee = () => {
    inquirer.prompt([{
        // choice of 3
        type: 'list',
        name: 'role',
        message: 'Which type of team memeber would you like to add?',
        choices: ['Engineer', 'Intern', 'I don\'t want to add any more team members']
    }]).then(response => {
        // if engineer
        //    promptForEngineer
        // else if intern
        //    promptForIntern
        // else
        //    use the functionality from page-template to generate the team
    })
}

const promptForEngineer = () => {
    inquirer.prompt([{
        //engineer questions
    }]).then(response => {
        // add new engineer to employees array
        // promptForNextEmployee
    })
}

const promptForIntern = () => {
    inquirer.prompt([{
        //intern questions
    }]).then(response => {
        // add new intern to employees array
        // promptForNextEmployee
    })
}

const buildPage = () => {
// render(myArrayOfTeamMembers)
}
