document.addEventListener('DOMContentLoaded', function() {
    var taskInput = document.getElementById("taskInput");
    var addTaskBtn = document.getElementById("addTaskBtn");
    var incompleteTasks = document.getElementById("incompleteTasks");
    var completeTasks = document.getElementById("completeTasks");
    var noIncompleteTaskMessage = document.getElementById("noIncompleteTaskMessage");
    var noCompleteTaskMessage = document.getElementById("noCompleteTaskMessage");
    var sourceCodeBtn = document.getElementById("sourceCodeBtn");
    var clearCacheBtn = document.getElementById("clearCacheBtn");
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        incompleteTasks.innerHTML = "";
        completeTasks.innerHTML = "";
        
        var incompleteTasksExist = false;
        var completeTasksExist = false;

        tasks.forEach(function(task, index) {
            var li = document.createElement("li");
            li.textContent = task.text;
            li.classList.add("task-item");

            var completeBtn = document.createElement("button");
            completeBtn.innerHTML = "&#10003;";
            completeBtn.classList.add("task-btn", "complete-btn");
            completeBtn.addEventListener("click", function() {
                task.completed = !task.completed;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            });

            var deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "&times;";
            deleteBtn.classList.add("task-btn", "delete-btn");
            deleteBtn.addEventListener("click", function() {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            });

            var undoCompleteBtn = document.createElement("button");
            undoCompleteBtn.innerHTML = "&#8634;"; // Unicode for refresh icon
            undoCompleteBtn.classList.add("task-btn", "undo-complete-btn");
            undoCompleteBtn.addEventListener("click", function() {
                task.completed = !task.completed;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            });

            if (task.completed) {
                var completeDiv = document.createElement("div");
                completeDiv.classList.add("task-actions");
                completeDiv.appendChild(deleteBtn);
                completeDiv.appendChild(document.createTextNode(" "));
                completeDiv.appendChild(undoCompleteBtn);

                li.appendChild(completeDiv);
                completeTasks.appendChild(li);
                completeTasksExist = true;
            } else {
                var incompleteDiv = document.createElement("div");
                incompleteDiv.classList.add("task-actions");
                incompleteDiv.appendChild(completeBtn);
                incompleteDiv.appendChild(document.createTextNode(" "));
                incompleteDiv.appendChild(deleteBtn);

                li.appendChild(incompleteDiv);
                incompleteTasks.appendChild(li);
                incompleteTasksExist = true;
            }
        });

        noIncompleteTaskMessage.style.display = incompleteTasksExist ? "none" : "block";
        noCompleteTaskMessage.style.display = completeTasksExist ? "none" : "block";
    }

    addTaskBtn.addEventListener("click", function() {
        var newTaskText = taskInput.value.trim();
        if (newTaskText !== "") {
            tasks.push({ text: newTaskText, completed: false });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            renderTasks();
        } else {
            alert("Please enter a task!");
        }
    });

    renderTasks();

    sourceCodeBtn.addEventListener("click", function() {
        window.open('https://github.com/kamrulhasanio/To-Do', '_blank');
    });

    clearCacheBtn.addEventListener("click", function() {
        var confirmClear = confirm("Are you sure you want to clear the cache?");
        if (confirmClear) {
            localStorage.clear();
            alert('Cache cleared successfully.');
            location.reload();
        }
    });
});
