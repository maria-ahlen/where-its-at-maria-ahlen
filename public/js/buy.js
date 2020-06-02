//Show ticket and the ticketnumber
function showTicket(ticket) {
    let ticketShow = document.querySelector('#showTicket');
    let ticketElem = document.createElement('div');
    ticketElem.classList.add('ticketItem');

    ticketElem.innerHTML +=
        '<h3 class="eventitem">' + ticket.eventName + '</h3>' + 
        '<h3 class="eventitem">' + ticket.city + '</h3>' + 
        '<h3 class="eventitem">' + ticket.date + '</h3>' + 
        '<h3 class="eventitem">' + ticket.price + ' sek</h3>';

    ticketShow.append(ticketElem);
    
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
        showTicket(data);

    } catch(error) {
        console.log('Error in fetch on showEvent() :', error);
    }
}


//Add single ticket to database
async function addTicktet(eventname, city, date, from, to, id) {
    const url = 'http://localhost:8000/events/addticket';
    
    let obj = {
        eventName: eventname,
        city: city,
        date: date, 
        from: from,
        to: to,
        id: id
    }

    console.log('obj:', obj);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.json();
        console.log('data', data);

    } catch(error) {
        console.log('Error in fetch on addTicketToVerify() :', error);
    }
}

//Order the ticket to add ticketnumber
function addToBy() {
    const orderButton = document.querySelector('#orderButton');
    
    orderButton.addEventListener('click', () => {
        addTicktet(orderButton.value);
        console.log(orderButton.value);
        //location.href = 'http://localhost:8000/ticket.html';
    });
}


showEvent();