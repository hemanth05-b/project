// 1. Select DOM elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// 2. Load tasks from LocalStorage on startup
document.addEventListener('DOMContentLoaded', loadTasks);

// 3. Add Task Function
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return alert('Please enter a task!');

    createTaskElement(taskText);
    saveTaskToLocal(taskText);
    taskInput.value = ''; // Clear input
});

function createTaskElement(text) {
    const li = document.createElement('li');
    li.innerText = text;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        removeTaskFromLocal(text);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// 4. LocalStorage Helpers
function saveTaskToLocal(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task));
}

function removeTaskFromLocal(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
