document.addEventListener("DOMContentLoaded", () => {
    fetchdata();
  });
  // Fetch and display all members
  function fetchdata() {
    fetch("../../players.json")
      .then((response) => response.json())
      .then((data) => displayAll(data));
  }
  
  function displayAll(players) {
    const playerContainer = document.getElementById("players");
    players.map((player) => {
     
    });
  }