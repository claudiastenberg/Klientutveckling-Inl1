
//Öppnar hela API Open weather
const KEY = '8ff603c12689a43d63185805ba36edca';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=nynashamn&appid='
+ KEY; /* lagt till https*/
function HttpGet(url) { //Här får vi http adressen. Object som håller ajax objektet åt mig
    this.url=url;
    this.ajax = new XMLHttpRequest();
}

HttpGet.prototype.proceed = function(callback){ //Det är denna funktion som ska anropas när vi är klara
    this.ajax.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) { //200 betyder OK (statuskod), 4 betyder att den ska uppdateras fram tills 4
            //Denna säger, när vi är klara vill vi göra detta:    
            callback(this.response);  // händer när vi är färdiga
        }
    }
    this.ajax.open('GET', this.url, true);
    this.ajax.send();
}

function fetch(url) { // detta då jag slipper skriva url senare, behöver då bara använda fetch
    return new HttpGet(url);
}

function $(selector){
    return document.querySelector(selector);
}

/*Metod för att få väder hela tiden på sidan */
fetch(API_URL).proceed(response => {
    var weatherData = JSON.parse(response);
    var weatherList = weatherData.list;
 //nu tar vi bara 5 element eftersom de ska vara så i nynäs. Vi vill här få alla tr. 
 var tbody = document.getElementById('bodyWeather');
 for(var index = 0; index < 5; index++) { // $ betyder att vi lägger in kod i html dokumentet
     //Vi ska alltså göra en tr som kommer att skrivas ut 5 ggr. 
     var time = weatherList[index].dt_txt;
     var date = new Date(time);
     var hour = date.getHours() + ":00";
     var weather = weatherList[index].weather[0].description; //väderinfo
     var temp =  weatherList[index].main.temp; //grader
     var speed = weatherList[index].wind.speed; 
     var timestamp = `

     <tr>
      <td>${hour}</td>
      <td>${(weather).charAt(0).toUpperCase() + weather.substr(1)}</td>
      <td>${(temp-273.15).toFixed(1)+ ('°C')}</td>
      <td>${speed.toFixed(1) + (' m/s')}</td>
     </tr>
     `; // Allt måste skrivas in i samma ordning som i html dokumentet alltså klocka väder värme vind, osv
     tbody.innerHTML += timestamp; // += är för att vi vill plusa på den föregående strängen
 }
}
);
/*För att få ut avgångar*/ 
tider = [
    {
        Nr: '61',
        Avgår: '10:25',
        Ankommer: '11.23',
    },
    {
        Nr: '61',
        Avgår: '15:20',
        Ankommer: '16:17',
    },
    {
        Nr: '61',
        Avgår: '18:30',
        Ankommer: '19:27',
    }
    ];


function btnSkicka() {
    var fromCity = document.getElementById("fromCity");
    var CityInput = document.getElementById("cityInput");

    while(document.getElementById("bodyAvg").firstChild){
        document.getElementById("bodyAvg").removeChild(document.getElementById("bodyAvg").firstChild);
    }/*RDenna säger ta bort alla child som inte är först*/ 
   
   for(var i = 0; i<tider.length; i++){
   var table = document.getElementById("bodyAvg");
   var nummer = tider[i].Nr;
   var avg = tider[i].Avgår;   
   var ank = tider[i].Ankommer;
   
   var timestamp = `
    <tr>
      <td>${nummer}</td>
	  <td>${avg}</td>
      <td>${ank}</td>
    </tr>
    `;
  	table.innerHTML += timestamp;
   }
    var citystamp = `
    <p> Inga problem i trafiken! <br> Åker från: ${CityInput.value}</p>
    `;
    fromCity.innerHTML = citystamp;
}