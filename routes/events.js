const { Router } = require('express');
const router = new Router();

const { showEvent, getEvents, addTicket, getTicket } = require('../models/databases');

//Get all events from database
router.get('/getall', async (req, res) => {
    let resObj = {
        success: false
    }

    const events = await getEvents();

    if (events) {
        resObj.success = true;
        resObj.events = events;
    }

    res.send(JSON.stringify(resObj));
});


//Get chosen ticket from database
router.get('/getticket', async (req, res) => {
    let resObj = {
        success: false
    }

    const tickets = await getTicket();

    if (tickets) {
        resObj.success = true;
    }

    res.send(JSON.stringify(resObj));
});


 
//Get single event from database
router.post('/showevent', async (req, res) => {
    const body = req.body;
    let ticket = await showEvent(body);

    let resObj = {
        eventName: ticket.eventName,
        city: ticket.city,
        date: ticket.date,
        price: ticket.price
    }    
    res.send(JSON.stringify(resObj));
});


//add single ticket and generate a ticketnumber to database
router.post('/addticket', async (req, res) => {
    const body = req.body;

    const ticket = await addTicket(body);

    let resObj = {
        id: ticket.id,
        eventName: ticket.eventName,
        city: ticket.city,
        date: ticket.date,
        price: ticket.price
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;