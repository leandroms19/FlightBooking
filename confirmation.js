let tripParsedConfirmation = JSON.parse(sessionStorage.getItem('trip'));
if(tripParsedConfirmation.tt == 'Ida e volta'){
    document.querySelector('.confirmation-panel').innerHTML = `
    <div class="ticket">
        <div class="ticket-main">
                <div class="ticket-header">
                    <div class="bg-logo">
                        <img  src="logo.png">
                    </div>
                    
                    <div class="ticket-title">Flight Ticket</div>
                </div>
                <div class="ticket-destination">
                    <div class="ticket-departure">
                        <div class="confirmation-location"><h3>IDA </h3>${tripParsedConfirmation.departure}</div>
                        <div><h3>VOO </h3> ${tripParsedConfirmation.departureFlightNumber.replace("Voo", "")}</div>
                        <div><h3>DATA </h3> ${tripParsedConfirmation.departureDate}</div>
                        <div><h3>HORÁRIO </h3> ${tripParsedConfirmation.departureScheduleSelected.replace("Horário: ", "")}</div>
                    </div>
                    <div class="ticket-return">
                        <div class="confirmation-location"><h3>VOLTA </h3>${tripParsedConfirmation.destination}</div>
                        <div><h3>VOO </h3> ${tripParsedConfirmation.returnFlightNumber.replace("Voo", "")}</div>
                        <div><h3>Data </h3> ${tripParsedConfirmation.returnDate}</div>
                        <div><h3>HORÁRIO </h3> ${tripParsedConfirmation.returnScheduleSelected.replace("Horário: ", "")}</div>
                    </div>
                </div>
                <div class="ticket-footer"></div>
        </div>
        
        <div class="ticket-sidebar">
            <div class="sidebar-info">
                <div class="ticket-header"></div>
                <div class="trip-type-confirmation">
                    <div><h3>TIPO DE VIAGEM </h3>${tripParsedConfirmation.tt}</div>
                </div>
                <div class="cabin">
                    <div><h3>CABINE </h3>${tripParsedConfirmation.cabin}</div>
                </div>
                <div class="passangers">
                    <div><h3>ADULTO(S) </h3>${tripParsedConfirmation.adultAmount}</div>
                    <div><h3>CRIANÇA(S) </h3> ${tripParsedConfirmation.childAmount}</div>
                </div>
                <div class="total-price">
                    <div><span>VALOR TOTAL </span>R$${tripParsedConfirmation.totalPrice},00</div>
                </div>
            </div>
            <div class="ticket-footer" style="position: absolute; width: 100%"></div>
        </div>
        
    </div>
`
}

else if(tripParsedConfirmation.tt == 'Somente ida'){
    document.querySelector('.confirmation-panel').innerHTML = `
    <div class="ticket">
        <div class="ticket-main">
                <div class="ticket-header">
                    <div class="bg-logo">
                        <img  src="logo.png">
                    </div>
                    
                    <div class="ticket-title">Booking Ticket</div>
                </div>
                <div class="ticket-destination">
                    <div class="ticket-departure">
                        <div class="confirmation-location"><h3>De </h3>${tripParsedConfirmation.departure}</div>
                        <div><h3>Voo </h3> ${tripParsedConfirmation.departureFlightNumber.replace("Voo", "")}</div>
                        <div><h3>Data </h3> ${tripParsedConfirmation.departureDate}</div>
                        <div><h3>Horário </h3> ${tripParsedConfirmation.departureScheduleSelected.replace("Horário: ", "")}</div>
                    </div>
                </div>
                <div class="ticket-footer"></div>
        </div>
        
        <div class="ticket-sidebar">
            <div class="sidebar-info">
                <div class="ticket-header"></div>
                <div class="trip-type-confirmation">
                    <div><h3>TIPO DE VIAGEM </h3>${tripParsedConfirmation.tt}</div>
                </div>
                <div class="cabin">
                    <div><h3>CABINE </h3>${tripParsedConfirmation.cabin}</div>
                </div>
                <div class="passangers">
                    <div><h3>ADULTO(S) </h3>${tripParsedConfirmation.adultAmount}</div>
                    <div><h3>CRIANÇA(S) </h3> ${tripParsedConfirmation.childAmount}</div>
                </div>
                <div class="total-price">
                    <div><span>VALOR TOTAL </span>R$${tripParsedConfirmation.totalPrice},00</div>
                </div>
            </div>
            <div class="ticket-footer" style="position: absolute; width: 100%"></div>
        </div>
        
    </div>
`,
    document.querySelector('.ticket-destination').style.display = 'flex';
    document.querySelector('.ticket-destination').style.height = '420px'
    document.querySelector('.ticket-destination').style.alignItems = 'center';
    document.querySelector('.ticket-destination').style.marginBottom = '50px'
    document.querySelector('.ticket-departure').style.marginTop = '0';
    document.querySelector('.ticket-departure').style.paddingBottom = '10px';
    
}

sessionStorage.removeItem('trip')