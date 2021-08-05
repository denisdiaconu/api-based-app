import { saveAppId } from './Ls';

const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';

export const errormsg = () => {
  const errorBody = document.createElement('div');
  errorBody.setAttribute('id', 'errorBody');

  const closeBtn = document.createElement('span');
  closeBtn.textContent = 'X';
  closeBtn.setAttribute('id', 'closeError');
  closeBtn.addEventListener('click', () => {
    errorBody.remove();
  });

  const msg = document.createElement('span');
  msg.textContent = 'Somthing went wrong please try again later!';

  errorBody.append(closeBtn, msg);
  const errorContainer = document.getElementById('errorContainer');
  errorContainer.appendChild(errorBody);
};

export const displayLikes = (arr) => {
  const list = JSON.parse(arr);
  list.forEach((item) => {
    const elementid = document.querySelector('#'.concat(item.item_id));
    const elementclass = document.querySelector('.'.concat(item.item_id));
    elementclass.classList.add('redheart');
    elementid.textContent = `${item.likes} likes`;
  });
};

export const GetAppId = () => {
  fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response => response.text()))
    .then((res) => saveAppId(res));
};

export const getLikes = (appId) => {
  fetch(`${baseUrl}${appId}/likes`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((response) => response.text())
    .then((res) => displayLikes(res))
    .catch(() => {
      errormsg();
    });
};

export const postLikes = (name, appId) => {
  fetch(`${baseUrl}${appId}/likes`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ item_id: name }),
  }).then((response) => response.text())
    .then(() => getLikes(appId));
};