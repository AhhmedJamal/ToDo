let inp = document.getElementById("input");
let btn = document.getElementById("btn");
let list = document.getElementById("list");
let notTasks = document.getElementById("not-tasks");
let delAll = document.getElementById("delAll");
let alertM = document.getElementById("alert-massage");
let tasks = [];
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

checkTasks();
getTaskLocalStorage();
btn.addEventListener("click", () => {
  if (inp.value == "") {
    alertM.style.display = "block";
    setTimeout(() => {
      alertM.style.display = "none";
    }, 1000);
  } else {
    addTaskToArray(inp.value);
    checkTasks();
    inp.value = "";
    inp.focus();
  }
});
function checkTasks() {
  if (tasks.length == 0) {
    delAll.style.visibility = "hidden";
    notTasks.classList.add("found");
    notTasks.style.display = "flex";
  } else {
    delAll.style.visibility = "visible";
    notTasks.classList.remove("found");
    notTasks.style.display = "none";
  }
}
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    deleteTasks(e.target.parentElement.getAttribute("id"));
    e.target.parentElement.remove();
    checkTasks();
  }
  if (e.target.classList.contains("item")) {
    toggleCompleted(e.target.getAttribute("id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskValue) {
  const task = {
    id: Date.now(),
    text: taskValue,
    completed: false,
  };
  tasks.push(task);
  addTasksToList(tasks);
  addTaskLocalStorage(tasks);
}
function addTasksToList(tasks) {
  list.innerHTML = "";

  tasks.forEach((task) => {
    let li = document.createElement("li");
    let i = document.createElement("i");
    li.setAttribute("class", "item");
    li.setAttribute("id", task.id);
    i.className = "fa-solid fa-xmark delete";

    if (task.completed) {
      li.className = "done";
    }
    li.appendChild(document.createTextNode(task.text));
    li.appendChild(i);
    list.appendChild(li);
  });
}

function addTaskLocalStorage(tasksValue) {
  window.localStorage.setItem("tasks", JSON.stringify(tasksValue));
}
function getTaskLocalStorage() {
  let date = window.localStorage.getItem("tasks");
  if (date) {
    let tasks = JSON.parse(date);
    addTasksToList(tasks);
  }
}

function deleteTasks(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    tasks = tasks.filter((task) => task.id != taskId);
    addTaskLocalStorage(tasks);
  }
}

function toggleCompleted(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskId) {
      tasks[i].completed == false
        ? (tasks[i].completed = true)
        : (tasks[i].completed = false);
    }
  }
  addTaskLocalStorage(tasks);
}

delAll.addEventListener("click", () => {
  tasks = [];
  list.innerHTML = "";
  window.localStorage.removeItem("tasks");
  checkTasks();
});
