//Show all event from database
function showAllEvents(allEvents) {
    let eventSection = document.querySelector('#eventSection');
    eventSection.innerHTML = '';

    for (let event of allEvents) {
        let eventElem = document.createElement('div');
        eventElem.classList.add('eventlist');
        
        eventElem.innerHTML +=
            '<h5 class="eventitem" value=' + event.eventid + '>' + event.date + '</h5>' +
            '<h5 class="eventitem" value=' + event.eventid + '>' + event.eventName + '</h5>' + 
            '<h5 class="eventitem" value=' + event.eventid + '>' + event.city + '</h5>' + 
            '<h5 class="eventitem" value=' + event.eventid + '>' + event.from + '-' + event.to + '</h5>' + 
            '<h5 class="eventitem" value=' + event.eventid + '>' + event.price + 'sek' + '</h5>';

        eventSection.append(eventElem);
    }
    addEvent(); 
}

//Get all event from database
async function getAllEvents() {
    const url = 'http://localhost:8000/events/getall';

    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        const data = await response.json();
        showAllEvents(data.events);

    } catch (error) {
        console.log('Error in fetch on getAllEvents: ', error);
    }
}


function saveEvent(eventItem) {
    return localStorage.setItem('event', eventItem);
}

//add event to order
function addEvent() {
    const events = document.querySelectorAll('.eventitem');

    for (let i = 0; i < events.length; i++) {
        events[i].addEventListener('click',  () => {
            let eventid = events[i].getAttribute('value');
            saveEvent(eventid);
            location.href = 'http://localhost:8000/buy.html';
        });
    }
}

getAllEvents();