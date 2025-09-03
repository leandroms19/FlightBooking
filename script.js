

const suggestions = document.querySelector('.suggestions')
const departureSuggestions = document.querySelector('#departure-suggestion')
const destinationSuggestions = document.querySelector('#destination-suggestion')
const roundTripButton = document.querySelector('#round-trip');
const oneWayButton = document.querySelector('#one-way')
let adultAmount = parseInt(document.querySelector('#adult-amount').innerHTML);
let childAmount = parseInt(document.querySelector('#child-amount').innerHTML);
const increaseButtons = document.querySelectorAll('.increase');
const decreaseButtons = document.querySelectorAll('.decrease');
let departureCity, destinationCity;
let tt;

minimumDatePicker();

/****** Load icon animation ******/
document.querySelector('#search-departures').addEventListener('click', () => {
    document.querySelector('#search-departures').classList.remove('material-icons')
    document.querySelector('#search-departures').innerText = ''
    document.querySelector('#search-departures').innerHTML = `
        <div class="loader"></div>
    `
})

document.querySelector('#search-destinations').addEventListener('click', () => {
    document.querySelector('#search-destinations').classList.remove('material-icons')
    document.querySelector('#search-destinations').innerText = ''
    document.querySelector('#search-destinations').innerHTML = `
        <div class="loader"></div>
    `
})


function minimumDatePicker(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    } 
            
    today = yyyy + '-' + mm + '-' + dd;
    document.querySelector("#departure-date").setAttribute("min", today);
    return today
}

function FormatStringDate(data) {
    let day  = data.split("/")[0];
    let month  = data.split("/")[1];
    let year  = data.split("/")[2];
  
    return year + '-' + ("0"+month).slice(-2) + '-' + ("0"+day).slice(-2);
}



window.addEventListener('load', () => {
    let tripInput = JSON.parse(sessionStorage.getItem('trip'));
    
    if(tripInput != null){
         if(tripInput.tt == 'Somente ida'){
            activateBackgroundTypeTrip(oneWayButton);
            standardTypeTrip(roundTripButton);
            document.querySelector('#return-date').style.visibility = 'hidden';
        }
        document.querySelector('#departure').value = tripInput.departureCity;
        document.querySelector('#destination').value = tripInput.destinationCity;
        document.querySelector('#departure-date').value = FormatStringDate(tripInput.departureDate);
        document.querySelector('#return-date').value = FormatStringDate(tripInput.returnDate);
        document.querySelector('#adult-amount').innerHTML = tripInput.adultAmount;
        document.querySelector('#child-amount').innerHTML = tripInput.childAmount;
        childAmount = tripInput.childAmount;
        adultAmount = tripInput.adultAmount;

        
    
        if(tripInput.tt == 'Somente ida'){
            activateBackgroundTypeTrip(oneWayButton);
            standardTypeTrip(roundTripButton);
            document.querySelector('#return-date').style.visibility = 'hidden';
        }
        else if(tripInput.cabin == 'Econômica' || tripInfo.cabin == 'Econômica'){
            document.querySelector('#economic').checked = true;
            document.querySelector('#first-class').checked = false;
    
        }
        else if(tripInput.cabin == '1ª classe' || tripInput.cabin == '1ª classe'){
            document.querySelector('#economic').checked = false;
            document.querySelector('#first-class').checked = true;
        }
        
    }
    
});

let departureSuggestionShowing = false;
let destinationSuggetionShowing = false;
function outputHtml(airportNames, eID){
    if(airportNames.length > 0){
        const html = airportNames.map(airporSuggestion => {
            if(airporSuggestion != undefined + ' - ' + undefined){
                return `
                <div class="card">
                    <span class="text-suggestion">${airporSuggestion}</span>
                </div>
                `  
            }
        }).join('');
        if(eID == 'search-departures'){
            departureSuggestions.innerHTML = html;
            document.querySelector('#search-departures').classList.add('material-icons');
            document.querySelector('#search-departures').innerText = 'search';
            suggestions.style.display = 'block';
            departureSuggestions.style.display = 'block';
            document.querySelector('.child-adult').style.zIndex = '-1';
            suggestions.style.zIndex = '9';
            departureSuggestionShowing = true;
            
         }
         else if(eID == 'search-destinations'){
            destinationSuggestions.innerHTML = html;
            document.querySelector('#search-destinations').classList.add('material-icons');
            document.querySelector('#search-destinations').innerText = 'search';
            suggestions.style.display = 'block';
            destinationSuggestions.style.display = 'block';
            document.querySelector('.child-adult').style.zIndex = '-1';
            suggestions.style.zIndex = '9';
            destinationSuggetionShowing = true;
         }
    }
    
    handleLocationSelected();
    
}


