const inquirer = require('inquirer');
const taskManager = require('./taskManager');

async function main() {
    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: ['Add Task', 'List Tasks', 'Mark as In Progress', 'Mark as Done', 'Delete Task', 'Exit']
            }
        ]);

        if (action === 'Exit') break;

        if (action === 'Add Task') {
            const { desc } = await inquirer.prompt([{ type: 'input', name: 'desc', message: 'Enter task:' }]);
            taskManager.addTask(desc);
        }

        if (action === 'List Tasks') {
            taskManager.listTasks();
        }

        if (action === 'Mark as In Progress' || action === 'Mark as Done' || action === 'Delete Task') {
            const { id } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'Enter Task ID:' }]);
            if (action === 'Delete Task') {
                taskManager.deleteTask(id);
            } else {
                const status = action === 'Mark as Done' ? 'done' : 'in-progress';
                taskManager.updateTask(id, status);
            }
        }
    }
}

main();
