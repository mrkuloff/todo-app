import {getStorage,
  setStorage,
  addStorage,} from './serviceStorage.js';

import {
  addTask,
} from './render.js';


const checkUser = () => {
  const user = prompt('Под каким пользователем Вы хотите работать?');

  if (user!==null && typeof user === 'string') {
    if (localStorage.getItem(user)) {
      const data = getStorage(user);
      return {
        data,
        key: user,
      };
    } else {
      setStorage(user);
      const data = getStorage(user);
      return {
        data,
        key: user,
      };
    }
  } else {
    return checkUser();
  }
};

const saveButton = document.querySelector('.btn-primary');
const resetButton = document.querySelector('.btn-warning');
const inputValueTask = document.querySelector('.form-control');
const form = document.querySelector('form');

const inputForm = () => {
  saveButton.disabled = true;
  resetButton.disabled = true;

  inputValueTask.addEventListener('mouseleave', (e)=> {
    e.preventDefault()
    if (inputValueTask.value !== '') {
      saveButton.disabled = false;
      resetButton.disabled = false;
    } else {
      saveButton.disabled = true;
      resetButton.disabled = true;
    }
  });

  resetButton.addEventListener('mouseleave', () => {
    inputValueTask.value = '';
    saveButton.disabled = true;
    resetButton.disabled = true;
  });
};

const createID = () => {
  return Math.random().toString().substring(2, 10);
}

const actionList = (key, list) => {

  const data = getStorage(key);

  list.addEventListener('click', e => {
    if (e.target.classList.contains('btn-success')) {
      const element = e.target.closest('tr');
      data.forEach((item) => {
        if (item.id === element.dataset.id) {
          if (item.status === "В процессе") {
            item.status = "Выполнено";
            setStorage(key, data);
            checkState(key);
          }
        }
      });
    } else if (e.target.classList.contains('btn-danger')){
      const element = e.target.closest('tr');
      data.forEach((item) => {
        if (item.id === element.dataset.id) {

          element.remove();

          const newData = getStorage(key);
          newData.splice([...document.querySelectorAll('.btn-danger')].indexOf(e.target), 1);
          setStorage(key, newData);

          checkState(key);
        }
      });
    }
  });

  list.addEventListener('dblclick', e => {
    if (e.target.classList.contains('btn-success')) {
      const element = e.target.closest('tr');
      data.forEach((item) => {
        if (item.id === element.dataset.id) {
          if (item.status === "Выполнено") {
            item.status = "В процессе";
            setStorage(key, data);
            checkState(key);
          }
        }
      });
    }
  });
}

const checkState = (key) => {
  const allTasks = getStorage(key);
  const btnSuccess = document.querySelectorAll('.btn-success');
  const tdNumber = document.querySelectorAll('.number');
  const tdTask = document.querySelectorAll('.task');
  const tdStatus = document.querySelectorAll('.status');
  const trTasks = document.querySelectorAll('tr');

  allTasks.forEach((item, index) => {
    if (item.status === 'Выполнено') {
      trTasks[index+1].classList.remove('table-light');
      trTasks[index+1].classList.add('table-success');
      tdTask[index].classList.add('text-decoration-line-through');
      tdStatus[index].textContent = item.status;
      btnSuccess[index].textContent = 'Восстановить';
    } else {
      trTasks[index+1].classList.remove('table-success');
      tdTask[index].classList.remove('text-decoration-line-through');
      tdStatus[index].textContent = item.status;
      btnSuccess[index].textContent = 'Завершить';
    }
    tdNumber[index].textContent = index+1;
  });
}

const addTaskForm = (key) => {
  form.addEventListener('submit', (event) => {

    event.preventDefault();
    const formData = new FormData(event.target);

    const valueTask = Object.fromEntries(formData);

    valueTask['id'] = createID();
    valueTask['status'] = 'В процессе';

    addTask(valueTask);
    addStorage(key, valueTask);
    form.reset();

    checkState(key);
    saveButton.disabled = true;
    resetButton.disabled = true;
  });
};

export {
  checkUser,
  saveButton,
  resetButton,
  inputValueTask,
  form,
  inputForm,
  createID,
  actionList,
  checkState,
  addTaskForm,
};

