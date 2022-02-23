

const suggestions = document.querySelector('.suggestions')
const departureSuggestions = document.querySelector('#departure-suggestion')
const destinationSuggestions = document.querySelector('#destination-suggestion')
const roundTripButton = document.querySelector('#round-trip');
const oneWayButton = document.querySelector('#one-way')
let adultAmount = parseInt(document.querySelector('#adult-amount').innerHTML);
let childAmount = parseInt(document.querySelector('#child-amount').innerHTML);
const increaseButtons = document.querySelectorAll('.increase');
const decreaseButtons = document.querySelectorAll('.decrease');
//let trip;
//const departureSchedulePanel = document.querySelector('#departure-schedule')
//const returnSchedulePanel = document.querySelector('#return-schedule')
//const headerInfo = document.querySelector('.header-info');
let tt;
minDatePicker();


function minDatePicker(){
    var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
        dd = '0' + dd;
        }

        if (mm < 10) {
        mm = '0' + mm;
        } 
            
        today = yyyy + '-' + mm + '-' + dd;
        document.querySelector("#departure-date").setAttribute("min", today);
}


function FormataStringData(data) {
    var day  = data.split("/")[0];
    var month  = data.split("/")[1];
    var year  = data.split("/")[2];
  
    return year + '-' + ("0"+month).slice(-2) + '-' + ("0"+day).slice(-2);
  }

let tripInput = JSON.parse(sessionStorage.getItem('trip'))
if(tripInput == null){
    console.log('session storage vazio')
}
else if(tripInput != null){
    document.querySelector('#departure').value = tripInput.departure
    document.querySelector('#destination').value = tripInput.destination
    document.querySelector('#departure-date').value = FormataStringData(tripInput.departureDate);
    document.querySelector('#return-date').value = FormataStringData(tripInput.returnDate);
    document.querySelector('#adult-amount').innerHTML = tripInput.adultAmount;
    document.querySelector('#child-amount').innerHTML = tripInput.childAmount;
    if(tripInput.cabin == 'Econômica'){
        document.querySelector('#economic').checked = true;
        document.querySelector('#first-class').checked = false;

    }
    else if(tripInput.cabin == '1ª classe'){
        document.querySelector('#economic').checked = false;
        document.querySelector('#first-class').checked = true;
    }
}


function outputHtml(airportNames, eID){
    console.log(eID)
    if(airportNames.length > 0){
        const html = airportNames.map(airporSuggestion => {
            if(airporSuggestion != undefined){
                return `
                <div class="card">
                    <span class="text-suggestion">${airporSuggestion}</span>
                </div>
                `  
            }
        }).join('');
        if(eID == 'search-departures'){
            departureSuggestions.innerHTML = html;
            departureSuggestions.style.visibility = 'visible';
         }
         else if(eID == 'search-destinations'){
            destinationSuggestions.innerHTML = html;
            destinationSuggestions.style.visibility = 'visible';
         }
    }
    handleLocationSelected();
}

function handleLocationSelected(){
    document.querySelectorAll('.text-suggestion').forEach(item => {
        item.addEventListener('click', function(e){
            if(item.parentNode.parentNode.id == 'departure-suggestion'){
                document.querySelector('#departure').value = item.innerHTML;
                departureSuggestions.style.visibility = 'hidden';
            }
            else if(item.parentNode.parentNode.id == 'destination-suggestion'){
                document.querySelector('#destination').value = item.innerHTML;
                destinationSuggestions.style.visibility = 'hidden';
            }
        });
    });
}


document.querySelector("#search-departures").addEventListener('click', function(e){
    const eID = e.target.id
    coordinates.search(eID);
});

document.querySelector("#search-destinations").addEventListener('click', function(e){
    const eID = e.target.id
    coordinates.search(eID);
});



/*** Change the background of the trip selected ***/
function activateBackgroundTypeTrip(b){
    b.style.backgroundColor = "rgb(5, 145, 138)";
    b.style.color = "white";
    b.style.border = "0px solid";
}

function standardTypeTrip(b){
    b.style.backgroundColor = "transparent";
    b.style.color = "rgb(129, 129, 129)";
    b.style.border = "1px solid rgb(129,129,129)" ;
}

document.querySelector('#round-trip').addEventListener('click', () => {
    activateBackgroundTypeTrip(roundTripButton);
    standardTypeTrip(oneWayButton);
    document.querySelector('#return-date').style.visibility = 'visible'
});

