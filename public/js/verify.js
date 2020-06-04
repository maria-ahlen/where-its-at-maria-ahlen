//return the data from the ticket
function idStorage() {
    return sessionStorage.getItem('id');
}

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
 
 
//Get the ticket from the database
async function getId() {
    let id = idStorage();
    const url = `http://localhost:8000/events/getticket/${id}`;
 
    try {
        const response = await fetch(url, {
            method: 'GET',
        });
 
        const data = await response.json();

        if(!data.id) {
            document.querySelector('#notValid').classList.toggle('hide');
        } else {
            return await data.id;
        }
 
    } catch (error) {
        console.log('Error in fetch on getTicket() : ', error);
    }
}


async function deleteTicket() {
    let id = idStorage();
    const url = `http://localhost:8000/events/deleteticket/${id}`;

    const response = await fetch(url, {
        method: 'DELETE'
    });

    const data = await response.json();
    return await data;
    
}


function verify() {
    const ticketNumberInput = document.querySelector('#ticketNumberInput');
    const verifyButton = document.querySelectorAll('#verifyButton');
    
    for(let i = 0; i < verifyButton.length; i++) {
        verifyButton[i].addEventListener('click', async () => {
            let number = ticketNumberInput.value;
            let ticketnumber = await getId();
        
            if (number === ticketnumber.id) {
                document.querySelector('#Valid').classList.toggle('hide');
                deleteTicket(ticketnumber.id);
                sessionStorage.removeItem('id');
                console.log('VALID TICKET');
            } else {
                document.querySelector('#notValid').classList.toggle('hide');
                console.log('NOT VALID TICKET');
            }   
        });
    }
}


verify();
loggedin();