const inputName = document.querySelector('#inputName');
const inputWhere = document.querySelector('#inputWhere');
const inputDate = document.querySelector('#inputDate');
const inputFrom = document.querySelector('#inputFrom');
const inputTo = document.querySelector('#inputTo');
const inputTickets = document.querySelector('#inputTickets');
const inputPrice = document.querySelector('#inputPrice');
const addEventButton = document.querySelector('#addEventButton');



async function createEvent(event) {
    try {
        const url = 'http://localhost:8000/admin/addevent';

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.json();
        return await data;
    } catch(error) {
        console.log('Error in fetch on createEvent() :', error);
    }
}



function showAllEvents(allEvents) {
    let eventSection = document.querySelector('#events');
    for (let event of allEvents) {
        let eventElem = document.createElement('div');
        eventElem.classList.add('eventitem');
        
        eventElem.innerHTML +=
        '<h2>' + event.eventName + '</h2>' + 
        '<h5>' + event.city + '</h5>' + 
        '<h4>' + event.tickets + '</h4>' + 
        '<h3>' + event.price + '</h3>';

        eventSection.append(eventElem);
    }
}

async function getAllEvents() {
    const url = 'http://localhost:8000/admin/showevents';

    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        const data = await response.json();
 
        showAllEvents(data.events);
    } catch (error) {
        console.log('Error in fetch on getAllEvents() : ', error);
    }
}



addEventButton.addEventListener('click', () => {
    let eventObj = {
        eventName: inputName.value,
        city: inputWhere.value,
        date: inputDate.value,
        from: inputFrom.value,
        to: inputTo.value,
        tickets: inputTickets.value,
        price: inputPrice.value
    }
    createEvent(eventObj);
    getAllEvents();
});

getAllEvents();