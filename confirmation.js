let tripParsedConfirmation = JSON.parse(sessionStorage.getItem('trip'))
console.log(tripParsedConfirmation)
document.querySelector('.confirmation-panel').innerHTML = `
    <div class="ticket">
        <div class="ticket-main">
                <div class="ticket-header">
                    <div class="bg-logo">
                        <img  src="logo.png">
                    </div>
                    
                    <div class="ticket-title">Booking Confirmation</div>
                </div>
                <div class="ticket-destination">
                    <div class="ticket-departure">
                        <div class="confirmation-location"><h3>De </h3>${tripParsedConfirmation.departure}</div>
                        <div><h3>Voo </h3> ${tripParsedConfirmation.departureFlightNumber.replace("Voo", "")}</div>
                        <div><h3>Data </h3> ${tripParsedConfirmation.departureDate}</div>
                        <div><h3>Horário </h3> ${tripParsedConfirmation.departureScheduleSelected.replace("Horário: ", "")}</div>
                    </div>
                    <div class="ticket-return">
                        <div class="confirmation-location"><h3>De </h3>${tripParsedConfirmation.destination}</div>
                        <div><h3>Voo </h3> ${tripParsedConfirmation.returnFlightNumber.replace("Voo", "")}</div>
                        <div><h3>Data </h3> ${tripParsedConfirmation.returnDate}</div>
                        <div><h3>Horário </h3> ${tripParsedConfirmation.returnScheduleSelected.replace("Horário: ", "")}</div>
                    </div>
                </div>
                <div class="ticket-footer"></div>
        </div>
        
        <div class="ticket-sidebar">
            <div class="sidebar-info">
                <div class="ticket-header"></div>
                <div class="cabin">
                    <div><h3>Cabine </h3>${tripParsedConfirmation.cabin}</div>
                </div>
                <div class="passangers">
                    <div><h3>Adultos </h3>${tripParsedConfirmation.adultAmount}</div>
                    <div><h3>Crianças </h3> ${tripParsedConfirmation.childAmount}</div>
                </div>
                <div class="total-price">
                    <div><span>Valor Total </span>R$${tripParsedConfirmation.totalPrice},00</div>
                </div>
            </div>
            <div class="ticket-footer" style="position: absolute; width: 100%"></div>
        </div>
        
    </div>
`
     
//<div>R$${tripParsedConfirmation.totalPrice}</div>