document.querySelector('#one-way').addEventListener('click', () => {
    activateBackgroundTypeTrip(oneWayButton);
    standardTypeTrip(roundTripButton);
    document.querySelector('#return-date').style.visibility = 'hidden';
});
/***************************************************************/




/*** Increase and Decrease form buttons ***/

for(let i = 0; i < increaseButtons.length; i++){
    increaseButtons[i].addEventListener('click', () => {
        if(increaseButtons[i].parentNode.className == "adults" && adultAmount < 9){
            adultAmount = parseInt(document.querySelector('#adult-amount').innerHTML)
            adultAmount += 1;
            document.querySelector('#adult-amount').innerHTML = adultAmount;
        }
        else if(increaseButtons[i].parentNode.className == "childs" && childAmount < 9){
            childAmount = parseInt(document.querySelector('#child-amount').innerHTML)
            childAmount += 1;
            document.querySelector('#child-amount').innerHTML = childAmount;
        }
    });
}

for(let i = 0; i < decreaseButtons.length; i++){
    decreaseButtons[i].addEventListener('click', () => {
        if(decreaseButtons[i].parentNode.className == "adults" && adultAmount > 0){
            adultAmount = parseInt(document.querySelector('#adult-amount').innerHTML)
            adultAmount -= 1;
            document.querySelector('#adult-amount').innerHTML = adultAmount;
        }
        else if(decreaseButtons[i].parentNode.className == "childs" && childAmount > 0){
            childAmount = parseInt(document.querySelector('#child-amount').innerHTML)
            childAmount -= 1;
            document.querySelector('#child-amount').innerHTML = childAmount;
        }
    });
}
/***************************************************************/



/*** Manipulating Dates ***/
let departureDate;
$('#departure-date').on('change', function(){
    departureDate = $(this).val();
    $('#return-date').prop('min', function(){
        return departureDate;
    });
});

let returnDate;
$('#return-date').on('change', function(){
    returnDate = $(this).val();
    $('#departure-date').prop('max', minDatePicker());
});

/***************************************************************/


let departureSchedules = []
let returnSchedules = []
document.querySelector('.book-flight').addEventListener('click', getInfo)

function getInfo(){
    let departureScheduleSelected;
    let returnScheduleSelected
    const departure = (document.querySelector('#departure').value).charAt(0).toUpperCase() + (document.querySelector('#departure').value).slice(1);
    const destination = (document.querySelector('#destination').value).charAt(0).toUpperCase() + (document.querySelector('#destination').value).slice(1);;
    let cabin = document.querySelector('input[name="cabin"]:checked').value;
    const departureDateInput = document.querySelector('#departure-date').value;
    const returnDateInput = document.querySelector('#return-date').value;
    const dd = new Date(departureDateInput);
    const dr = new Date(returnDateInput)
    const departureDate = dd.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    const returnDate = dr.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    tripType();
    getAllCoordinates(coordinatesArray);
    randomizeSchedule(departureSchedules);
    randomizeSchedule(returnSchedules)
    let trip = new Trip(coordinatesArray, departure, destination, departureDate, returnDate, cabin, tt, departureSchedules, returnSchedules,  adultAmount, childAmount, departureScheduleSelected, returnScheduleSelected);
    
   sessionStorage.setItem('trip', JSON.stringify(trip))
   console.log(trip.coordinatesArray)
   window.location.href = "flights-schedule.html";

    
}

function tripType(){
    if(window.getComputedStyle(roundTripButton).backgroundColor == 'rgb(5, 145, 138)'){
        tt = 'ida e volta'
    }
    else if(window.getComputedStyle(roundTripButton).backgroundColor != 'rgb(5, 145, 138)'){
        tt = 'somente ida'
    }
    return tt;
}

function getAllCoordinates(coordinatesArray){
    if(coordinatesArray.length == 2){
        return coordinatesArray;
    }
    else{
        console.log('Ainda nao possui todas as coordenadas')
    }
}
/*function calculateDistance(coordinatesArray){
    const R = 6371e3; // metres
    const φ1 = coordinatesArray[0].departureLat * Math.PI/180; // φ, λ in radians
    const φ2 = coordinatesArray[1].destinationLat * Math.PI/180;
    const Δφ = (coordinatesArray[1].destinationLat - coordinatesArray[0].departureLat) * Math.PI/180;
    const Δλ = (coordinatesArray[1].destinantionLong - coordinatesArray[0].departureLong) * Math.PI/180;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = (R * c) / 1000; // in metres
    
    console.log('Distância: ' + d)
    ticketPrice(d)
}*/




