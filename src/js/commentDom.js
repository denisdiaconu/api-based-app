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

     commentMainDiv.appendChild(imgDiv)
     commentMainDiv.appendChild(imgTiltle)
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
      .catch(() => { this.flag = false; });
    return response;
  }