let departureSuggestionClicked = false;
let destinationSuggestionClicked = false;
function handleLocationSelected(){
    document.querySelectorAll('.text-suggestion').forEach(item => {
        item.addEventListener('click', function(e){
            if(item.parentNode.parentNode.id == 'departure-suggestion'){
                departureSuggestionClicked = false;
                departureSuggestionClicked = true;
                document.querySelector('#departure').value = item.innerHTML;
                departureSuggestions.style.display = 'none';
                document.querySelector('.child-adult').style.zIndex = '9';
                suggestions.style.zIndex = '-1';
            }
            else if(item.parentNode.parentNode.id == 'destination-suggestion'){
                destinationSuggetionShowing = false;
                destinationSuggestionClicked = true;
                document.querySelector('#destination').value = item.innerHTML;
                destinationSuggestions.style.display = 'none';
                document.querySelector('.child-adult').style.zIndex = '9';
                suggestions.style.zIndex = '-1';
            }
        });
    });
    
}


document.querySelector("#search-departures").addEventListener('click', function(e){
    departureCity = document.querySelector("#departure").value;
    const eID = e.target.id
    coordinates.search(eID);
});

document.querySelector("#search-destinations").addEventListener('click', function(e){
    destinationCity = document.querySelector("#destination").value
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
    document.querySelector('#return-date-error-message').style.display = 'block'
});

