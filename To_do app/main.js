const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const toggleBtn = document.getElementById("toggleMode");

/* LOAD TASKS FROM LOCAL STORAGE */

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks(){

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => {
createTask(task.text, task.completed);
});

updateCounter();

}

/* ADD TASK */

function addTask(){

let task = taskInput.value.trim();

if(task === ""){
alert("Enter a task");
return;
}

createTask(task,false);

saveTasks();

taskInput.value="";

}

/* CREATE TASK ELEMENT */

function createTask(taskText, completed){

let li = document.createElement("li");

li.innerHTML = `
<label class="task-item">
<input type="checkbox" ${completed ? "checked" : ""} onchange="toggleTask(this)">
<span class="checkmark"></span>
<span class="task-text">${taskText}</span>
</label>

<button class="deleteBtn" onclick="deleteTask(this)">Delete</button>
`;

if(completed){
li.classList.add("completed");
}

taskList.appendChild(li);

}

/* TOGGLE TASK */

function toggleTask(checkbox){

let li = checkbox.closest("li");

li.classList.toggle("completed");

saveTasks();

updateCounter();

}

/* DELETE TASK */

function deleteTask(btn){

btn.parentElement.remove();

saveTasks();

updateCounter();

}

/* SAVE TASKS */

function saveTasks(){

let tasks = [];

document.querySelectorAll("#taskList li").forEach(li => {

let text = li.querySelector(".task-text").textContent;

let completed = li.classList.contains("completed");

tasks.push({
text:text,
completed:completed
});

});

localStorage.setItem("tasks", JSON.stringify(tasks));

}

/* ENTER KEY ADD TASK */

taskInput.addEventListener("keydown", function(e){

if(e.key === "Enter"){
addTask();
}

});

/* DARK MODE TOGGLE */

toggleBtn.addEventListener("click", function(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
toggleBtn.textContent="☀ ";
}else{
toggleBtn.textContent="🌙 ";
}

});

/* TASK COUNTER */

function updateCounter(){

let tasks = document.querySelectorAll("#taskList li");

let completed = document.querySelectorAll(".completed");

let total = tasks.length;

let completedCount = completed.length;

let remaining = total - completedCount;

document.getElementById("totalTasks").textContent = total;
document.getElementById("completedTasks").textContent = completedCount;
document.getElementById("remainingTasks").textContent = remaining;

}

/* Clear all task button*/

function clearTasks(){
localStorage.removeItem("tasks");
taskList.innerHTML="";
updateCounter();
}