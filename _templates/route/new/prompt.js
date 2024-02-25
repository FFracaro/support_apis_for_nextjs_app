module.exports = {
    prompt: ({ inquirer }) => {
      // defining questions in arrays ensures all questions are asked before next prompt is executed
        const questions = [{
            type: 'input',
            name: 'name',
            message: 'Class name for both controller and service <PascalCase>? (ex: ClientData)',
        },
        {
            type: 'confirm',
            name: 'validation',
            message: 'Do you need validation? (Will add a file with Zod)',
        },
        {
            type: 'confirm',
            name: 'database',
            message: 'Do you need database access?',
        },
        {
            type: 'input',
            name: 'route_type',
            message: 'Route type? (ex: POST or GET or PUT...)',
        },
        {
            type: 'input',
            name: 'route_return_code',
            message: 'Route controller return code? (ex. 200, 201, 204,...)',
        },
        {
            type: 'input',
            name: 'route_path',
            message: 'Route path? (ex: /client/data)',
        },
        {
            type: 'confirm',
            name: 'unit_test',
            message: 'Generate unit tests boilerplate?',
        }]

        return inquirer.prompt(questions)
    }
}
