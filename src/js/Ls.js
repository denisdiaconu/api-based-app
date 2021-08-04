export const setStorage = () => {
  let flag = -1;
  if (!localStorage.getItem('appId')) {
    localStorage.setItem('appId', '');
    flag = 1;
  }
  if (!localStorage.getItem('likeApi')) {
    localStorage.setItem('likeApi', '[]');
  }
  return flag;
};

export const getId = () => localStorage.getItem(('appId'));
export const saveAppId = (id) => {
  if (!localStorage.getItem('appId')) {
    localStorage.setItem('appId', id);
  }
};

export const likesApi = () => JSON.parse(localStorage.getItem('likeApi'));
export const savelikesApi = (response) => {
  if (response) {
    localStorage.setItem('likeApi', response);
  }
};

export const savePokemon = (arr) => localStorage.setItem('Pokemone', JSON.stringify(arr));
export const getPokemon = () => JSON.parse(localStorage.getItem('Pokemone')) || [];

export const lookup = (name) => {
  let target = false;
  const list = likesApi();
  if (list.length < 1) {
    return false;
  }
  list.forEach(element => {
    if (element.name === name) {
      target = true;
    }
  });
  return target;
};