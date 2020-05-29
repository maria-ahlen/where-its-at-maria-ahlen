const orderButton = document.querySelector('#orderButton');


function showAllEvents(allEvents) {
    let eventSection = document.querySelector('#eventSection');
    eventSection.innerHTML = '';

    for (let event of allEvents) {
        let eventElem = document.createElement('div');
        eventElem.classList.add('event');
        
        eventElem.innerHTML +=
            '<h5>' + event.date + '</h5>' +
            '<h5>' + event.eventName + '</h5>' + 
            '<h5>' + event.city + '</h5>' + 
            '<h5>' + event.from + '-' + event.to + '</h5>' + 
            '<h5>' + event.price + '</h5>';

        eventSection.append(eventElem);        
    }
    showModal(eventSection);
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



function showTicket(tickets) {
    let ticketShow = document.querySelector('.showTicket');
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


function showModal(ticket) {
    document.querySelector('.event').addEventListener('click', () => {
        //document.querySelector('.eventlist').classList.toggle('hide');
        //document.querySelector('#modal').classList.toggle('hide');
        //document.querySelector('#ticketID').classList.toggle('hide');
        console.log('hej');
    });

    showTicket(ticket);
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
        showTicket(data.tickets);

    } catch(error) {
        console.log('Error in fetch on addTicketToVerify() :', error);
    }
}


orderButton.addEventListener('click', () => {

});

getAllEvents();