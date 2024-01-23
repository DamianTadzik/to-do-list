/* Code in this section executes when all HTML contents are loaded */
document.addEventListener('DOMContentLoaded', function () {

/* **************** VARIABLES SECTION BEGIN **************** */
    /* logout variables declarations */
    const buttonLogout = document.getElementById('button-logout');

    /* Task remove complete variables */


    /* Task add variables and declarations */
    const buttonAddTask = document.getElementById('button-add-task');
    const taskInput = document.getElementById('input-task');

/* **************** VARIABLES SECTION END **************** */

/* **************** LOGOUT BUTTON BEGIN **************** */
    buttonLogout.addEventListener('click', function () {
        console.log("LOGGING OUT");
        window.location.href = "main.html";
    });
/* **************** LOGOUT BUTTON END **************** */

/* **************** ADD TASK BEGIN **************** */
    buttonAddTask.addEventListener('click', function () {
        addTask();
        clearInput();
    });

    taskInput.addEventListener('keydown', function (event) {
       if (event.key === 'Enter') {
           addTask();
           clearInput();
       }
    });

    function clearInput() {
        taskInput.value = '';
    }

    function addTask() {
        let taskContent = taskInput.value.trim();
        if (taskContent !== "") {
            let taskList = document.querySelector(".class-task-list");

            /* Create new task element */
            let taskElement = document.createElement("div");
            taskElement.className = 'class-task'
            taskElement.innerHTML = `` +
                `<span class="task-content">${taskContent}</span>` +
                `<button class="button-delete"">Delete</button>` +
                `<button class="button-complete">Complete</button>` +
                ``;

            taskList.appendChild(taskElement);
        }
    }
/* **************** ADD TASK END **************** */

/* **************** REMOVE/COMPLETE TASK BEGIN **************** */
    document.getElementById('id-task-list').addEventListener('click', function (event) {
        if (event.target.classList.contains('button-delete')) {
            deleteTask(event.target.parentNode);
        }
        if (event.target.classList.contains('button-complete')) {
            completeTask(event.target.parentNode);
        }

    });

    function deleteTask(task) {
        let taskList = task.parentNode;
        taskList.removeChild(task);
    }

    function completeTask(task) {
        task.style.textDecoration = 'line-through';
    }

/* **************** REMOVE/COMPLETE TASK END **************** */
});
