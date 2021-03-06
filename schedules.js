let tripParsed = JSON.parse(sessionStorage.getItem('trip'));
const departureSchedulePanel = document.querySelector('#departure-schedule')
const returnSchedulePanel = document.querySelector('#return-schedule')
const headerInfo = document.querySelector('.header-info');
let totalPrice = 0;
document.querySelector('.after').style.display = 'none';
checkCardsSelected()



if(tripParsed == null){
    document.querySelector('.schedules').innerHTML = `
        <div class="error-message-trip-storage">Error :(</div>
    `
    
}
function calculateDistance(){
    
    //Formula found on internet, using only to create random prices based on distance between 2 coordinates
    const R = 6371e3; // metres
    const φ1 = tripParsed.coordinatesArray[0].departureLat * Math.PI/180; // φ, λ in radians
    const φ2 = tripParsed.coordinatesArray[1].destinationLat * Math.PI/180;
    const Δφ = (tripParsed.coordinatesArray[1].destinationLat - tripParsed.coordinatesArray[0].departureLat) * Math.PI/180;
    const Δλ = (tripParsed.coordinatesArray[1].destinantionLong - tripParsed.coordinatesArray[0].departureLong) * Math.PI/180;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = (R * c) / 1000; // in Km
    return d;
}

const distancia = calculateDistance();

function ticketPrice(distancia){
    const minimunPrice = Math.floor((Math.random() * (300 - 200) + 200))
    let ticketPrice = Math.floor(distancia.toFixed(2) * (Math.random() * (1 - 0.4) + 0.4))
    if(ticketPrice > 200){
        return ticketPrice;
    }
    else if(ticketPrice < 200){
        return minimunPrice
    }
    
}

displayFlightSchedule();
displayHeaderInfo();


function displayHeaderInfo(){
    const headerInfoHTML = `
    <div class="display-header-flight">
        <div class="header-flight-dd">
            <span class="location-header-text">Partida: ${tripParsed.departure}</span>
            <span class="material-icons">flight</span>
            <span class="location-header-text">Destino:  ${tripParsed.destination}</span>
        </div>
        <div class="header-flight-passengers">
            <span>Adultos: ${tripParsed.adultAmount}</span>
            <span>Crianças:  ${tripParsed.childAmount}</span>
        </div>
        <div class="header-flight-dates">
            <span>Ida: ${tripParsed.departureDate}</span>
            <span>Volta: ${checkReturnDate()}</span>
        </div>
        <div class="header-flight-cabin">
            <span>Cabine: ${tripParsed.cabin}</span>
        </div>
        <div class="header-change-button">
            <span class="change-flights-selected-btn">Alterar</span>
        </div>
    </div>
        `;
    
    headerInfo.innerHTML = headerInfoHTML;
    document.querySelectorAll('.location-header-text').forEach(item => {
        if (item.offsetWidth + 1 >= item.parentNode.offsetWidth) {
            item.style.fontSize = '80%'
        }
    })
    
}



function checkReturnDate(){
    if(tripParsed.tt == 'Somente ida'){
        return '-';
    }
    else if(tripParsed.tt == 'Ida e volta'){
        return tripParsed.returnDate;
    }
}


document.querySelector('.change-flights-selected-btn').addEventListener('click', () =>{
    
    sessionStorage.setItem('trip', JSON.stringify(tripParsed));
    window.location.href = "index.html";
});

/*function displayHeaderSchedule(){
    let htmlDepartureScheduleHeader, htmlReturnScheduleHeader;

    htmlDepartureScheduleHeader = `
        <div class="schedule-header-info">
            <div class='ds'>${tripParsed.destination}</div>
            <span>></span>
            <div class='rs'>${tripParsed.departure}</div>
        </div>
    `,

    htmlReturnScheduleHeader = `
        <div class="schedule-header-info">
            <div class='ds'>${tripParsed.destination}</div>
            <span>></span>
            <div class='rs'>${tripParsed.departure}</div>
        </div>
    `,

    document.querySelector('.departure-header').innerHTML = htmlDepartureScheduleHeader;
    document.querySelector('.return-header').innerHTML = htmlReturnScheduleHeader
}*/