document.querySelector('#one-way').addEventListener('click', () => {
    activateBackgroundTypeTrip(oneWayButton);
    standardTypeTrip(roundTripButton);
    document.querySelector('#return-date').style.visibility = 'hidden';
    document.querySelector('#return-date-error-message').style.display = 'none'
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
            childAmount = parseInt(document.querySelector('#child-amount').innerHTML);
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
            if(childAmount == 0){
            childAmount = parseInt(document.querySelector('#child-amount').innerHTML);            
            childAmount -= 1;
            document.querySelector('#child-amount').innerHTML = childAmount;
            }
            else if(childAmount != 0){
                childAmount -= 1;
                document.querySelector('#child-amount').innerHTML = childAmount;
            }
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
    $('#departure-date').prop('max', minimumDatePicker());
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
    let departureDateInput = document.querySelector('#departure-date').value;
    let returnDateInput = document.querySelector('#return-date').value;
    let dd = new Date(departureDateInput);
    let dr = new Date(returnDateInput)
    let departureDate = dd.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    let returnDate = dr.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    
    tripType();
    getAllCoordinates(coordinatesArray);
    randomizeSchedule(departureSchedules);
    randomizeSchedule(returnSchedules);
   
    validateForm(departure, destination, departureDateInput, returnDateInput, cabin, departureDate, returnDate, departureScheduleSelected, returnScheduleSelected);
}
function tripType(){
    if(window.getComputedStyle(roundTripButton).backgroundColor == 'rgb(5, 145, 138)'){
        tt = 'Ida e volta';
    }
    else if(window.getComputedStyle(roundTripButton).backgroundColor != 'rgb(5, 145, 138)'){
        tt = 'Somente ida';
    }
    console.log(tt);
    return tt;
}
function validateForm(departure, destination, departureDateInput, returnDateInput, cabin, departureDate, returnDate, departureScheduleSelected, returnScheduleSelected){
    let todayDate = minimumDatePicker();
    inputValidateCount = 0;
    inputsToCheckArray = [departure,destination,departureDateInput,returnDateInput, adultAmount, tt]
    inputsToCheckArray.forEach(function(value, index) {
        if((index == 0 && value == '') || (index == 0 && value != '' && departureSuggestionClicked == false)){
            document.querySelector('#departure').style.borderBottom = '1px solid red';
            document.querySelector('#search-departures').style.borderBottom = '1px solid red';
            document.querySelector('#departure-error-message').style.display = 'block';
            document.querySelector('#departure-error-message').innerText = 'Necessário pesquisar e escolher um aeroporto de origem!';
        }
        else if(index == 0 && value != '' && departureSuggestionClicked == true){
            inputValidateCount += 1;
            document.querySelector('#departure').style.borderBottom = '1px solid rgb(199,199,199)';
            document.querySelector('#search-departures').style.borderBottom = '1px solid rgb(199,199,199)';
            document.querySelector('#departure-error-message').style.display = 'none';
        }
        else if((index == 1 && value == '') || (index == 1 && value != '' && destinationSuggestionClicked == false)){
            document.querySelector('#destination').style.borderBottom = '1px solid red';
            document.querySelector('#search-destinations').style.borderBottom = '1px solid red';
            document.querySelector('#destination-error-message').style.display = 'block';
            document.querySelector('#destination-error-message').innerText = 'Necessário pesquisar e escolher um aeroporto de destino!';
        }
        else if(index == 1 && value != '' && destinationSuggestionClicked == true){
            inputValidateCount += 1;
            document.querySelector('#destination').style.borderBottom = '1px solid rgb(199,199,199)';
            document.querySelector('#search-destinations').style.borderBottom = '1px solid rgb(199,199,199)';
            document.querySelector('#destination-error-message').style.display = 'none';
        }
        else if((index == 2 && value == '') || (index == 2 && value != '' && (departureDateInput < todayDate))){
            document.querySelector('#departure-date').style.borderBottom = '1px solid red';
            document.querySelector('#departure-date-error-message').style.display = 'block';
            document.querySelector('#departure-date-error-message').innerText = 'Data inválida!';
        }
        else if(index == 2 && value != '' && (departureDateInput >= todayDate)){
            inputValidateCount += 1
            document.querySelector('#departure-date').style.borderBottom = '1px solid rgb(199, 199, 199)';
            document.querySelector('#departure-date-error-message').style.display = 'none';
        }
        else if((index == 3 && value == '' && tt == 'Ida e volta') || (index == 3 && value != '' && tt == 'Ida e volta' && (returnDateInput < todayDate))){
            document.querySelector('#return-date').style.borderBottom = '1px solid red';
            document.querySelector('#return-date-error-message').style.display = 'block';
            document.querySelector('#return-date-error-message').innerText = 'Data inváida!';
            
        }
        else if(index == 3 && value != '' && (returnDateInput >= todayDate) && (returnDateInput > departureDateInput)){
            inputValidateCount += 1;
            document.querySelector('#return-date').style.borderBottom = '1px solid rgb(199,199,199)';
            document.querySelector('#return-date-error-message').style.display = 'none';
        }
        else if(index == 4 && value == '' || index == 4 && value == 0){
            document.querySelector('#adult-amount-error-message').style.display = 'block';
            document.querySelector('#adult-amount-error-message').innerText = 'A quantidade de adulto(s) deve ser maior que um!';
        } 
        else if(index == 4 && value != '' || index == 4 && value >= 1){
            inputValidateCount += 1
        } 

        else if(departureSuggestionShowing == true && destinationSuggetionShowing == true){
            departureSuggestions.style.display = 'none';
            destinationSuggestions.style.display = 'none';
        }

        else if(departureSuggestionShowing == true ){
            departureSuggestions.style.display = 'none';
        }
        else if(destinationSuggetionShowing == true){
            destinationSuggestions.style.display = 'none';
        }

        
    })
    if(inputValidateCount == 5 || inputValidateCount == 4 && tt == 'Somente ida'){
        let trip = new Trip(coordinatesArray, departureCity, destinationCity, departure, destination, departureDate, returnDate, cabin, tt, departureSchedules, returnSchedules,  adultAmount, childAmount, departureScheduleSelected, returnScheduleSelected);
        sessionStorage.setItem('trip', JSON.stringify(trip));
        window.location.href = "flights-schedule.html";
    }
}



let hasntAllCoordinates = false

function getAllCoordinates(coordinatesArray){
    if(coordinatesArray.length != 2){
        coordinatesArray = hasntAllCoordinates;
    }
   
}


function randomizeSchedule(scheduleArray){
    let numberOfFlights = parseInt(Math.random() * (10 - 1))
    let hours, minutes, hourMinute;
    for(var i = 0; i <= numberOfFlights; i++){
        hours = Math.floor(Math.random() *  24);
        if(hours == 0){
            hours = hours + '0';
        }
        else if(hours < 10){
            hours = '0' + hours;
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
