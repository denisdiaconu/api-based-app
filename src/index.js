import './scss/style.scss';
import { GetAppId } from './js/InvolvementApi';
import Poke from './js/PokeApi';

import { setStorage } from './js/Ls';

setStorage();
GetAppId();
Poke();
