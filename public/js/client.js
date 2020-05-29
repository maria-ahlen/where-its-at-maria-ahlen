const orderButton = document.querySelector('#orderButton');


function showAllEvents(allEvents) {
    let eventSection = document.querySelector('#eventSection');
    for (let event of allEvents) {
        let eventElem = document.createElement('div');
        eventElem.classList.add('event');
        
        eventElem.innerHTML +=
        '<h4>' + event.date + '</h4>' +
        '<h2>' + event.eventName + '</h2>' + 
        '<h5>' + event.city + '</h5>' + 
        '<h4>' + event.from + '-' + event.to + '</h4>' + 
        '<h3>' + event.price + '</h3>';

        eventSection.append(eventElem);
    }
}

async function getAllEvents() {
    const url = 'http://localhost:8000/events/getall';

    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        const data = await response.json();
        showAllEvents(data.events);

    } catch (error) {
        console.log(url, error);
    }
}


function createID() {
    let chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomSerial = '';

    for (let i = 0; i < 6; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        randomSerial += chars.substring(randomNumber, randomNumber +1);
    }   
}



function showTicket(tickets) {
    let showTicket = document.querySelector('.showTicket');

    for (let ticket of tickets) {
        let ticketElem = document.createElement('div');
        ticketElem.classList.add('ticketItem');

        ticketElem.innerHTML +=
        '<h3>' + ticket.eventName + '</h3>' + 
        '<h3>' + ticket.city + '</h3>' + 
        '<h3>' + ticket.date + '</h3>' + 
        '<h3>' + ticket.price + '</h3>' +
        '<h3 class="hide">' + ticket.id + '</h3>';

        showTicket.append(ticketElem);
    }
}


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



async function addTicktetToVerify(ticket) {
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




orderButton.addEventListener('click', () => {

});

createID();
getAllEvents();