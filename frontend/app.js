const API_URL = "http://localhost:5001/tasks";

const taskInput = document.getElementById("task-input");
const priorityInput = document.getElementById("priority");
const dueDateInput = document.getElementById("due-date");
const taskList = document.getElementById("task-list");
const addBtn = document.getElementById("add-task");
const progressBar = document.getElementById("progress-bar");
const statusEl = document.getElementById("status");
const toggle = document.getElementById("theme-toggle");

let tasks = [];

// -------------------- Online/Offline --------------------
function updateStatus() {
  statusEl.textContent = navigator.onLine ? "🔓 Online" : "🔒 Offline (local only)";
}
window.addEventListener("online", updateStatus);
window.addEventListener("offline", updateStatus);
updateStatus();

// -------------------- Dark/Light Mode --------------------
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});

// -------------------- Fetch Tasks --------------------
async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    tasks = await res.json();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  } catch (e) {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();
  }
}

// -------------------- Render Tasks --------------------
function renderTasks() {
  taskList.innerHTML = "";
  let doneCount = 0;

  tasks.forEach(task => {
    let priorityEmoji = "";
    if (task.priority === "low") priorityEmoji = "🍃";
    else if (task.priority === "medium") priorityEmoji = "🌼";
    else if (task.priority === "high") priorityEmoji = "🌟";

    const li = document.createElement("li");
    li.innerHTML = `
      <span ${task.completed ? 'style="text-decoration:line-through;"' : ""}>
        ${priorityEmoji} ${task.text} ${task.dueDate ? "📅 " + task.dueDate : ""}
      </span>
      <div>
        <button class="edit">✏️</button>
        <button class="delete">🗑️</button>
        <input type="checkbox" ${task.completed ? "checked" : ""}/>
      </div>
    `;

    li.querySelector(".delete").addEventListener("click", () => deleteTask(task._id));
    li.querySelector(".edit").addEventListener("click", () => editTask(task));
    li.querySelector("input").addEventListener("change", () => toggleTask(task._id));

    taskList.appendChild(li);

    if (task.completed) doneCount++;
  });

  progressBar.style.width = tasks.length ? `${(doneCount / tasks.length) * 100}%` : "0%";
}

// -------------------- Add Task --------------------
addBtn.addEventListener("click", addTask);

// Add task by pressing Enter key
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});

async function addTask() {
  const newTask = {
    text: taskInput.value,
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
    completed: false
  };
  if (!newTask.text) return;

  try {
    const res = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    });
    const savedTask = await res.json();
    tasks.push(savedTask);
  } catch {
    newTask._id = Date.now();
    tasks.push(newTask);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  taskInput.value = "";
}

// -------------------- Edit Task --------------------
function editTask(task) {
  const newText = prompt("Edit task:", task.text);
  if (!newText) return;
  task.text = newText;
  updateTask(task);
}

// -------------------- Toggle Task Completion --------------------
function toggleTask(id) {
  const task = tasks.find(t => t._id === id);
  if (!task) return;
  task.completed = !task.completed;
  updateTask(task);
}

// -------------------- Update Task --------------------
async function updateTask(task) {
  try {
    await fetch(`${API_URL}/update/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    });
  } catch {}
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// -------------------- Delete Task --------------------
async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
  } catch {}
  tasks = tasks.filter(t => t._id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// -------------------- Initial Fetch --------------------
fetchTasks();
