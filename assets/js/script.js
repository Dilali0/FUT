//for storing the json Data
let PlayerList = [] ;
let terain = [
  { name : 'player1' , position : -1 } ,
  { name : 'player2' , position : -1 } ,
  { name : 'player3' , position : -1  } ,
  { name : 'player4' , position : -1 } ,
  { name : 'player5' , position : -1  } ,
  { name : 'player6' , position : -1 } ,
  { name : 'player7' , position : -1 } ,
  { name : 'player8' , position : -1 } ,
  { name : 'player9' , position : -1 } ,
  { name : 'player10' ,position : -1  } ,
  { name : 'player11' , position : -1  } 
  ] ;
let Playerid ;
// on event load we have to make sure that the player position is getting from local storage
 document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("playerposition")){
      terain = JSON.parse(localStorage.getItem("playerposition")) ;
      terain.forEach((item)=>{
        if(item.position != -1){
           
          const inputs = PlayerList.find((player , i)=> player.id == item.position );
          document.getElementById(item.name).setAttribute("isempty" , "false");
           document.getElementById(item.name).innerHTML = createhtml(inputs,true) ;
        }
      })

    }else{
      localStorage.setItem("playerposition" ,JSON.stringify(terain))
    }
  });

// fetch data from json to array players and save it in local storage
  function fetchdata() {
    fetch("../../players.json")
     .then((response) => response.json())
     .then((data) => {
       console.log(data);
       PlayerList = Array.from(data);
       localStorage.setItem("myarray" , JSON.stringify(PlayerList))
     })  
 }

// get playrlist from local storage or creat it 
    if(localStorage.getItem("myarray")){
      PlayerList = JSON.parse(localStorage.getItem("myarray"))
    }
    else{
     fetchdata()
    }
 
  //----------------------Global variables----------------------------

  const formulaire = document.getElementById("formulair");
  const PlayersPrincipeaux = document.querySelectorAll(".playerPrincip");
  // PlayersPrincipeaux.forEach((item)=> {
  //   item.addEventListener('mouseover' , (e)=>{
  //     e.currentTarget.querySelector("#editmode").style.display = 'flex';
  //   }) ;
  //   item.addEventListener('mouseleave' , (e)=>{
  //     e.currentTarget.querySelector("#editmode").style.display = 'none';
  //   }) ;
  // })
  const PlayersCHangement = document.querySelectorAll(".playerCH");
  const POPUP = document.getElementById("cards") ;
  const formationSelect = document.getElementById("formation-select");
  const photo = document.getElementById('photo');
  const face = document.getElementById('face'); 


// i change the plan of the match from select value by changing the 

  const field = document.getElementById("field") ;
  const LW = document.getElementById("player1");
  const RW = document.getElementById("player3");
  const CM = document.getElementById("player6");

  formationSelect.addEventListener('change',(e)=>{

      if(e.target.value == "4-4-2"){
        field.classList.remove("formation-433");
        field.classList.add("formation-442");
        LW.querySelector(".PPS").textContent = "ST" ;
        RW.querySelector(".PPS").textContent = "LM" ;
        CM.querySelector(".PPS").textContent = "RM" ;

      }else{
        field.classList.remove("formation-442");
        field.classList.add("formation-433");
        LW.querySelector(".PPS").textContent = "LW" ;
        RW.querySelector(".PPS").textContent = "RW" ;
        CM.querySelector(".PPS").textContent = "RM" ;
      }
  })

//---------------------------------------------------------------------------
const ALLplayers = document.getElementById("players");
const Players= document.querySelectorAll(".player");

  Players.forEach((Player)=>{
    
      Player.addEventListener("click",(e)=>{
        ALLplayers.innerHTML = '';
        // ------------------------------------------------------------------------
        e.target.offsetParent.offsetParent.getAttribute("isempty")=="true" 
        && (ShowingPopUp() )  
        // ------------------------------------------------------------------------
         let PlayerPosition = e.target.offsetParent.offsetParent.querySelector(".PPS")?.textContent
         Playerid = e.target.offsetParent.offsetParent.id ;

         document.getElementById("position").value = PlayerPosition;
         PlayerList.map((player) => {
              if (player.position === PlayerPosition){
                const PlayerSamePost = document.createElement('div');
                PlayerSamePost.setAttribute(`onclick` , `PickPlayerPanel(${player.id} , '${Playerid}')`)
                // PlayerSamePost.setAttribute(`id` , `panelPlayer${player.id}`)
               
                PlayerSamePost.innerHTML = createhtml(player,false);
                ALLplayers.appendChild(PlayerSamePost);
              }   
            });
      })
  })
  
