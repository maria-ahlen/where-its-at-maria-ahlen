const { Router } = require('express');
const router = new Router();

const { showEvent, getEvents, addTicket, getTicket } = require('../models/databases');


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


router.get('/showevent/:id', async (req, res) => {
    let resObj = {
        success: false
    }

    const ticket = await showEvent();

    if (ticket) {
        resObj.success = true;
        resObj.eventid = ticket.uuid;
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;