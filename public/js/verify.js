function getToken() {
    return sessionStorage.getItem('auth');
}

function removeToken() {
    sessionStorage.removeItem('auth');
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
        removeToken();
        location.href = 'http://localhost:8000/login.html';
    }
}
 
 
//Get the chosen ticket from the database
async function getId(id) {
    const url = `http://localhost:8000/events/getticket/${id}`;
 
    try {
        const response = await fetch(url, {
            method: 'GET',
        });
 
        const data = await response.json();

        if(!data.id) {
            document.querySelector('#Valid').classList.add('hide');
            document.querySelector('#notValid').classList.toggle('hide');
        } else {
            return await data.id;
        }
 
    } catch (error) {
        console.log('Error in fetch on getTicket() : ', error);
    }
}


//delete the chosen ticket from database if existing
async function verifyTicket(id) {
    const url = `http://localhost:8000/staff/verifyticket/${id}`;

    const response = await fetch(url, {
        method: 'DELETE'
    });

    const data = await response.json();
    if(data.id) {
        document.querySelector('#notValid').classList.add('hide');
        return await data.id;
    }
}


//Check if ticket is valid when pressing the button
function verify() {
    const ticketNumberInput = document.querySelector('#ticketNumberInput');
    const verifyButton = document.querySelectorAll('#verifyButton');
    
    for(let i = 0; i < verifyButton.length; i++) {
        verifyButton[i].addEventListener('click', async () => {
            let number = ticketNumberInput.value;
            let ticketnumber = await getId(number);

            if (number === ticketnumber.id) {
                document.querySelector('#Valid').classList.toggle('hide');
                verifyTicket(ticketnumber.id);
            } else {
                document.querySelector('#notValid').classList.toggle('hide');
            } 
        });
    }
}

verify();
loggedin();