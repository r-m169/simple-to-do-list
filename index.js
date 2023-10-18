import { addTodolistToLocalstorage, getTodolistFromLocalStorage, updateCompletedTaskAndAddToLocalstorage } from './localstorage.js';

const todoList = getTodolistFromLocalStorage();
const todoAppResults = document.querySelector('.tasks-container');
const filterTabsBtns = document.querySelectorAll('.types-of-tasks button');
const createButton = document.querySelector('.create-button');
const taskInput = document.querySelector('.task-input');

const createTask = (title) => {
  const todoObject = {
    id: Date.now(),
    title: title,
    createdAt: new Date().toLocaleString(),
    completed: false,
  };

  todoList.push(todoObject);
  updateCompletedTaskAndAddToLocalstorage(todoList, todoObject.id);
  displayTasks();
}

const displayTasks = () => {
  const activeTab = document.querySelector('.types-of-tasks button.active');
  const filter = activeTab.dataset.tab;
  let filteredTasks = [];

  if (filter === '2') {
    filteredTasks = todoList.filter(task => !task.completed);
  } else if (filter === '3') {
    filteredTasks = todoList.filter(task => task.completed);
  } else {
    filteredTasks = todoList;
  }

  todoAppResults.innerHTML = '';
  filteredTasks.forEach(task => {
    const taskResult = document.createElement('div');
    taskResult.classList.add('task-result');

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('info');
    taskInfo.innerHTML = `
      <p>${task.title}</p>
      <span>${task.createdAt}</span>
    `;

    const checkBox = document.createElement('div');
    checkBox.classList.add('check-completed');
    if (task.completed) {
      checkBox.classList.add('check-completed-active');
    }
    checkBox.dataset.id = task.id;
    checkBox.addEventListener('click', () => {
      toggleTaskCompletion(task.id);
    });

    taskResult.appendChild(taskInfo);
    taskResult.appendChild(checkBox);

    todoAppResults.appendChild(taskResult);
  });
}

const toggleTaskCompletion = (taskId) => {
  const task = todoList.find(task => task.id === taskId);
  task.completed = !task.completed;
  updateCompletedTaskAndAddToLocalstorage(todoList, taskId);
  displayTasks();
}

const filterTabs = () => {
  filterTabsBtns.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabsBtns.forEach(tab => {
        tab.classList.remove('active');
      });
      tab.classList.add('active');
      displayTasks();
    });
  });
}

createButton.addEventListener('click', () => {
  const taskTitle = taskInput.value.trim();
  if (taskTitle !== '') {
    createTask(taskTitle);
    taskInput.value = '';
  }
});

displayTasks();
filterTabs();
