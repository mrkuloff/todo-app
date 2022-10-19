const getStorage = (key) => (localStorage.getItem(key) ?
  JSON.parse(localStorage.getItem(key)) : []);

const setStorage = (key, data=[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

const addStorage = (key, data) => {
  console.log(data);
  const newData = getStorage(key);
  console.log(newData);
  newData.push(data);
  setStorage(key, newData);
  };

export {
  getStorage,
  setStorage,
  addStorage,
};
