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
}

function addTask(e){
  e.preventDefault();

  if(taskInput.value === ''){
    alert('add a task');
  }
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement('a');
  link.className='delete-item secondary-content';
  link.innerHTML = '<i class="fas fa-times"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
  taskInput.value = '';
}