import {
  getId,
} from './Ls';
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

  const img = document.createElement('img');
  img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png';
  img.alt = 'venusaur';

  const pokemonName = document.createElement('h3');
  pokemonName.textContent = 'venusaur';

  const info = document.createElement('div');
  info.setAttribute('id', 'info');

  const infoleft = document.createElement('div');
  infoleft.setAttribute('id', 'infoDisplayLeft');

  const infoleftdiv1 = document.createElement('div');
  const infoleftdiv2 = document.createElement('div');

  const power = document.createElement('span');
  power.textContent = 'Power';

  const powerValue = document.createElement('span');
  powerValue.textContent = '100';

  const effect = document.createElement('span');
  effect.textContent = 'Effect: ';

  const effectValue = document.createElement('span');
  effectValue.textContent = 'some Effect';

  infoleftdiv1.append(power, powerValue);
  infoleftdiv2.append(effect, effectValue);
  infoleft.append(infoleftdiv1, infoleftdiv2);

  const inforight = document.createElement('div');
  inforight.setAttribute('id', 'infoDisplayRight');

  const inforightdiv1 = document.createElement('div');
  const inforightdiv2 = document.createElement('div');

  const powerRight = document.createElement('span');
  powerRight.textContent = 'Power';

  const powerValueRight = document.createElement('span');
  powerValueRight.textContent = '100';

  const effectRight = document.createElement('span');
  effectRight.textContent = 'Effect: ';

  const effectValueRight = document.createElement('span');
  effectValueRight.textContent = 'some Effect';

  inforightdiv1.append(powerRight, powerValueRight);
  inforightdiv2.append(effectRight, effectValueRight);
  inforight.append(inforightdiv1, inforightdiv2);

  const postComments = document.createElement('div');
  postComments.setAttribute('id', 'postComments');

  const postHeader = document.createElement('h3');
  postHeader.setAttribute('id', 'postHeader');
  postHeader.textContent = 'Comments ';

  const commentCounter = document.createElement('span');
  commentCounter.setAttribute('id', 'commentCounter');
  commentCounter.textContent = 0;

  const post = document.createElement('div');
  post.setAttribute('id', 'post');

  const postDate = document.createElement('span');
  postDate.textContent = '01/01/2021';

  const postName = document.createElement('span');
  postName.textContent = ' some Name ';

  const postDescription = document.createElement('span');
  postDescription.textContent = 'some random post text';

  const form = document.createElement('form');
  form.setAttribute('id', 'form');

  const formHeader = document.createElement('h3');
  formHeader.textContent = 'Add a comment';

  const nameInputDiv = document.createElement('div');

  const nameInput = document.createElement('input');
  nameInput.setAttribute('id', 'nameInput');
  nameInput.type = 'text';
  nameInput.placeholder = 'Your Name';

  const textAreaDiv = document.createElement('div');

  const textArea = document.createElement('textarea');
  textArea.placeholder = 'Your insights';
  textArea.rows = '10';
  textArea.cols = '30';

  const submitBtn = document.createElement('submit');
  submitBtn.textContent = 'Comment';

  nameInputDiv.appendChild(nameInput);
  textAreaDiv.appendChild(textArea);

  form.append(formHeader, nameInputDiv, textArea, submitBtn);

  post.append(postDate, postName, postDescription);
  postHeader.appendChild(commentCounter);
  postComments.append(postHeader, post);

  info.append(infoleft, inforight);

  overlayCard.append(closePopUp, img, pokemonName, info, postComments, form);

  overlayContainer.appendChild(overlayCard);
};

export const addlike = (e) => {
  const id = getId();
  const name = e.target.parentNode.children[0].textContent;
  e.target.classList.add('redheart');
  postLikes(name, id);
};

export const popUp = () => {
  const overlayContainer = document.getElementById('overlayContainer');
  overlayContainer.setAttribute('class', 'overlay');
  popUpCard(overlayContainer);
};

export const addToDom = (arr) => {
  const div = document.getElementById('list');
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
    comments.setAttribute('id', index);
    comments.addEventListener('click', () => {
      popUp();
    });
    childdiv.appendChild(img);
    childdiv.appendChild(nameAndLikes);
    childdiv.appendChild(span);
    childdiv.appendChild(comments);

    div.appendChild(childdiv);
  });
};
