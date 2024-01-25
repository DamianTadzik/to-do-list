/* Code in this section executes when all HTML contents are loaded */
document.addEventListener('DOMContentLoaded', function () {

/* **************** LOGIN/REGISTER SUCCESS BEGIN **************** */
    const userID = sessionStorage.getItem('userID');
    if (userID) {
        console.log('User ID obtained:', userID);
        sessionStorage.removeItem('userID');
        loadTasks(userID);
    }

    function loadTasks(userID) {
        fetch(`http://localhost:3000/getTasks?userID=${userID}`)
        .then(response => response.json())
        .then(tasks => {
            displayTasks(tasks);
        })
        .catch(error => console.error("Error loading tasks:", error));
    }
/* **************** LOGIN/REGISTER SUCCESS END **************** */

/* **************** VARIABLES SECTION BEGIN **************** */
    /* logout variables declarations */
    const buttonLogout = document.getElementById('button-logout');

    /* Task add variables and declarations */
    const buttonAddTask = document.getElementById('button-add-task');
    const taskInput = document.getElementById('input-task');
/* **************** VARIABLES SECTION END **************** */

/* **************** LOGOUT BUTTON BEGIN **************** */
    buttonLogout.addEventListener('click', function () {
        console.log("Logging out");
        sessionStorage.clear();
        window.location.href = "main.html";
    });
/* **************** LOGOUT BUTTON END **************** */

/* **************** ADD TASK BEGIN **************** */
    buttonAddTask.addEventListener('click', function () {
        addTask(userID);
    });

    taskInput.addEventListener('keydown', function (event) {
       if (event.key === 'Enter') {
           addTask(userID);
       }
    });

    function addTask(userID) {
        /* Obtain input and clear */
        const taskContent = taskInput.value.trim();
        clearInput();
        /* Send task to server */
        fetch(`http://localhost:3000/addTask?userID=${userID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                taskName: taskContent,
                completed: false,
            }),
        })
        .then(response => response.json())
        .then(newTask => {
            console.log(newTask);
            displayTask(newTask);
        })
        .catch(error => console.error("Error adding task:", error));
    }

    function clearInput() {
        taskInput.value = '';
    }

    function displayTasks(tasks) {
        tasks.forEach(task => {
            displayTask(task);
        });
    }

    function displayTask(task) {
        let taskList = document.querySelector(".class-task-list");
        /* Create new task element in UI */
        let taskElement = document.createElement("div");
        taskElement.className = 'class-task'
        taskElement.innerHTML = `` +
            `<span class="task-content">${task.task_name}</span>` +
            `<button class="button-delete"">Delete</button>` +
            `<button class="button-complete">Complete</button>` +
            ``;
        taskList.appendChild(taskElement);
        if (task.completed) {
            completeTaskUI(taskElement);
        }
    }
/* **************** ADD TASK END **************** */

/* **************** REMOVE/COMPLETE TASK BEGIN **************** */
    document.getElementById('id-task-list').addEventListener('click', function (event) {
        if (event.target.classList.contains('button-delete')) {
            deleteTask(event.target.parentNode);
        }
        if (event.target.classList.contains('button-complete')) {
            completeTaskUI(event.target.parentNode);
        }

    });

    function deleteTask(task) {
        let taskList = task.parentNode;
        taskList.removeChild(task);
    }

    function completeTaskUI(task) {
        let taskContent = task.querySelector('.task-content')
        taskContent.style.textDecoration = 'line-through';
    }

/* **************** REMOVE/COMPLETE TASK END **************** */





});
