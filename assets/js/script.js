document.addEventListener("DOMContentLoaded", () => {
    fetchdata();
  });
  const formulaire = document.getElementById("formulair");
  const AllPlayersNodeList = document.querySelectorAll(".player");
  const changementPLAYER = document.getElementById("changement");
    
  const Name = document.getElementById("player-name");
  const UrlImage = document.getElementById("player-photo");

  let idP ;

  let PL = []
  function fetchdata() {
    fetch("../../players.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.players);
        PL = data.players;
      })
  }





  AllPlayersNodeList.forEach( (po)=>{
      const playerContainer = document.getElementById("players");
      po.addEventListener("click",(e)=>{
      playerContainer.innerHTML = '';
      openPlayers()
      console.log(e.target)
      let idPlayer = e.target.offsetParent.offsetParent.querySelector(".PPS").textContent
      idP = e.target.offsetParent.offsetParent.id
          PL.map((player) => {
            if (player.position === idPlayer){
              const p = document.createElement('div');
              p.innerHTML = 
            ` <div class="player-from">
            <img src="./assets/img/badge_gold.webp" alt="" class="card-body-img-ft fetch-img">
              <div class="rt">
                  <p id="rating">${player.rating}</p>
                  <p>${player.position}</p>
              </div>
              <div class="pl-image">
                <img src="${player.photo}" alt="${player.name}" class="face">
              </div>
              
                  <h4 class="name-pl">${player.name}</h4>
              <div class="statistique">
                <div class="staq">
                          <span>PAC</span>
                          <div id="pac">${player.pace}</div>
                      </div>
                      <div class="staq">
                          <span>SHO</span>
                          <div id="sho">${player.shooting}</div>
                      </div>
                      <div class="staq">
                          <span>PAS</span>
                          <div id="pas">${player.passing}</div>
                      </div>
                      <div class="staq">
                          <span>DRI</span>
                          <div id="dri">${player.dribbling}</div>
                      </div>
                      <div class="staq">
                          <span>DIF</span>
                          <div id="dif">${player.defending}</div>
                      </div>
                      <div class="staq">
                          <span>PHY</span>
                          <div id="phy">${player.physical}</div>
                      </div>
                
              </div> 
              <div class="flags">
                    <img src="${player.flag}" alt="${player.nationality}">
                    <img src="${player.logo}" alt="${player.club}" >
              </div>
              </div>`
              playerContainer.appendChild(p);
            }
            
          });
    })
  })
  // function changement(players) {
  //   players.map((player , i) => {
  //     const p = document.createElement('div');
  //     p.innerHTML = 
  //     `<div class="player-from">
  //     <img src="./assets/img/badge_gold.webp" alt="" class="card-body-img-ft fetch-img">
  //       <div class="rt">
  //           <p id="rating">${player.rating}</p>
  //           <p>${player.position}</p>
  //       </div>
  //       <div class="pl-image">
  //         <img src="${player.photo}" alt="${player.name}" class="face">
  //       </div>
        
  //           <h4 class="name-pl">${player.name}</h4>
  //       <div class="statistique">
  //         <div class="staq">
  //                   <span>PAC</span>
  //                   <div id="pac">${player.pace}</div>
  //               </div>
  //               <div class="staq">
  //                   <span>SHO</span>
  //                   <div id="sho">${player.shooting}</div>
  //               </div>
  //               <div class="staq">
  //                   <span>PAS</span>
  //                   <div id="pas">${player.passing}</div>
  //               </div>
  //               <div class="staq">
  //                   <span>DRI</span>
  //                   <div id="dri">${player.dribbling}</div>
  //               </div>
  //               <div class="staq">
  //                   <span>DIF</span>
  //                   <div id="dif">${player.defending}</div>
  //               </div>
  //               <div class="staq">
  //                   <span>PHY</span>
  //                   <div id="phy">${player.physical}</div>
  //               </div>
          
  //       </div> 
  //        <div class="flags">
  //             <img src="${player.flag}" alt="${player.nationality}">
  //             <img src="${player.logo}" alt="${player.club}" >
  //        </div>
  //   </div>`
  //   changementPLAYER.appendChild(p);
  //   });
  // }
const cards = document.getElementById("cards") ;
function sed(){
   cards.style.display = 'none';
   cards.setAttribute('isOpened' , "false")
}
function openPlayers(){
  cards.getAttribute("isOpened")=="true" ? 
  (cards.setAttribute('isOpened' , "false"),
  cards.style.display = 'none'
  
):(
  cards.setAttribute('isOpened' , "true"),
  cards.style.display = 'block',
  formulaire.style.display = 'block'
) 
}

document.querySelector(".submit-btn").addEventListener("click",()=>{
  document.getElementById(idP).innerHTML = `
          <div class="player-from">
            <img src="./assets/img/badge_gold.webp" alt="" class="card-body-img-ft fetch-img">
              <div class="rt">
                  <p id="rating">ng}</p>
                  <p>tion}</p>
              </div>
              <div class="pl-image">
                <img src="${UrlImage.value}" alt="}" class="face">
              </div>
              
                  <h4 class="name-pl">${Name.value}</h4>
              <div class="statistique">
                <div class="staq">
                          <span>PAC</span>
                          <div id="pac">}</div>
                      </div>
                      <div class="staq">
                          <span>SHO</span>
                          <div id="sho">ting}</div>
                      </div>
                      <div class="staq">
                          <span>PAS</span>
                          <div id="pas">ing}</div>
                      </div>
                      <div class="staq">
                          <span>DRI</span>
                          <div id="dri">bling}</div>
                      </div>
                      <div class="staq">
                          <span>DIF</span>
                          <div id="dif">nding}</div>
                      </div>
                      <div class="staq">
                          <span>PHY</span>
                          <div id="phy">ical}</div>
                      </div>
                
                </div> 
                <div class="flags">
                      <img src="" alt="onality}">
                      <img src="" alt="}" >
                </div>
              </div>
  `
})
