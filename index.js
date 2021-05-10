const container = document.querySelector(".container");
const input = document.querySelector("input");
const url = "https://api.covid19api.com/live/country/india/status/confirmed/date/";
const url1 = "http://localhost:8000";

let usersArray = [];

let $today = new Date();
let $yesterday = new Date($today);
$yesterday.setDate($today.getDate() - 1);

var $dd = $yesterday.getDate();
var $mm = $yesterday.getMonth()+1; //January is 0!
var $yyyy = $yesterday.getFullYear();
if($dd<10){$dd='0'+$dd} if($mm<10){$mm='0'+$mm} $yesterday = $yyyy + '-' + $mm + '-' + $dd;

const createCardList = (array) => {
    container.innerHTML = "";
  
    array.forEach((obj) => {
      const card = document.createElement("div");
      card.classList.add("card");
  
      card.innerHTML = `<div class="state">${obj.Province}</div>
      <div class="confirmed">Confirmed:</div>
      <div class="confirmed-data">${obj.Confirmed}</div>
      <div class="deaths">Deaths:</div>
      <div class="deaths-data">${obj.Deaths}</div>
      <div class="recovered">Recovered:</div>
      <div class="recovered-data">${obj.Recovered}</div>
      <div class="active">Active:</div>
      <div class="active-data">${obj.Active}</div>`;
      container.appendChild(card);
    });
  };
  
  // const fetchFromServer = () => {
  //   fetch(url1)
  //   .then((data) => {
  //     return data.text();
  //   })
  //   .then((result) => {
  //     usersArray = JSON.parse(result);
  //     createCardList(usersArray);
  //   });
  // } ;

  // fetchFromServer();
  
  fetch(url+$yesterday)
  .then((data) => {
    return data.text();
  })
  .then((result) => {
    usersArray = JSON.parse(result);
    createCardList(usersArray);
  });

  input.addEventListener("input", (event) => {
    const searchStr = event.target.value.toLowerCase();
  
    const filteredArray = usersArray.filter((ele) => {
      return (
        ele.Province.toLowerCase().includes(searchStr)
      );
    });
  
    createCardList(filteredArray);
  });

  