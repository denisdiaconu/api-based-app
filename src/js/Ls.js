export const setStorage = () => {
  if (!localStorage.getItem('appId')) {
    localStorage.setItem('appId', '');
  }
};

export const getId = () => localStorage.getItem(('appId'));

export const saveAppId = (id) => {
  if (!localStorage.getItem('appId')) {
    localStorage.setItem('appId', id);
  }
};

export const savePokemon = (arr) => localStorage.setItem('Pokemone', JSON.stringify(arr));
export const getPokemon = () => JSON.parse(localStorage.getItem('Pokemone')) || [];
