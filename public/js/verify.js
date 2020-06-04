const ticketNumberInput = document.querySelector('#ticketNumberInput');
const verifyButton = document.querySelector('#verifyButton');

function getId() {

}


async function deleteTicket() {
    const url = 'http://localhost:8000/events/deleteticket';

    const response = await fetch(url, {
        method: 'DELETE'
    });

    const data = await response.json();
    return await data;
}


verifyButton.addEventListener('click', async () => {
    let number = ticketNumberInput.value;
    let ticketnumber = await getId();

    if (number === ticketnumber) {
        document.querySelector('#Valid').classList.toggle('hide');
        deleteTicket(number);
    } else {
        document.querySelector('#notValid').classList.toggle('hide');
    }
});