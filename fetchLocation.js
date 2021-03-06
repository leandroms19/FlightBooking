let coordinatesArray = [];
let hasclickedDeparture = false;
let hasclickedDestination = false;
let iataCodeArray = [];
let airportNamesDepartureArray = [];
let airportNamesDestinationArray = [];

let coordinates = {
    "apiKey": "9406a40341ea7f295220f7e49c78ce52",
    fetchLocation: function(city, eID){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city 
        + "&units=metric&appid=" 
        + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayLocation(data, eID))
        .catch(() => {
            document.querySelector('.loader').style.display = 'none';
            removeLoadAnimation(eID);
            alert('Erro: Não foi encontrada nenhuma cidade :(');
            
        });
    },

    displayLocation: function(data, eID){
		const { lon, lat } = data.coord;
        if(hasclickedDeparture == false || hasclickedDestination == false){
            if(eID == 'search-departures' && hasclickedDeparture == false){
                let departureCoordinates = {
                    departureLat: lat,
                    departureLong: lon
                }
                coordinatesArray[0] = departureCoordinates;
                hasclickedDeparture = true;
            }
            else if(eID == 'search-destinations' && hasclickedDestination == false){
                let destinationCoordinates = {
                    destinationLat: lat,
                    destinantionLong: lon
                }
                coordinatesArray[1] = destinationCoordinates;
                hasclickedDestination = true;
            }
           
            getAllCoordinates(coordinatesArray);
        }
        else if(hasclickedDeparture == true || hasclickedDestination == true){
            if(eID == 'search-departures' && hasclickedDeparture == true){
                coordinatesArray[0].departureLat = lat;
                coordinatesArray[0].departureLong = lon;
            }
            else if(eID == 'search-destinations' && hasclickedDestination == true){
                coordinatesArray[1].destinationLat = lat;
                coordinatesArray[1].destinantionLong = lon;
            }
        }
        fetchAirportsCoordinates(lat, lon, eID);
    },

    search : function(eID){
        if(eID == 'search-departures'){
           this.fetchLocation(document.querySelector("#departure").value, eID);
        }
        else if(eID == 'search-destinations'){
           this.fetchLocation(document.querySelector("#destination").value, eID);
        }
    }
}
 
const fetchAirportsCoordinates = function(lat, lon, eID){
    fetch("https://aviation-reference-data.p.rapidapi.com/airports/search?lat=" + lat + "&lon=" + lon +"&radius=100", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "aviation-reference-data.p.rapidapi.com",
		"x-rapidapi-key": "77dd87ca86msh174b5248aa25b9cp1a6920jsn855ea670735d"
	}
})
.then((response) => response.json())
.then((data) => this.fetchIataCode(data, eID));
};


function fetchIataCode(data, eID){
    let iataCodeCount = 0
    if(data.length == 0){
        alert('Erro: Não foi encontrado aeroportos próximo a essa região! :(');
        removeLoadAnimation(eID)
    }
    else if(data.length > 0){
        data.map(iataCode => {
            iataCodeCount++
            fetch("https://airport-info.p.rapidapi.com/airport?iata=" + iataCode.iataCode + "" , {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "airport-info.p.rapidapi.com",
                "x-rapidapi-key": "77dd87ca86msh174b5248aa25b9cp1a6920jsn855ea670735d"
            }
            })                                                      
        .then((response) => response.json())
        .then((data) => this.pushAirportNameIntoArray(data, eID, iataCodeCount))
        })
    }
}


function pushAirportNameIntoArray(data,  eID, iataCodeCount){
    if(eID == 'search-departures'){
        airportNamesDepartureArray.push(data.name + ' - ' + data.iata);
        outputHtml(airportNamesDepartureArray, eID);
    }
    else if(eID == 'search-destinations'){
        airportNamesDestinationArray.push(data.name  + ' - ' + data.iata);
        outputHtml(airportNamesDestinationArray, eID);
    }
}

function removeLoadAnimation(eID){
    if(eID == 'search-departures'){
        document.querySelector('#departure').value = '';
        document.querySelector('#search-departures').classList.add('material-icons');
        document.querySelector('#search-departures').innerText = 'search';
    }
    else if(eID == 'search-destinations'){
        document.querySelector('#destination').value = '';
        document.querySelector('#search-destinations').classList.add('material-icons');
        document.querySelector('#search-destinations').innerText = 'search';
    }
}