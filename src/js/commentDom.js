const fetchApi = async (url, method, jsonBody = null) => {
  const response = await fetch(url, {
    method,
    body: jsonBody !== null ? JSON.stringify(jsonBody) : String.empty,
    headers: {
      'Content-type': 'application/json',
    },
  }).then(res => res.text()).catch(err => err);
  return response;
};
export const createApi = async () => {
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
  const response = await fetchApi(url, 'POST', null);
  localStorage.setItem('appId', response);
  return response;
};
export const getComments = async () => {
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
  try {
    const response = await fetch(`${url}/YIjg3yIZT4F7nzTzgVCU/comments?item_id=item_${localStorage.getItem('param_id')}`);
    const comments = await response.json();
    return comments;
  } catch (error) {
    return error.JSON;
  }
};
export const displayComment = async () => {
  if (document.getElementById('commentItems') !== null) {
    document.getElementById('commentItems').textContent = '';
  }
  const comments = await getComments();
  if (comments.length >= 1 && comments !== undefined) {
    document.getElementById('commentHead').textContent = `Comments(${comments.length})`;

    comments.forEach(element => {
      const commentItem = document.createElement('p');
      commentItem.className = 'commentItem';
      commentItem.id = 'commentItem';
      commentItem.textContent = `${element.creation_date} ${element.username} : ${element.comment}`;
      document.getElementById('commentItems').appendChild(commentItem);
    });
  }
};

const addComments = async () => {
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
  const name = document.getElementById('name').value;
  const insight = document.getElementById('insight').value;
  if (name === null || insight === null || name === '' || insight === '') {
    alert('Please Provide a Value');
    return false;
  }
  const commentObj = { item_id: `item_${localStorage.getItem('param_id')}`, username: name, comment: insight };
  const res = await fetchApi(`${url}/YIjg3yIZT4F7nzTzgVCU/comments`, 'POST', commentObj);
  await displayComment();
  return res;
};

export const commentDom = async () => {
  const params = localStorage.getItem('param_id');
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/${params}`;

  let response = await fetchApi(baseUrl, 'GET', null);
  response = JSON.parse(response);
  const myModal = document.createElement('div');
  myModal.className = 'modal';
  myModal.id = 'myModal';
  const commentMainDiv = document.createElement('div');
  commentMainDiv.className = 'commentMainDiv modal-content';
  commentMainDiv.id = 'myPopup';
  const imgDiv = document.createElement('div');
  const imgElem = document.createElement('img');
  imgElem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${params}.png`;
  imgDiv.appendChild(imgElem);
  imgDiv.className = 'commentimg';
  const imgTiltle = document.createElement('h3');
  imgTiltle.textContent = response.name;
  imgTiltle.classList = 'imgTiltle';

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'descriptionDiv';
  const descriptionDivSubPart1 = document.createElement('div');
  descriptionDivSubPart1.className = 'descriptionDivSubPart1';
  const partOne = document.createElement('span');
  const partTwo = document.createElement('span');
  partOne.textContent = `Base Exprience: ${response.base_experience} `;
  partOne.className = 'partOne';
  partTwo.className = 'partTwo';
  partTwo.textContent = `Height: ${response.height}`;
  descriptionDivSubPart1.appendChild(partOne);
  descriptionDivSubPart1.appendChild(partTwo);
  descriptionDiv.appendChild(descriptionDivSubPart1);

  const clearDiv = document.createElement('div');
  clearDiv.className = 'clearDiv';
  const descriptionDivSubPart2 = document.createElement('div');
  descriptionDivSubPart2.className = 'descriptionDivSubPart2';
  const partThree = document.createElement('span');
  partThree.textContent = `Weight: ${response.weight} `;
  partThree.className = 'partOne';
  descriptionDivSubPart2.appendChild(partThree);
  descriptionDiv.appendChild(clearDiv);
  descriptionDiv.appendChild(descriptionDivSubPart2);

  const commentDiv = document.createElement('div');
  commentDiv.className = 'commentDiv';
  const commentHead = document.createElement('h3');
  commentHead.textContent = 'Comments';
  commentHead.id = 'commentHead';
  const commentItems = document.createElement('div');
  commentItems.id = 'commentItems';
  const commentItemSubDiv = document.createElement('div');
  commentItemSubDiv.className = 'commentItemSubDiv';
  commentItemSubDiv.id = 'commentItemSubDiv';
  commentDiv.appendChild(commentHead);
  commentItems.appendChild(commentItemSubDiv);
  commentDiv.appendChild(commentItems);

  const addComment = document.createElement('div');
  addComment.className = 'addComment';
  const addCommentHeader = document.createElement('h2');
  addCommentHeader.textContent = 'Add Comments';
  const formAddDiv = document.createElement('div');
  formAddDiv.className = 'form-add';
  const formAdd = document.createElement('form');
  const NameDiv = document.createElement('div');
  const name = document.createElement('input');
  name.type = 'text';
  name.id = 'name';
  name.placeholder = 'Your name';
  NameDiv.appendChild(name);
  const insightDiv = document.createElement('div');
  const insight = document.createElement('textarea');
  insight.name = 'insight';
  insight.id = 'insight';
  insight.cols = 20;
  insight.rows = 10;
  insight.placeholder = 'Your Comment';
  insightDiv.appendChild(insight);
  const submitBtnDiv = document.createElement('div');
  const submitBtn = document.createElement('input');
  submitBtn.type = 'button';
  submitBtn.id = 'addcommentbtn';
  submitBtn.value = 'Comment';
  submitBtn.addEventListener('click', () => {
    addComments();
  });
  submitBtnDiv.appendChild(submitBtn);
  formAdd.appendChild(NameDiv);
  formAdd.appendChild(insightDiv);
  formAdd.appendChild(submitBtnDiv);
  formAddDiv.appendChild(formAdd);
  addComment.appendChild(addCommentHeader);
  addComment.appendChild(formAddDiv);

  commentMainDiv.appendChild(imgDiv);
  commentMainDiv.appendChild(imgTiltle);
  commentMainDiv.appendChild(descriptionDiv);
  commentMainDiv.appendChild(commentDiv);
  commentMainDiv.appendChild(addComment);

  const closebtn = document.createElement('span');
  closebtn.className = 'close';
  closebtn.innerHTML = '&times;';
  closebtn.addEventListener('click', () => {
    myModal.style.display = 'none';
    myModal.parentNode.removeChild(myModal);
    if (document.getElementById('commentItems') !== null) {
      document.getElementById('commentItems').textContent = '';
    }
  });
  commentMainDiv.appendChild(closebtn);
  window.addEventListener('click', (event) => {
    if (event.target === myModal) {
      myModal.style.display = 'none';
      myModal.parentNode.removeChild(myModal);
      if (document.getElementById('commentItems') !== null) {
        document.getElementById('commentItems').textContent = '';
      }
    }
  });
  myModal.appendChild(commentMainDiv);
  document.getElementById('mainDisplay').appendChild(myModal);
  await createApi();
};