//-----------------------------ADD------------------------------------------------

photo.addEventListener('change', (event) => {
  
  const file = event.target.files[0];
  if (file) {
      
      const reader = new FileReader();
      reader.onload = function(e) {

          face.src = e.target.result;
      };

      reader.readAsDataURL(file);

    }else{
      //imagePreview.style.display = 'none';
    }
     })

function AddPlayer(e){
      e.preventDefault();

      let TheCurrentId = PlayerList.length +2;
      const inputs = {
        id : TheCurrentId ,
        name: document.getElementById("name").value,
        photo: document.getElementById("face").getAttribute('src'),
        position: document.getElementById("position").value,
        position: document.getElementById("position").value,
        nationality: document.getElementById("titleflag")?.textContent,
        flag: document.getElementById("imgflag")?.getAttribute('src'),
        club: document.getElementById("titleclub")?.textContent,
        rating: document.getElementById("ratingRange")?.value,
        pace: document.getElementById("pace")?.value,
        shooting: document.getElementById("shooting")?.value,
        passing: document.getElementById("passing")?.value,
        dribbling: document.getElementById("dribbling")?.value,
        defending: document.getElementById("defending")?.value,
        physical: document.getElementById("physical")?.value,
        logo: document.getElementById("imgclub")?.getAttribute('src'),
        cover: document.getElementById("imgCoverCombo")?.getAttribute('src'),
      };
      if(checkfiledTextValidation(inputs) == 0){
        PlayerList.push(inputs) ;
        localStorage.setItem("myarray",JSON.stringify(PlayerList)); 
        document.getElementById(Playerid)?.setAttribute("isempty","false")
        terain.forEach((item)=>{
          item.name == Playerid && 
          (item.name = Playerid ,
            item.position = TheCurrentId )})
        localStorage.setItem("playerposition" ,JSON.stringify(terain));
        
        document.getElementById(Playerid).innerHTML =  createhtml(inputs,true) ;
        resetForm()
    }
}

function checkfiledTextValidation(inputs){
  let regexname = /^[a-zA-Z\s]+$/  ;
  const errortext = document.getElementById("errortext") ;
  let foundProblems = 0 ;
  if(inputs.name ==''|| inputs.name.test(regexname) ) (foundProblems = 1 , errortext.textContent = "Name requiredalid or invalid") ;
  else if(inputs.photo =='')( foundProblems = 1 ,  errortext.textContent = "photo required");
  else if(inputs.flag == undefined || inputs.nationality == undefined  )( foundProblems = 1 ,  errortext.textContent = "Nationallity  required");
  else if(inputs.club == undefined || inputs.logo == undefined  ) (foundProblems = 1 ,  errortext.textContent ="Club required");
  return foundProblems;
}

function PickPlayerPanel(id , cardid){
  const inputs =  PlayerList.find((item,i)=>item.id==id )
  console.log(inputs)
  let foundplayer = false ;
  terain.forEach((item)=>item.name==Playerid && (foundplayer = true 
  )  )
  document.getElementById(""+cardid).innerHTML =  createhtml(inputs , foundplayer);
  terain.forEach((player , i)=>player.name==cardid && (terain[i].position = id) )
  localStorage.setItem("playerposition",JSON.stringify(terain)) 

  sed();
}

