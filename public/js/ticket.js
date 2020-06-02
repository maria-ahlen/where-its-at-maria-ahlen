//Show ticket and the ticketnumber
function showTicket(tickets) {
    let ticketShow = document.querySelector('.ticketItem');
    ticketShow.innerHTML = '';

    for (let ticket of tickets) {
        let ticketElem = document.createElement('div');
        ticketElem.setAttribute('ticketItem');

        ticketElem.innerHTML +=
            '<h3>' + ticket.eventName + '</h3>' + 
            '<h3>' + ticket.city + '</h3>' + 
            '<h3>' + ticket.date + '</h3>' + 
            '<h3>' + ticket.price + '</h3>' +
            '<h3>' + ticket.id + '</h3>';

        ticketShow.append(ticketElem);
    }
}

//Get the ticket from the database
async function getTicket() {
    const url = 'http://localhost:8000/events/getticket';

    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        const data = await response.json();
        showTicket(data.tickets);

    } catch (error) {
        console.log('Error in fetch on getTicket() : ', error);
    }
}
