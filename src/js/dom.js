import {
  getId,
} from './Ls';
import {
  commentDom, displayComment,
} from './commentDom';

import { postLikes } from './InvolvementApi';

export const popUpCard = (overlayContainer) => {
  const overlayCard = document.createElement('div');
  overlayCard.setAttribute('id', 'overlay-card');

  const closePopUp = document.createElement('span');
  closePopUp.textContent = 'X';
  closePopUp.setAttribute('id', 'closePopUp');
  closePopUp.addEventListener('click', () => {
    overlayContainer.removeAttribute('class');
    document.getElementById('overlay-card').remove();
  });
};

export const addlike = (e) => {
  const id = getId();
  const name = e.target.parentNode.children[0].textContent;

  e.target.classList.add('redheart');
  postLikes(name, id);
};

export const addToDom = async (arr) => {
  const nav = document.createElement('ul');
  nav.className = 'nav';
  nav.id = 'nav';
  const navItemHome = document.createElement('li');
  navItemHome.className = 'item';
  navItemHome.textContent = 'Home';
  const navItemCount = document.createElement('li');
  navItemCount.className = 'item';

  const navItemAbout = document.createElement('li');
  navItemAbout.className = 'item';
  navItemAbout.textContent = 'About';
  navItemAbout.className = 'right';
  nav.appendChild(navItemHome);
  nav.appendChild(navItemCount);
  nav.appendChild(navItemAbout);

  document.getElementById('mainDisplay').appendChild(nav);

  const div = document.createElement('div');
  div.id = 'list';
  const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
  const response = await fetch(`${baseUrl}hHoFD9j03SveUto9LYCt/likes`).then(res => res.json()).catch(err => err);
  arr.forEach((element, index) => {
    const childdiv = document.createElement('div');
    childdiv.classList.add('card');

    const num = element.url.split('/')[6];
    const img = document.createElement('img');
    img.classList.add('image');
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${num}.png`;

    const nameAndLikes = document.createElement('div');
    nameAndLikes.classList.add('nameAndLikes');

    const h3 = document.createElement('h3');
    h3.textContent = element.name;
    navItemCount.textContent = `Pokeapi (${arr.length})`;

    const i = document.createElement('i');
    i.classList.add('far', 'fa-heart', 'heart', element.name);
    i.addEventListener('click', (e) => {
      addlike(e);
    });

    nameAndLikes.appendChild(h3);
    nameAndLikes.appendChild(i);

    const span = document.createElement('span');
    span.classList.add('counter');
    span.textContent = '0 likes';
    span.setAttribute('id', element.name);
    if (response !== null || response !== undefined) {
      response.forEach(ele => {
        if (ele.item_id === element.name) span.textContent = `${ele.likes} likes`;
      });
    }

    const comments = document.createElement('button');
    comments.classList.add('comments');
    comments.textContent = 'Comments';

    comments.addEventListener('click', async () => {
      localStorage.setItem('param_id', num);
      await commentDom();
      const modal = document.getElementById('myModal');
      modal.style.display = 'block';
      await displayComment();
    });

    comments.setAttribute('id', index);

    childdiv.appendChild(img);
    childdiv.appendChild(nameAndLikes);
    childdiv.appendChild(span);
    childdiv.appendChild(comments);

    div.appendChild(childdiv);
    document.getElementById('mainDisplay').appendChild(div);
  });
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  const div1 = document.createElement('div');
  div1.classList.add('div1');
  const div2 = document.createElement('div');
  div2.classList.add('div2');
  const htext = document.createElement('h5');
  htext.textContent = 'Created by Tedros and Denis';
  document.body.append(footer);
  footer.append(div1);
  div1.append(htext);
  footer.append(div2);
};
