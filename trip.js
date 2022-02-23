class Trip{
    constructor(coordinatesArray, departure, destination, departureDate, returnDate, cabin, tt, flightSchedule, returnSchedule, adultAmount, childAmount, departureScheduleSelected, returnScheduleSelected){
        this.coordinatesArray = coordinatesArray;
        this.departure = departure;
        this.destination = destination;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.cabin = cabin;
        this.tt = tt;
        this.departureSchedule = flightSchedule;
        this.returnSchedule = returnSchedule;
        this.adultAmount = adultAmount;
        this.childAmount = childAmount;
        this.departureScheduleSelected = departureScheduleSelected;
        this.returnScheduleSelected = returnScheduleSelected;
    }
    

    display(){
        console.log(this.departure, this.destination, this.departureDate, this.returnDate, this.cabin, this.tt, this.departureSchedule, this.returnSchedule, this.adultAmount, this.childAmount)
    }
}