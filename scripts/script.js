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
  actionList(key, list);

  inputForm();
  addTaskForm(key);
};

init();
