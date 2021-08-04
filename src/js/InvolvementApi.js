import { saveAppId, savelikesApi } from './Ls';

const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';

export const displayLikes = (arr) => {
  const list = JSON.parse(arr);
  list.forEach((item) => {
    const elementid = document.getElementById(item.item_id);
    const elementclass = document.querySelector(`.${item.item_id}`);
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
    .then((res) => {
      savelikesApi(res);
      displayLikes(res);
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
    .then((res) => console.log(res));
};