import {
  renderGoods,
} from './modules/render.js';

import {
  checkUser,
  inputForm,
  actionList,
  checkState,
  addTaskForm,
} from './modules/control.js';


const init = () => {
  const list = document.querySelector("tbody");

  const {data, key} = checkUser();
  renderGoods(list, data);
  checkState(key);

  inputForm();
  actionList(key, list);
  addTaskForm(key);
};

init();