function randomizeSchedule(scheduleArray){
    let numberOfFlights = parseInt(Math.random() * (10 - 0))
    let hours, minutes, hourMinute;
    for(var i = 0; i < numberOfFlights; i++){
        hours = Math.floor(Math.random() *  24);
        if(hours == 0){
            hours = hours + '0';
        }
        minutes = (Math.floor(Math.random() * 5)) * 10;
        if(minutes == 0){
            minutes = minutes + '0';
        }
        hourMinute = hours + ":" + minutes;
        scheduleArray.push(hourMinute);
    }
    return scheduleArray;
}

/*<div class="flight-resume">
<span>Resumo do Voo</span>
</div>*/

/*function displayHeaderInfo(trip){
    const headerInfoHTML = `
   
    <div class="display-header-flight">
    
        <div class="header-flight-dd">
            <span>Partida: ${trip.departure}</span>
            <span>Destino:  ${trip.destination}</span>
        </div>
        <div class="header-flight-passengers">
            <span>Passageiros</span>
            <span>Crianças:  ${trip.childAmount}</span>
            <span>Adultos: ${trip.adultAmount}</span>
        </div>
        <div class="header-flight-dates">
            <span>Ida: ${trip.departureDate}</span>
            <span>Volta: ${trip.returnDate}</span>
        </div>
        <div class="header-flight-cabin">
            <span>Cabine</span>
            <span>${trip.cabin}</span>
        </div>
    </div>
        `;
    
    headerInfo.innerHTML = headerInfoHTML;

}

function displayFlightSchedule(trip){
    showing = true;
    for(var i = 0; i < 2; i++){
        if(i == 0){
            const html = trip.departureSchedule.map(fs => `
            <div class="card">
                <div class="card-header">
                    <span class="card-header-type">Ida</span>
                    <span class="material-icons">flight</span>
                    <div class="flight-number">Voo ${flightNumberGenarator()}</div>
                </div>
            
                <div class="card-info">
                    <div class='rs'>${trip.departure}</div>
                    <span>></span>
                    <div class='ds'>${trip.destination}</div>
                </div>
                
                <div class='schedule-suggestions'>${fs}</div>
            </div>
            `).join(''); 
            departureSchedulePanel.innerHTML = html;  
        }
        else if(i == 1){
            const html = trip.returnSchedule.map(fs => `
            <div class="card">
                <div class="card-header">
                    <span class="card-header-type">Volta</span>
                    <span class="material-icons" style="transform: rotate(270deg);">flight</span>
                    <div class="flight-number">Voo ${flightNumberGenarator()}</div>
                </div>
            
                <div class="card-info">
                    <div class='ds'>${trip.destination}</div>
                    <span>></span>
                    <div class='rs'>${trip.departure}</div>
                </div>
                
                <div class='schedule-suggestions'>${fs}</div>
            </div>
        `).join(''); 
        returnSchedulePanel.innerHTML = html; 
        } 
    }
    document.querySelectorAll('.card').forEach(item => {
        item.addEventListener('click', function(e){
            const rs = item.querySelector('.rs').innerHTML
            const ds = item.querySelector('.ds').innerHTML
            const scheduleSuggestion = item.querySelector('.schedule-suggestions').innerHTML
            console.log(rs, ds, scheduleSuggestion)
            document.querySelector('.panel-flighs-selected').innerHTML = "Origem: "+ ds + ", Destino: " + rs + ", Horario: " + scheduleSuggestion 
        });
    });
}

function flightNumberGenarator(){
    let flightNumber = parseInt((Math.random() * 3000) + 5000)
    return flightNumber;
}*/












/*const fetchAirportName = function(data){
    let airportsNamesArray = []
    const airports = data.NearestAirportResource.Airports.Airport;
    const airportsCode = airports.map(apc => apc.AirportCode)
    console.log(airportsCode)
    airportsCodeLength = airportsCode.length
    airportsCode.map(apn => fetch("https://api.lufthansa.com/v1/mds-references/airports/" + apn + "?lang=en&limit=20&offset=0&LHoperated=0", {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Authorization': 'Bearer w2ddahtvrvsmgr72neex5tbm',
            'X-Originating-IP': '177.9.77.238'
        }, 
        
    }).then((response) => response.json())
    .then((data) => { 
        let teste = []
        teste.push(data)
        console.log(teste)
        this.displayAirportName(data)
    })
    ) 
   
};*/
