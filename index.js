let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let completedList = JSON.parse(localStorage.getItem("completedList")) || [];
const inputText = document.getElementById("text-input");
const myForm = document.getElementById("my-form");
const addButton = document.getElementById("add-todo");
const todoContainer = document.getElementById("todo-pending");
const completedContainer = document.getElementById("todo-completed");

todoList.forEach((todo) => {
  createHtml(todo.name, todo.todoId);
});

completedList.forEach((completedTodo) => {
  createCompHtml(completedTodo.name, completedTodo.todoId);
});

function createTodoItem(name, id) {
  return { name: name, todoId: id, isCompleted: false };
}

myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = inputText.value;
  const errorBox = document.createElement("div");
  errorBox.classList.add("error");
  errorBox.textContent = "Input is empty";
  if (text === "") {
    myForm.appendChild(errorBox);
    setTimeout(() => (errorBox.style.display = "none"), 1000);
    return;
  }

  const todoId = new Date();

  const todoItem = createTodoItem(text, todoId);
  todoList.push(todoItem);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  createHtml(text, todoId);
  inputText.value = "";
});

function createHtml(text, todoId) {
  const container = document.createElement("div");
  container.classList.add("todo-item");
  const parag = document.createElement("input");
  parag.value = text;
  parag.disabled = true;

  const time = document.createElement("span");
  time.textContent = todoId;

  const button = document.createElement("button");

  button.textContent = "-";
  button.addEventListener("click", () => removeTodo(container, todoId));
  const btnSection = document.createElement("div");
  btnSection.style = "display : flex ; gap : 10px ";

  const editButton = document.createElement("button");
  editButton.classList.add("edbtn");
  editButton.addEventListener("click", () => editTodo(parag));

  const doneButton = document.createElement("button");
  doneButton.textContent = "✓";
  doneButton.addEventListener("click", () => completeTodo(container, todoId));

  btnSection.append(doneButton, editButton, button);
  container.append(parag, time, btnSection);
  todoContainer.appendChild(container);
}

function completeTodo(el, todoId) {
  const todoIndex = todoList.findIndex((todo) => todo.todoId === todoId);
  if (todoIndex !== -1) {
    const completedTodo = todoList.splice(todoIndex, 1)[0];
    completedTodo.isCompleted = true;
    completedList.push(completedTodo);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("completedList", JSON.stringify(completedList));
    removeTodo(el, todoId);
    createCompHtml(completedTodo.name, completedTodo.todoId);
  }
}

function removeTodo(el, todoId) {
  todoList = todoList.filter((todo) => todo.todoId !== todoId);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  el.remove();
}

function removeCompTodo(el, todoId) {
  completedList = completedList.filter((todo) => todo.todoId !== todoId);
  localStorage.setItem("completedList", JSON.stringify(completedList));
  el.remove();
}

function editTodo(parag) {
  parag.disabled = false;
  parag.focus();

  parag.addEventListener("change", function () {
    parag.disabled = true;
  });
}

function createCompHtml(text, todoId) {
  const container = document.createElement("div");
  container.classList.add("todo-item-comp");
  container.style = "display: flex;";

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  const time = document.createElement("span");
  time.textContent = todoId;

  const button = document.createElement("button");

  button.textContent = "-";
  button.addEventListener("click", () => removeCompTodo(container, todoId));

  container.append(paragraph, time, button);
  completedContainer.appendChild(container);
}
