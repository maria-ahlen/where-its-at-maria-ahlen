const ticketNumberInput = document.querySelector('#ticketNumberInput');
const verifyButton = document.querySelector('#verifyButton');


//return the data from the ticket
function idStorage() {
    return localStorage.getItem('id');
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
        return await data.id;
 
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


verifyButton.addEventListener('click', async () => {
    let number = ticketNumberInput.value;
    let ticketnumber = await getId();

    if (!number === ticketnumber.id) {
        document.querySelector('#notValid').classList.toggle('hide');
        
    } else {
        document.querySelector('#Valid').classList.toggle('hide');
        deleteTicket(ticketnumber.id);
    }
});