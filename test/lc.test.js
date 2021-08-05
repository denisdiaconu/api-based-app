const LocalStorage = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
}());

const getId = () => LocalStorage.getItem(('appId'));

const saveAppId = (id) => {
  if (!LocalStorage.getItem('appId')) {
    LocalStorage.setItem('appId', id);
  }
};

const savePokemon = (arr) => LocalStorage.setItem('Pokemone', JSON.stringify(arr));
const getPokemon = () => JSON.parse(LocalStorage.getItem('Pokemone')) || [];


test('Appid is set in the localstorage', () => {
    const id = 'wjafwihfauwbf82';
    saveAppId(id);
    const newId = LocalStorage.getItem('appId')
    expect(newId).toBe("wjafwihfauwbf82");
  });

  test('Get id from localstorage', () => {
    const id = getId();
    expect(id).toBe("wjafwihfauwbf82");
  });

  test('Save the pokemon in LC', () => {
    const pokemons = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'},
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/'},
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/'}
    ]
    savePokemon(pokemons);
    const arr = JSON.parse(LocalStorage.getItem("Pokemone"))
    expect(pokemons).toStrictEqual(arr);
  });
  test('Get pokemons from LC', () => {
    const pokemons = getPokemon();
    expect(pokemons).toHaveLength(3);
  });