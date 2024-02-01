/* Code in this section executes when all HTML contents are loaded */
document.addEventListener('DOMContentLoaded', function () {

/* **************** LOGIN/REGISTER SUCCESS BEGIN **************** */
    const userID = sessionStorage.getItem('userID');

    /* If user ID is obtained */
    if (userID) {
        console.log('User ID obtained:', userID);
        sessionStorage.removeItem('userID');
        loadTasks(userID);
    }

    /* Function that loads user tasks at succesful login or register */
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
    /* Clearing the session storage and switching back to main.html
    * I doubt that it's safe xd */
    buttonLogout.addEventListener('click', function () {
        console.log("Logging out");
        sessionStorage.clear();
        window.location.href = "main.html";
    });
/* **************** LOGOUT BUTTON END **************** */

/* **************** ADD TASK BEGIN **************** */
    /* Click event listener for button that adds task */
    buttonAddTask.addEventListener('click', function () {
        addTask(userID);
    });

    /* Keydown event listener for enter button that adds task */
    taskInput.addEventListener('keydown', function (event) {
       if (event.key === 'Enter') {
           addTask(userID);
       }
    });

    /* Adds task by sending it to the server and
    * when response is successful it displays task on user interface
    * also clear the input form */
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
        /* Response decoding */
        .then(response => {
            if (200 === response.status) {
                return response.json();
            } else {
                return response.json();
            }
        })
        .then(newTask => {
            console.log(newTask);
            displayTask(newTask);
        })
        .catch(error => console.error("Error adding task:", error));
    }

    /* Clears input form */
    function clearInput() {
        taskInput.value = '';
    }

    /* Displays multiple tasks */
    function displayTasks(tasks) {
        tasks.forEach(task => {
            displayTask(task);
        });
    }

    /* Displays one single task on list */
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
        /* If task is completed then use completeTaskUI that updates the user interface */
        if (task.completed) {
            completeTaskUI(taskElement);
        }
    }
/* **************** ADD TASK END **************** */

/* **************** REMOVE/COMPLETE TASK BEGIN **************** */
    document.getElementById('id-task-list').addEventListener('click', function (event) {
        /* click event listener for button-delete */
        if (event.target.classList.contains('button-delete')) {
            deleteTask(event.target.parentNode);
        }
        /* click event listener for button-complete */
        if (event.target.classList.contains('button-complete')) {
            completeTaskUI(event.target.parentNode);
        }
    });

    /* Deletes task from list on user interface */
    function deleteTask(task) {
        let taskList = task.parentNode;
        taskList.removeChild(task);
    }

    /* Sets task as complete on user interface */
    function completeTaskUI(task) {
        let taskContent = task.querySelector('.task-content')
        taskContent.style.textDecoration = 'line-through';
    }

/* **************** REMOVE/COMPLETE TASK END **************** */





});