function displayFlightSchedule(){
    let htmlDeparture, htmlDestination, htmlDepartureScheduleHeader, htmlReturnScheduleHeader;
//<div class="material-icons" style="transform: rotate(270deg);">flight</div>
    showing = true;
    for(var i = 0; i < 2; i++){
        if(i == 0 ){

    htmlDepartureScheduleHeader = `
        <div class="card" id="departure-header-info">
            <div class="card-header-type">Voo(s) de Ida <span class="material-icons" style="transform: rotate(90deg);">flight</span></div>
            <div class="card-header-locations">
                <div class='ds'>${tripParsed.departure}</div>
                <span>></span>
                <div class='rs'>${tripParsed.destination}</div>
            </div>
            
        </div>
    `,
            htmlDeparture = tripParsed.departureSchedule.map(fs => `
            <div class="card" id="departure-card">
                    <div class="card-header">
                        <div class="flight-number">Voo ${flightNumberGenarator()}</div>
                        <div class='schedule-suggestions'>${fs}</div>
                    </div>
               
                <div class="card-price">
                    <div id="departure-price">R$ ${ticketPrice(distancia) + ",00"}</div>
                </div>
            </div>
            `).join(''); 
           // document.querySelector('.departure-header').innerHTML = htmlDepartureScheduleHeader;
   // document.querySelector('.return-header').innerHTML = htmlReturnScheduleHeader
        }
        
        else if(i == 1){
            htmlReturnScheduleHeader = `
                <div class="card" id="return-header-info">
                    <div class="card-header-type">Voo(s) de Volta <span class="material-icons" style="transform: rotate(270deg);">flight</span></div>
                    <div class="card-header-locations">
                        <div class='ds'>${tripParsed.destination}</div>
                        <span>></span>
                        <div class='rs'>${tripParsed.departure}</div>
                    </div>
                    
                </div>
            `,

            htmlDestination = tripParsed.returnSchedule.map(fs => `
            <div class="card" id="return-card">
                    <div class="card-header">
                        <div class="flight-number">Voo ${flightNumberGenarator()}</div>
                        <div class='schedule-suggestions'>${fs}</div>
                    </div>
               
                <div class="card-price">
                    <div id="return-price">R$ ${ticketPrice(distancia) + ",00"}</div>
                </div>
            </div>
        `).join(''); 
        } 

        if(tripParsed.tt == 'Ida e volta'){
            departureSchedulePanel.innerHTML =  htmlDepartureScheduleHeader + htmlDeparture; 
            returnSchedulePanel.innerHTML = htmlReturnScheduleHeader + htmlDestination;
        }
        else if(tripParsed.tt = 'Somente ida'){
            returnSchedulePanel.style.display = 'none'
            
            departureSchedulePanel.style.justifyContent = 'center'
            departureSchedulePanel.innerHTML = htmlDepartureScheduleHeader + htmlDeparture;
        }
    }
    
    //document.querySelector('.departure-header').innerHTML = htmlDepartureScheduleHeader;
    //document.querySelector('.return-header').innerHTML = htmlReturnScheduleHeader
    displaySelectedFlights(departureSchedulePanel, returnSchedulePanel)

    document.querySelectorAll('.ds').forEach(item => {
        if (item.offsetWidth + 1 >= item.parentNode.offsetWidth) {
            item.style.fontSize =  '80%'
        }
    })

    document.querySelectorAll('.rs').forEach(item => {
        if (item.offsetWidth + 1 >= item.parentNode.offsetWidth) {
            item.style.fontSize = '80%'
        }
    })
}


function displaySelectedFlights(departureSchedulePanel, returnSchedulePanel){
    document.querySelectorAll('.card').forEach(item => {
        item.addEventListener('click', function(e){
            document.querySelector('.before').style.display = 'none';
            document.querySelector('.after').style.display = 'block';
            if(item.id == "departure-card"){
                departureSchedulePanel.style.visibility = 'hidden'
                document.querySelector('.departure-selected').innerHTML = `
                <div class="card-selected" id="card-selected-departure">
                    <div class="card-selected-info">
                        <div>Ida - <span id="departure-flight-number-selected" style="color: rgb(5, 145, 138);">${item.querySelector('.flight-number').innerHTML}</span></div>
                        <div >${tripParsed.departureDate}</div>
                        <div class='departure-return-selected'>
                            <div>${tripParsed.departure}</div>
                            <div>${tripParsed.destination}</div>
                        </div>
                            
                        <div id="departure-schedule-selected">Horário: ${item.querySelector('.schedule-suggestions').innerHTML}</div>
                        <div class="price">${item.querySelector('#departure-price').innerHTML}</div>
                    </div>
                    <div id="change-button-departure" class="change-button">
                        <span>Alterar</span>
                    </div>    
                </div>
                `
                totalPrice += parseFloat(item.querySelector('#departure-price').innerHTML.replace("R$", ""));
            }
            else if(item.id == "return-card"){
                returnSchedulePanel.style.visibility = 'hidden';
                
                document.querySelector('.return-selected').innerHTML = `
                <div class="card-selected" id="card-selected-return">
                    <div class="card-selected-info">
                        <div>Volta - <span id="return-flight-number-selected" style="color: rgb(5, 145, 138);">${item.querySelector('.flight-number').innerHTML}</span></div>
                        <div>${tripParsed.returnDate}</div>

                        <div class='return-departure-selected'>
                        <div>${tripParsed.destination}</div>
                        <div>${tripParsed.departure}</div>
                        </div>
                            
                        <div id="return-schedule-selected">Horário: ${item.querySelector('.schedule-suggestions').innerHTML}</div>
                        <div class="price">${item.querySelector('#return-price').innerHTML}</div>
                    </div>
                    <div id="change-button-return" class="change-button">
                        <span>Alterar</span>
                    </div>    
                </div>`
                totalPrice +=  parseFloat(item.querySelector('#return-price').innerHTML.replace("R$", ""));
            }
        handleChangeFlightButton()
        checkCardsSelected();
        });
    });
}



