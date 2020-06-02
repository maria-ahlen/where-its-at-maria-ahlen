//Show ticket and the ticketnumber
function showTicket(tickets) {
    let ticketShow = document.querySelector('#showTicket');
    ticketShow.innerHTML = '';

    for (ticket of tickets) {
        let ticketElem = document.createElement('div');
        ticketElem.setAttribute('ticketItem');

        ticketElem.innerHTML +=
            '<h3 class="eventitem">' + ticket.eventName + '</h3>' + 
            '<h3 class="eventitem">' + ticket.city + '</h3>' + 
            '<h3 class="eventitem">' + ticket.date + '</h3>' + 
            '<h3 class="eventitem">' + ticket.price + '</h3>';

        ticketShow.append(ticketElem);
    }
    addToBy();
}

function getEvent() {
   return localStorage.getItem('event');
}


//Fetch the ticket
async function showEvent() {
    const ticket = await getEvent();
    const url = 'http://localhost:8000/events/showevent';
    
    let obj = {
        eventid: ticket
    }
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers : {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        
        console.log('Data in showEvent(): ', data);
        await showTicket(data);

    } catch(error) {
        console.log('Error in fetch on showEvent() :', error);
    }
}


//Add single ticket to database
async function addTicktet() {
    const url = 'http://localhost:8000/events/addticket';

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(ticket),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.json();
        return await data;

    } catch(error) {
        console.log('Error in fetch on addTicketToVerify() :', error);
    }
}

//Order the ticket to add ticketnumber
function addToBy() {
    const orderButton = document.querySelector('#orderButton');

    orderButton.addEventListener('click', () => {
        addTicktet();
        //location.href = 'http://localhost:8000/ticket.html';
    });
}


showEvent();