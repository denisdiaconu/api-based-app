export const setStorage = () => {
  let flag = -1;
  if (!localStorage.getItem('likes')) {
    localStorage.setItem('likes', '[]');
    flag = 0;
  }
  if (!localStorage.getItem('appId')) {
    localStorage.setItem('appId', '');
    flag = 1;
  }
  return flag;
};

export const GETLIST = () => localStorage.getItem('likes');
export const UPDATELIST = (list) => localStorage.setItem('likes', JSON.stringify(list));
export const like = (name) => {
  const list = JSON.parse(GETLIST());
  const OBJ = {
    name,
  };

  list.push(OBJ);
  UPDATELIST(list);
};

export const lookup = (name) => {
  let target = false;
  const list = JSON.parse(GETLIST());
  list.forEach(element => {
    if (element.name === name) {
      target = true;
    }
  });
  return target;
};

export const unlike = (name) => {
  const list = JSON.parse(GETLIST());
  const newlist = list.filter(item => item !== name);
  UPDATELIST(newlist);
};

export const saveAppId = (id) => {
  if (!localStorage.getItem('appId')) {
    localStorage.setItem('appId', id);
  }
};

export const getId = () => localStorage.getItem(('appId'));
