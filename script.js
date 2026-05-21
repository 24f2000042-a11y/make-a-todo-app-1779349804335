document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from  if available
    const loadTasks = () => {
        const tasks = JSON.parse(.getItem('tasks') || '[]');
        tasks.forEach(taskText => {
            addTaskToDOM(taskText);
        });
    };

    // Save tasks to 
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li span').forEach(span => {
            tasks.push(span.textContent);
        });
        .setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to the DOM
    const addTaskToDOM = (taskText) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => {
            taskList.removeChild(li);
            saveTasks();
        };
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    };

    // Event listener for adding a task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText);
            taskInput.value = '';
            taskInput.focus();
            saveTasks();
        }
    });

    // Allow adding task by pressing Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // Initial load of tasks
    loadTasks();
});
