const fs = require('fs');
const filePath = './tasks.json';

function loadTasks() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]');
    }
    return JSON.parse(fs.readFileSync(filePath));
}

function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function addTask(description) {
    const tasks = loadTasks();
    tasks.push({ id: Date.now(), description, status: 'todo' });
    saveTasks(tasks);
    console.log('✅ Task added.');
}

function listTasks() {
    const tasks = loadTasks();
    if (tasks.length === 0) return console.log('🟡 No tasks.');
    tasks.forEach(task => {
        console.log(`[${task.status}] ${task.id}: ${task.description}`);
    });
}

function updateTask(id, newStatus) {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id == id);
    if (!task) return console.log('❌ Task not found.');
    task.status = newStatus;
    saveTasks(tasks);
    console.log(`✅ Task ${id} marked as ${newStatus}.`);
}

function deleteTask(id) {
    let tasks = loadTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id != id);
    if (tasks.length === initialLength) return console.log('❌ Task not found.');
    saveTasks(tasks);
    console.log(`🗑️ Task ${id} deleted.`);
}

module.exports = { addTask, listTasks, updateTask, deleteTask };
