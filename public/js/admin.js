const inputName = document.querySelector('#inputName');
const inputWhere = document.querySelector('#inputWhere');
const inputDate = document.querySelector('#inputDate');
const inputFrom = document.querySelector('#inputFrom');
const inputTo = document.querySelector('#inputTo');
const inputTickets = document.querySelector('#inputTickets');
const inputPrice = document.querySelector('#inputPrice');
const addEventButton = document.querySelector('#addEventButton');


function getToken() {
    return sessionStorage.getItem('auth');
}

//Send back user to loginpage if not logged in 
async function loggedin() {
    const token = getToken();
    const url = 'http://localhost:8000/auth/loggedin';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer' + token
        }
    });
    const data = await response.json();
    
    if (!data.loggedIn) {
        location.href = 'http://localhost:8000/login.html';
        sessionStorage.removeItem('auth');
    }
}



//Create an event to the database
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

//Show all the events
function showAllEvents(allEvents) {
    let eventList = document.querySelector('#eventList');
    eventList.innerHTML = '';

    for (let event of allEvents) {
        let eventElem = document.createElement('div');
        eventElem.classList.add('eventitem');
        
        eventElem.innerHTML +=
            '<h4 class="name">' + event.eventName + '</h4>' + 
            '<h5 class="place">' + event.city + '</h5>' + 
            '<h5 class="tickets">' + event.tickets + '</h5>' + 
            '<h5 class="price">' + event.price + '</h5>';

            eventList.append(eventElem);
    }
}

//Get all the events from database
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

//When button pushed, the filled in fields adds to the database
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
loggedin();