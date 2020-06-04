//Show ticket and the ticketnumber
function showTicket(ticket) {
    let ticketShow = document.querySelector('#ticketItem');

        let ticketElem = document.createElement('div');
        ticketElem.innerHTML +=
            '<div id="what"><p>What</p><h5>' + ticket.eventName + '</h5></div>' +
            '<div id="where"><p>Where</p><h5>' + ticket.city + '</h5></div>' +
            '<div id="date">'+
            '<div id="when"><p>When</p><h5>' + ticket.date + '</h5></div>'  +
            '<div id="from"><p>From</p><h5>' + ticket.from + '</h5></div>' +
            '<div id="to"><p>To</p><h5>' + ticket.to + '</h5></div>'+
            '</div>' +
            '<div id="ticketNumber"><img src="img/A2ED7barcode.png" alt="barcode" id="barcode"><p>Ticket number: ' + ticket.id + '</p></div>';
        
            ticketShow.append(ticketElem);
}


//return the data from the ticket
function idStorage() {
   return sessionStorage.getItem('id');
}


//Get the ticket from the database
async function getTicket() {
    let id = idStorage();
    const url = `http://localhost:8000/events/getticket/${id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        const data = await response.json();
        showTicket(data.id);

    } catch (error) {
        console.log('Error in fetch on getTicket() : ', error);
    }
}

getTicket();