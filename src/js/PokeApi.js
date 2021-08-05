import { savePokemon } from './Ls';
import { addToDom } from './dom';

const Poke = () => {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  fetch((baseUrl), {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((response) => response.json())
    .then((res) => {
      savePokemon(res.results);
      addToDom(res.results);

      localStorage.setItem('count', res.count);
    });
};

export default Poke;