function showAllEvents(allEvents) {
    let eventSection = document.querySelector('#eventSection');
    eventSection.innerHTML = '';

    for (let event of allEvents) {
        let eventElem = document.createElement('div');
        eventElem.classList.add('eventlist');
        
        eventElem.innerHTML +=
            '<h5>' + event.date + '</h5>' +
            '<h5>' + event.eventName + '</h5>' + 
            '<h5>' + event.city + '</h5>' + 
            '<h5>' + event.from + '-' + event.to + '</h5>' + 
            '<h5>' + event.price + '</h5>';

        eventSection.append(eventElem);
    }
    addEvent(); 
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
        console.log('Error in fetch on getAllEvents: ', error);
    }
}


async function showEvent(id) {
    const url = `http://localhost:8000/events/showevent/${id}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        const data = await response.json();
        return await data;

    } catch (error) {
        console.log('Error in fetch on getAllEvents: ', error);
    }
}


function addEvent() {
    const events = document.querySelectorAll('.eventlist');

    for (let i = 0; i < events.length; i++) {
        events[i].addEventListener('click', () => {
            console.log(showEvent());
            //location.href = 'http://localhost:8000/buy.html';
        });
    }
}

getAllEvents();