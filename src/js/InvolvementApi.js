import { saveAppId } from './Ls';

const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
let appId = null;

export const GetAppId = () => {
  fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.text())
    .then((res) => {
      appId = res;
      saveAppId(res);
    });
};

export const getLikes = (appId) => {
  fetch(`${baseUrl}${appId}/likes`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((response) => response.text())
    .then((res) => console.log(`success: ${res}`));
};

export const postLikes = (name) => {
  fetch(`${baseUrl}${appId}/likes`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ item_id: name }),
  }).then((response) => response.text())
    .then((res) => {
      console.log(`success: ${res}`);
      getLikes(appId);
    });
};