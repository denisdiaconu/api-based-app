import { like, lookup } from './Ls';
import {commentDom, createApi, displayComment, getComments} from './commentDom'

export const increment = (e) => {
  const name = e.target.parentNode.children[0].textContent;
  console.log(name)
  if (lookup(name) === false) {
    e.target.classList.add('redheart');
    const obj = e.target.parentNode.parentNode;
    like(name);
    const counter = obj.querySelector('.counter');
    const increment = (parseInt(counter.textContent.split(' ')[0], 10) + 1).toString();
    counter.textContent = `${increment} likes`;
    // postLikes(name);
  }
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
    i.classList.add('far', 'fa-heart', 'heart');
    i.addEventListener('click', (e) => {
      increment(e);
    });

    nameAndLikes.appendChild(h3);
    nameAndLikes.appendChild(i);

    const span = document.createElement('span');
    span.classList.add('counter');
    span.textContent = '5 likes';

    const comments = document.createElement('button');
    comments.classList.add('comments');
    comments.textContent = 'Comments';
    comments.addEventListener('click', ()=>{
      let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=500,top=200`;
      window.open(`./comment.html?id=${num}`, 'indexcomment', params);

    })

    childdiv.appendChild(img);
    childdiv.appendChild(nameAndLikes);
    childdiv.appendChild(span);
    childdiv.appendChild(comments);

    div.appendChild(childdiv);
  });
};