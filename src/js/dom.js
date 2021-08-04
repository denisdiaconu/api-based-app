import {
  lookup, getId,
} from './Ls';
import { postLikes, getLikes } from './InvolvementApi';

export const addlike = (e) => {
  const id = getId();
  const name = e.target.parentNode.children[0].textContent;
  if (lookup(name) === false) {
    e.target.classList.add('redheart');
    const obj = e.target.parentNode.parentNode;
    const counter = obj.querySelector('.counter');
    const num = parseInt(counter.textContent.split(' ')[0], 10);
    counter.textContent = `${num + 1} likes`;
  }
  postLikes(name, id);
  getLikes(id);
};

export const addToDom = (arr) => {
  const div = document.getElementById('list');
  arr.forEach(element => {
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

    const comments = document.createElement('button');
    comments.classList.add('comments');
    comments.textContent = 'Comments';

    childdiv.appendChild(img);
    childdiv.appendChild(nameAndLikes);
    childdiv.appendChild(span);
    childdiv.appendChild(comments);

    div.appendChild(childdiv);
  });
};