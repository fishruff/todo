const todoForm = document.getElementById("todoForm");
const deskTaskInput = document.getElementById("descriptionTask");
const todoTask = document.querySelector(".todoTask");

let todoItemElems;

let tasks;
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem("tasks")));

class Task {
  constructor(desk) {
    this.desk = desk;
    this.completed = false;
  }
}

const createTamplate = (item, index) => {
  return `
  <div class="todoItem ${item.completed ? "checked" : ""}">
    <div class="desk">${item.desk}</div>
     <div class="btns">
        <input onclick="completeTask(${index})" type="checkbox" class="btnConplete" ${
    item.completed ? "checked" : ""
  }/>
        <button onclick="deleteTask(${index})" class="btnDelete">Delete</button>
     </div>
</div>
  `;
};

const filterTask = () => {
  const activeTask =
    tasks.length != 0 && tasks.filter((item) => !item.completed);
  const completedTask =
    tasks.length != 0 && tasks.filter((item) => item.completed);
  tasks = [...activeTask, ...completedTask];
};

const addTodo = () => {
  todoTask.innerHTML = "";
  if (tasks.length > 0) {
    filterTask();
    tasks.forEach((item, index) => {
      todoTask.innerHTML += createTamplate(item, index);
    });
    todoItemElems = document.querySelectorAll(".todoItem");
  }
};
addTodo();

const updateStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemElems[index].classList.add("checked");
  } else {
    todoItemElems[index].classList.remove("checked");
  }
  updateStorage();
  addTodo();
};

const deleteTask = (index) => {
  todoItemElems[index].classList.add("deleted");
  setTimeout(() => {
    tasks.splice(index, 1);
    updateStorage();
    addTodo();
  }, 500);
};

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  tasks.push(new Task(deskTaskInput.value));
  updateStorage();
  addTodo();
  deskTaskInput.value = "";
});
