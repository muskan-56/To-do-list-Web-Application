document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('tasks');
    const messages = document.getElementById('messages');

    function displayMessage(message) {
        if (!messages) {
            console.error('Error: messages element not found');
            return;
        }

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        messages.appendChild(messageParagraph);

        setTimeout(() => {
            if (messages.contains(messageParagraph)) {
                messages.removeChild(messageParagraph);
            }
        }, 3000);
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.className = 'task';
        taskItem.innerHTML = `<span>${taskText}</span><button class="delete-task">x</button>`;
        const taskSpan = taskItem.querySelector('span');

        if (taskSpan) {
            taskSpan.addEventListener('click', () => {
                displayMessage('Task marked as completed.');
                taskItem.classList.toggle('completed');  // Toggle the completion state
            });
        } else {
            displayMessage('Error: No span found within taskItem');
        }

        taskItem.querySelector('.delete-task').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                taskList.removeChild(taskItem);
                displayMessage('Task deleted.');
            } else {
                displayMessage('Task not deleted.');
            }
        });

        taskList.appendChild(taskItem);
        taskInput.value = '';
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
