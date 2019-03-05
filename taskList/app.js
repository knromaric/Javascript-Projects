//define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners() {
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  //clear all tasks
  clearBtn.addEventListener('click', clearAllTasks);
}

function clearAllTasks(e) {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure ?')) {
      const li = e.target.parentElement.parentElement;
      li.remove();
    }
  }
}

function addTask(e) {
  e.preventDefault();

  if (taskInput.value === '') {
    alert('add a task');
  }
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fas fa-times"></i>';
  link.style.cursor = 'pointer';
  li.appendChild(link);
  taskList.appendChild(li);
  taskInput.value = '';
}
