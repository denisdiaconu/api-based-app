export const commentDom= async()=>{
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/${params.id}`;
    
     const response= await fetchApi(baseUrl, 'GET')
     console.log(response);
     const commentMainDiv= document.createElement('div');
     commentMainDiv.className="commentMainDiv"
     const imgDiv=document.createElement('div');
     const imgElem=document.createElement('img');
     imgElem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${params.id}.png`
     imgDiv.appendChild(imgElem);
     imgDiv.className="commentimg"
     const imgTiltle= document.createElement('h3')
     imgTiltle.textContent=response.name;
     imgTiltle.classList="imgTiltle"

     const descriptionDiv=document.createElement('div');
     descriptionDiv.className="descriptionDiv";
     const descriptionDivSubPart1=document.createElement('div')
     descriptionDivSubPart1.className="descriptionDivSubPart1"
     const partOne=document.createElement('span')
     const partTwo=document.createElement('span')
     partOne.textContent="Fuel: AAAAA"
     partOne.className="partOne"
     partTwo.className="partTwo"
     partTwo.textContent="Lenght: BBBB"
     descriptionDivSubPart1.appendChild(partOne)
     descriptionDivSubPart1.appendChild(partTwo);
     descriptionDiv.appendChild(descriptionDivSubPart1);

     const clearDiv=document.createElement('div')
     clearDiv.className="clearDiv"
     const descriptionDivSubPart2=document.createElement('div')
     descriptionDivSubPart2.className="descriptionDivSubPart2"
     const partThree=document.createElement('span')
     const partFour=document.createElement('span')
     partThree.textContent="Fuel: AAAAA"
     partThree.className="partOne"
     partFour.className="partTwo"
     partFour.textContent="Lenght: BBBB"
     descriptionDivSubPart2.appendChild(partThree)
     descriptionDivSubPart2.appendChild(partFour);
     descriptionDiv.appendChild(clearDiv);
     descriptionDiv.appendChild(descriptionDivSubPart2);
     
     const commentDiv=document.createElement('div');
     commentDiv.className="commentDiv";
     const commentHead=document.createElement('h3');
     commentHead.textContent="Comments(2)";
     commentDiv.appendChild(commentHead)


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
     insight.cols=20
     insight.rows=10
     insight.placeholder = 'Your Comment';
     insightDiv.appendChild(insight);
     const submitBtnDiv = document.createElement('div');
     const submitBtn = document.createElement('input');
     submitBtn.type = 'button';
     submitBtn.id = 'addcommentbtn';
     submitBtn.value = 'Comment';
     submitBtnDiv.appendChild(submitBtn)
     formAdd.appendChild(NameDiv);
     formAdd.appendChild(insightDiv);
     formAdd.appendChild(submitBtnDiv);
     formAddDiv.appendChild(formAdd);
     addComment.appendChild(addCommentHeader);
     addComment.appendChild(formAddDiv)
     

     commentMainDiv.appendChild(imgDiv)
     commentMainDiv.appendChild(imgTiltle)
     commentMainDiv.appendChild(descriptionDiv)
     commentMainDiv.appendChild(commentDiv)
     commentMainDiv.appendChild(addComment);
     document.querySelector('.container').appendChild(commentMainDiv);
}

const fetchApi=async (url, method, jsonBody = null) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS,GET',
    },
    method,
    body: jsonBody !== null ? JSON.stringify(jsonBody) : String.empty,
  }).then((res) => res.json().then((data) => data))
    .catch(err=>console.log(err));
  return response;
}
 

  export const createApi=async () => {
    const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
    console.log(url)
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-type': 'application/json',
      },
    }).then(res=>res.text()).catch(err=>err);
    return response;
  }

  