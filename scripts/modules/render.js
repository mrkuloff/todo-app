const createRow = ({id, task, status}) => {
  const tr = document.createElement('tr');
  tr.classList.add('table-task');
  tr.setAttribute('data-id', id);

  if (status === 'В процессе') {
    tr.classList.add('table-light');
    tr.insertAdjacentHTML('afterbegin', `
    <td class="number"></td>
    <td class="task">${task}</td>
    <td class="status">${status}</td>
    <td>
      <button class="btn btn-danger">
                Удалить
              </button>
              <button class="btn btn-success">
                Завершить
              </button>
    </td>
  `);
  } else if (status === 'Выполнено') {
    tr.classList.add('table-success');
    tr.insertAdjacentHTML('afterbegin', `
    <td class="number"></td>
    <td class="task text-decoration-line-through">
        ${task}
    </td>
    <td class="status">${status}</td>
    <td>
      <button class="btn btn-danger">
                Удалить
              </button>
              <button class="btn btn-success">
                Завершить
              </button>
    </td>
  `);
  }


  return tr;
};

const renderGoods = (elem, data) => {
  const allRow = data.map(createRow);

  elem.append(...allRow);
};

const addTask = (task) => {
  document.querySelector("tbody").append(createRow(task));
}

export {
  createRow,
  renderGoods,
  addTask,
};
