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


function render(index) {
taskList.innerHTML = "";
tasks.forEach(function(task) {
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
taskList.appendChild(li);
})
}


function toggleTask() {

}


function deleteTask() {

}


function saveTasks() {

}


function loadTasks() {

}

taskForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const userText = taskInput.value.trim();
    if (userText === "") {
        errorMsg.textContent = "Please enter a task";
    }
    errorMsg.textContent = "";
    addTask(userText);
    taskInput.value = "";
    taskInput.focus();
}
loadTasks();