let coordinatesArray = []
let hasclickedDeparture = false;
let hasclickedDestination = false;
let iataCodeArray = []
let airportNamesArray = []
/*let coordinates = {
    "apiKey": "9406a40341ea7f295220f7e49c78ce52",
    fetchLocation: function(city, eID){
        fetch("ghttps://api.openweathermap.org/data/2.5/weather?q="
        + city 
        + "&units=metric&appid=" 
        + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayLocation(data, eID));
    },

    displayLocation: function(data, eID){
        const { lon, lat } = data.coord;
        console.log(lon, lat, eID)
        if(hasclickedDeparture == false || hasclickedDestination == false){
            if(eID == 'search-departures' && hasclickedDeparture == false){
                let departureCoordinates = {
                    departureLat: lat,
                    departureLong: lon
                }
                coordinatesArray[0] = departureCoordinates;
                hasclickedDeparture = true;;
                
                console.log(hasclickedDeparture, hasclickedDestination)
            }
            else if(eID == 'search-destinations' && hasclickedDestination == false){
                let destinationCoordinates = {
                    destinationLat: lat,
                    destinantionLong: lon
                }
                coordinatesArray[1] = destinationCoordinates;
                hasclickedDestination = true;
                console.log(hasclickedDestination, hasclickedDeparture)
            }
           
            console.log(coordinatesArray)
            getAllCoordinates(coordinatesArray);
        }
        else if(hasclickedDeparture == true || hasclickedDestination == true){
            if(eID == 'search-departures' && hasclickedDeparture == true){
                coordinatesArray[0].departureLat = lat
                coordinatesArray[0].departureLong = lon
                console.log(coordinatesArray)
            }
            else if(eID == 'search-destinations' && hasclickedDestination == true){
                coordinatesArray[1].destinationLat = lat
                coordinatesArray[1].destinantionLong = lon
                console.log(coordinatesArray)
            }
        }
        
        
    },

    search : function(eID){
        if(eID == 'search-departures'){
           this.fetchLocation(document.querySelector("#departure").value, eID);
        }
        else if(eID == 'search-destinations'){
           this.fetchLocation(document.querySelector("#destination").value, eID);
        }
    },
}*/
let coordinates = {
    "apiKey": "9406a40341ea7f295220f7e49c78ce52",
    fetchLocation: function(city, eID){
        fetch("http://api.openweathermap.org/data/2.5/weather?q="
        + city 
        + "&units=metric&appid=" 
        + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayLocation(data, eID));
    },

    displayLocation: function(data, eID){
		const { lon, lat } = data.coord;
        fetchAirportsCoordinates(lat, lon, eID);
    },

    search : function(eID){
        if(eID == 'search-departures'){
           this.fetchLocation(document.querySelector("#departure").value, eID);
        }
        else if(eID == 'search-destinations'){
           this.fetchLocation(document.querySelector("#destination").value, eID);
        }
    },
}
 
const fetchAirportsCoordinates = function(lat, lon, eID){
    console.log(lat, lon)
    fetch("https://aviation-reference-data.p.rapidapi.com/airports/search?lat=" + lat + "&lon=" + lon +"&radius=100", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "aviation-reference-data.p.rapidapi.com",
		"x-rapidapi-key": "77dd87ca86msh174b5248aa25b9cp1a6920jsn855ea670735d"
	}
})
.then((response) => response.json())
.then((data) => this.pushIataCodeIntoArray(data, eID));
};

function pushIataCodeIntoArray(data, eID){
    for(var i = 0; i < data.length; i++) {
        iataCodeArray.push(data[i].iataCode)
    }
    fetchIataCode(iataCodeArray, eID)
}

const fetchIataCode = function(iataCodeArray, eID){
    for(var i = 0; i < iataCodeArray.length; i++){
        fetch("https://airport-info.p.rapidapi.com/airport?iata=" + iataCodeArray[i] + "" , {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "airport-info.p.rapidapi.com",
            "x-rapidapi-key": "77dd87ca86msh174b5248aa25b9cp1a6920jsn855ea670735d"
        }
        })                                                      
        .then((response) => response.json())
        .then((data) => pushAirportNameIntoArray(data.name, eID))
    }
}


function pushAirportNameIntoArray(airportName,  eID){
    airportNamesArray.push(airportName)
    if(airportNamesArray.length == iataCodeArray.length){
        console.log(airportNamesArray)
        outputHtml(airportNamesArray, eID)   
    }
    
      
}