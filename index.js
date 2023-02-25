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
    name: 'officeNumber',
    message:'What is the office number of the team Manager?'  
}
]).then(response => {
    // populate manager info
    const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
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
       
        if (response.role === 'Engineer') {  // if engineer promptForEngineer
            promptForEngineer();
        } else if (response.role === 'Intern') {  // else if intern
            promptForIntern();
        } else {
            // Check if the output page exisits, if it doesnt create it
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR);
            }
            const generateTeam = render(teamMembers);  //    use the functionality from page-template to generate the team
            fs.writeFile(outputPath, generateTeam, err => {
                if (err) throw err;
                console.log('Team members page generated successfully');
            });
        };
    });
};

const promptForEngineer = () => {
    inquirer.prompt([{
        //engineer questions
        type: 'input',
        name: 'name',
        message: 'What is the name of the engineer?'
        },
        {
        type: 'input',
        name: 'id',
        message: 'What is the employee ID of the engineer?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the engineer?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the github of the engineer?'
        },
        
    ]).then(response => {
        // add new engineer to employees array
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        teamMembers.push(engineer);
        // promptForNextEmployee
        promptForNextEmployee();
    });
};

const promptForIntern = () => {
    inquirer.prompt([{
        //intern questions
        type: 'input',
        name: 'name',
        message: 'What is the name of the intern?'
        },
        {
        type: 'input',
        name: 'id',
        message: 'What is the employee ID of the intern?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the intern?'
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the school of the intern?'
        },
        ]).then(response => {
        // add new intern to employees array
        const intern = new Intern(response.name, response.id, response.email, response.school);
        teamMembers.push(intern);
        // promptForNextEmployee
        promptForNextEmployee();
    });
}

const buildPage = () => {
// render(myArrayOfTeamMembers
const orgChart = render(teamMembers);
fs.writeFile(outputPath, orgChart, (err) => {
    if (err) throw err;
    console.log('Team member page sucessfully generated')
})
}
promptForManager();