function handleChangeFlightButton(){
    document.querySelectorAll('.change-button').forEach(item => {
        item.addEventListener('click', (e) => {
            if(item.parentNode.id === 'card-selected-departure'){
                departureSchedulePanel.style.visibility = 'visible';
                $('#card-selected-departure').remove();
            }
            else if(item.parentNode.id === 'card-selected-return'){
                returnSchedulePanel.style.visibility = 'visible';
                $('#card-selected-return').remove();
            }
            checkCardsSelected();
        });
    });

}

function checkCardsSelected(){
    if(!document.querySelector('.after').contains(document.querySelector('#card-selected-departure')) && !document.querySelector('.after').contains(document.querySelector('#card-selected-return'))){
        document.querySelector('.before').style.display = 'block';
        document.querySelector('.after').style.display = 'none';
    }
}

function flightNumberGenarator(){
    let flightNumber = parseInt((Math.random() * 3000) + 5000)
    return flightNumber;
}


function animateBookButton(){
    document.querySelector('button').innerHTML = '';
    var img = document.createElement("img");
    img.src = "airplane-button.png";
    img.setAttribute('id', 'airplane-button-id');
    var src = document.querySelector("button");
    src.appendChild(img);
}


document.querySelector('button').addEventListener('click', () => {
    if(tripParsed.tt == 'Ida e volta'){
        if(document.querySelector('.after').contains(document.querySelector('#card-selected-departure')) && document.querySelector('.after').contains(document.querySelector('#card-selected-return'))){
            tripParsed.departureScheduleSelected = document.querySelector('#departure-schedule-selected').innerHTML
            tripParsed.returnScheduleSelected = document.querySelector('#return-schedule-selected').innerHTML
            tripParsed.departureFlightNumber = document.querySelector('#departure-flight-number-selected').innerHTML
            tripParsed.returnFlightNumber = document.querySelector('#return-flight-number-selected').innerHTML
            animateBookButton();
            checkAnimationEnding();
        }
        else{
            alert('Você precisa selecionar um voo de ida e um de volta')
        }
    }
    else if(tripParsed.tt = 'Somente ida'){
        if(document.querySelector('.after').contains(document.querySelector('#card-selected-departure'))){
            tripParsed.departureScheduleSelected = document.querySelector('#departure-schedule-selected').innerHTML
            tripParsed.departureFlightNumber = document.querySelector('#departure-flight-number-selected').innerHTML
            animateBookButton();
            checkAnimationEnding();
        }
        else{
            alert('Você precisa selecionar o voo de ida')
        }
    }
})


function checkAnimationEnding(){
    let returnPrice;
    const departurePrice = parseFloat(document.querySelector('#departure-price').innerHTML.replace("R$", ""))
    $('#airplane-button-id').on('animationend webkitAnimationEnd', function() { 
        if(tripParsed.tt == 'Ida e volta'){
            returnPrice = parseFloat(document.querySelector('#return-price').innerHTML.replace("R$", ""))
        }
        else if(tripParsed.tt == 'Somente ida'){
            returnPrice = 0;
        }
        const totalPrice = departurePrice + returnPrice;
        tripParsed.totalPrice = totalPrice;
        sessionStorage.setItem('trip', JSON.stringify(tripParsed))
        window.location.href = "confirmation.html";
    });
}



    