function UpdatePlayer_(e){
  e.preventDefault();

  const inputs = {
    id : SelectedPlayer,
    name: document.getElementById("name").value,
    photo: document.getElementById("face").getAttribute('src'),
    position: document.getElementById("position").value,
    nationality: document.getElementById("titleflag")?.textContent,
    flag: document.getElementById("imgflag")?.getAttribute('src'),
    club: document.getElementById("titleclub")?.textContent,
    rating: document.getElementById("ratingRange")?.value,
    pace: document.getElementById("pace")?.value,
    shooting: document.getElementById("shooting")?.value,
    passing: document.getElementById("passing")?.value,
    dribbling: document.getElementById("dribbling")?.value,
    defending: document.getElementById("defending")?.value,
    physical: document.getElementById("physical")?.value,
    logo: document.getElementById("imgclub")?.getAttribute('src'),
    cover: document.getElementById("imgCoverCombo")?.getAttribute('src'),
  };
  if(checkfiledTextValidation(inputs) == 0){

    PlayerList.forEach((item , index)=> item.id == SelectedPlayer && (PlayerList[index] = inputs))
    console.log({id :SelectedPlayer , PlayerList : PlayerList})
    const ipdplayer = terain.find((item) => item.position == SelectedPlayer )
    document.getElementById(ipdplayer.name).innerHTML =  createhtml(inputs,true) ;
    document.querySelector(".submit-btn").setAttribute("onclick" , "AddPlayer(event)")
    resetForm()
    document.querySelector(".submit-btn").textContent = "Add Player";
    localStorage.setItem("myarray",JSON.stringify(PlayerList))
  }

  // if(checkfiledTextValidation(inputs)){
    
  // }
  // else{
  //   alert("none")
  // }

}
function Delete(e){

  const cardId = e.target.closest('.player').id; // Ex : player2
 
  document.getElementById(cardId).setAttribute("isempty" , "true") 
  terain.forEach((element)=>{
    console.log(''+element.name + ' ' + cardId)
    element.name == cardId && (
        element.position = -1 ,
        localStorage.setItem("playerposition",JSON.stringify(terain))
    )
  }
   

  )


  document.getElementById(cardId).innerHTML = `
  <div class="body-card">
  <img src="./assets/img/placeholder-card-normal.webp" alt="bodycard" class="card-body-img" >
    <div class="spanbtn">
    <span>
      <svg class="" viewBox="0 0 36 42" fill="none" width="36"><path d="M18.6275 41.711L18.3137 41.0298C18.1146 41.1215 17.8854 41.1215 17.6863 41.0298L17.3726 41.711L17.6863 41.0298L1.18627 33.4311C0.920355 33.3087 0.75 33.0427 0.75 32.7499V8.7248C0.75 8.42506 0.928458 8.15411 1.20383 8.03575L17.7038 0.943648C17.8929 0.862375 18.1071 0.862375 18.2962 0.943648L34.7962 8.03575C35.0715 8.15411 35.25 8.42506 35.25 8.7248V32.7499C35.25 33.0427 35.0796 33.3087 34.8137 33.4311L18.3137 41.0298L18.6275 41.711Z" stroke="currentColor" stroke-width="1.5"></path>
      </svg>
    </span>
    <button class="">+</button>
  </div>
  </div>
  <div class="position">
    <img src="./assets/img/pos_base.png" alt="">
    <p class="PPS">LW</p>
  </div>
`
}

let SelectedPlayer = -1 ;
function Update(e){

  if(localStorage.getItem("myarray")){
    PlayerList = JSON.parse(localStorage.getItem("myarray"))
  }

  const cardId = e.target.closest('.player').id; 
  const playerID = terain.find((item)=>item.name == cardId)
  const dataplayer = PlayerList.find((item)=>item.id == playerID.position);
  console.log(dataplayer)
  SelectedPlayer = dataplayer.id
  Playerid = e.target.offsetParent.offsetParent.offsetParent.id;

  const inputs = {
    id : dataplayer.id,
    name: document.getElementById("name"),
    photo: document.getElementById("face"),
    nationality: document.getElementById("titleflag"),
    flag: document.getElementById("imgflag")?.getAttribute('src'),
    club: document.getElementById("titleclub") ,
    rating: document.getElementById("ratingRange"),
    pace: document.getElementById("pace"),
    shooting: document.getElementById("shooting"),
    passing: document.getElementById("passing"),
    dribbling: document.getElementById("dribbling"),
    defending: document.getElementById("defending"),
    physical: document.getElementById("physical"),
    logo: document.getElementById("imgclub")?.getAttribute('src'),
    cover: document.getElementById("imgCoverCombo")?.getAttribute('src'),
  };
  inputs.name.value  = dataplayer.name;
  inputs.photo.setAttribute('src',dataplayer.photo);
  // inputs.nationality.  = dataplayer.nationality;
  // inputs.flag.setAttribute('src', dataplayer.flag) ;
  let PlayerPosition = e.target.offsetParent.offsetParent.querySelector(".PPS")?.textContent
  document.getElementById("position").value = PlayerPosition;
  flag.setValue(`${dataplayer.nationality}`)
  CoverCombo.setValue(dataplayer.cover)
  club.setValue(dataplayer.club)

  inputs.rating.value = dataplayer.rating;
  inputs.pace.value = dataplayer.pace;
  inputs.shooting.value = dataplayer.shooting;
  inputs.passing.value = dataplayer.passing;
  inputs.dribbling.value = dataplayer.dribbling;
  inputs.defending.value = dataplayer.defending;
  inputs.physical.value = dataplayer.physical;

  document.querySelector(".submit-btn").setAttribute("onclick" , "UpdatePlayer_(event)")
  document.querySelector(".submit-btn").textContent = "Update Player"
}


