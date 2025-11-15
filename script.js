const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const errorMsg = document.getElementById("errorMsg");
const taskList = document.getElementById("taskList");

let tasks = [];

function addTask(text) {
    const taskObj = {
        text: text,
        completed: false
    }
    tasks.push(taskObj);
    render();
    saveTasks();
}

function render() {
    taskList.innerHTML = "";
    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        li.textContent = task.text;
        li.dataset.index = index;
        if (task.completed) {
            li.classList.add("completed");
        }
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        li.appendChild(deleteBtn);
        li.addEventListener("click", toggleTask);
        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            const li = event.target.closest("li");
            const index = li.dataset.index;
            deleteTask(index);
        })
        taskList.appendChild(li);
    })
}

function toggleTask(event) {
    const li = event.target;
    const index = li.dataset.index;
    tasks[index].completed = !tasks[index].completed;
    render();
    saveTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    render();
    saveTasks();
}

function saveTasks() {
    const taskString = JSON.stringify(tasks);
    localStorage.setItem("task", taskString);
}

function loadTasks() {
    const savedData = localStorage.getItem("task");
    if (savedData) {
        const newArray = JSON.parse(savedData);
        tasks.length = 0;
        newArray.forEach(function(item) {
            tasks.push(item);
        })
    }
    render();
}

taskForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const userText = taskInput.value.trim();
    if (userText === "") {
        errorMsg.textContent = "Please enter a task";
        taskInput.focus();
        return;
    }
    errorMsg.textContent = "";
    addTask(userText);
    taskInput.value = "";
    taskInput.focus();
}
loadTasks();