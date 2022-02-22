let coordinatesArray = []
let hasclickedDeparture = false;
let hasclickedDestination = false;
let coordinates = {
    "apiKey": "9406a40341ea7f295220f7e49c78ce52",
    fetchLocation: function(city, eID){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
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
}
/*let coordinates = {
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
        fetchAirportsCode(lat, lon, eID);
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
 
const fetchAirportsCode = function(lat, lon, eID){
    console.log(lat, lon)
        fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCdFIePN5YgiV6MGCxCtydUMJeNtboH_A0", {
            method: 'GET'
            
        }).then((response) => response.json())
        .then((data) => displayAirportName(data, eID));
    };

function displayAirportName(data, eID){
    const a = data.NearestAirportResource.Airports.Airport
    const airportNames = a.map(airportName => airportName.Names.Name['$'])
    outputHtml(airportNames, eID)    
}*/