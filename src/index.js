import './scss/style.scss';
import {
  setStorage, getId,
} from './js/Ls';
import { GetAppId, getLikes } from './js/InvolvementApi';
import Poke from './js/PokeApi';


setStorage();

const id = getId();
if (!id) {
  GetAppId();
} else {
  getLikes(id);
}


Poke();