function sed(){
  POPUP.style.display = 'none';
  POPUP.setAttribute('isOpened' , "false")
}

function ShowingPopUp(){
  POPUP.getAttribute("isOpened")=="true" ? 
  (POPUP.setAttribute('isOpened' , "false"),
  POPUP.style.display = 'none',
  formulaire.style.display = 'none'
  
):(
  POPUP.setAttribute('isOpened' , "true"),
  POPUP.style.display = 'block',
  formulaire.style.display = 'block'
) 
}

//clear data after add 
 function resetForm() {
  // Reset all input fields in the form
  // formulaire.reset();

  // Clear the image preview
  document.getElementById("name").value = ""
  document.getElementById("face").setAttribute("src", "");

  // Clear additional dynamic fields (if any)
  document.getElementById("position").value = "";
  // document.getElementById("titleflag")?.textContent = "";
  document.getElementById("imgflag")?.setAttribute("src", "");
  document.getElementById("imgCoverCombo")?.setAttribute("src", "");

  CoverCombo.clear()
  flag.clear()
  club.clear()

  // Optionally reset sliders
  document.querySelectorAll(".input-range").forEach((range) => {
    range.value = range.min; 
  });
} 


let progressValue = document.querySelectorAll(".progressValues")
let inputs = document.querySelectorAll(".input-range")
inputs.forEach((element , i) => {
    element.addEventListener("input",()=>{
      progressValue[i].innerHTML = element.value
    })
});

let addUpdateDelete ;
// create inner html 
function createhtml(inputs,isonterrain){

  let addUpdateDelete= ``;
  (isonterrain) && (addUpdateDelete = ` 
    <div class ="mise-ajour" id="editmode" >
     <button onclick="Delete(event)" class="Delete" ><i class="fa-solid fa-xmark"></i></button>
     <button  onclick="Update(event)" class="Update"><i class="fa-solid fa-pen"></i></button>
   </div>
     `)
  return  `
  <div style="transform:translateY(-31%); box-shadow:0px 0px 50px red;" class="HoverStyle"></div>
  <div class="player-from">
    <img src="${inputs.cover}" alt="" class="card-body-img-ft fetch-img">
      <div class="rt">
          <p id="rating">${inputs.rating}</p> 
          <p class="PPS">${inputs.position}</p>
      </div>
      <div class="pl-image">
        <img src="${inputs.photo}" alt="${inputs.name}" class="face">
      </div>
      
          <h4 class="name-pl">${inputs.name}</h4>
      <div class="statistique">
        <div class="staq">
                  <span>PAC</span>
                  <div id="pac">${inputs.pace}</div>
              </div>
              <div class="staq">
                  <span>SHO</span>
                  <div id="sho">${inputs.shooting}</div>
              </div>
              <div class="staq">
                  <span>PAS</span>
                  <div id="pas">${inputs.passing}</div>
              </div>
              <div class="staq">
                  <span>DRI</span>
                  <div id="dri">${inputs.dribbling}</div>
              </div>
              <div class="staq">
                  <span>DIF</span>
                  <div id="dif">${inputs.defending}</div>
              </div>
              <div class="staq">
                  <span>PHY</span>
                  <div id="phy">${inputs.physical}</div>
              </div>
        
        </div> 
        <div class="flags">
              <img src="${inputs.flag}" alt="${inputs.nationality}">
              <img src="${inputs.club}" alt="">
        </div>  
        ${addUpdateDelete}
      </div>
`
} ;