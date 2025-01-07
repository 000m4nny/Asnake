// Globals
const calendarView = document.getElementById("calendar-view");
const todayView = document.getElementById("today-view");
const todayTaskList = document.getElementById("today-task-list");
const addTaskBtn = document.getElementById("add-task-btn");
const addTaskModal = document.getElementById("add-task-modal");
const taskForm = document.getElementById("task-form");
const cancelTaskBtn = document.getElementById("cancel-task-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Utility Functions
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTodayTasks() {
  todayTaskList.innerHTML = "";
  const today = new Date().toISOString().split("T")[0];
  tasks
    .filter(task => task.dueDate === today)
    .forEach(task => {
      const li = document.createElement("li");
      li.textContent = `${task.subject} - ${task.type}`;
      todayTaskList.appendChild(li);
    });
}

// Event Listeners
addTaskBtn.addEventListener("click", () => addTaskModal.classList.remove("hidden"));

cancelTaskBtn.addEventListener("click", () => addTaskModal.classList.add("hidden"));

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const subject = document.getElementById("subject").value;
  const taskType = document.getElementById("task-type").value;
  const dueDate = document.getElementById("due-date").value;
  tasks.push({ subject, type: taskType, dueDate });
  saveTasks();
  renderTodayTasks();
  addTaskModal.classList.add("hidden");
  alert("Task Saved!");
});

// Initial Render
renderTodayTasks();
