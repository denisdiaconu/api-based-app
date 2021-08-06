import { saveAppId } from './Ls';

const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';

export const displayLikes = async (arr) => {
  const list = JSON.parse(arr);
  list.forEach((item) => {
    const elementid = document.querySelector('#'.concat(item.item_id));
    const elementclass = document.querySelector('.'.concat(item.item_id));
    if (elementclass !== null) {
      elementclass.classList.add('redheart');
      elementid.textContent = `${item.likes} likes`;
    }
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

export const getLikes = async () => {
  const res = await fetch(`${baseUrl}hHoFD9j03SveUto9LYCt/likes`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((response) => response.text())
    .catch(err => err.JSON);
  if (res !== null || res !== undefined) displayLikes(res);
};

export const postLikes = (name, appId) => {
  fetch(`${baseUrl}hHoFD9j03SveUto9LYCt/likes`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ item_id: name }),
  }).then((response) => response.text())
    .then(() => getLikes(appId));
};