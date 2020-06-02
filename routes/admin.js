const { Router } = require('express');
const router = new Router();

const { admin } = require('../middleware/auth');
const { getEvents, addEvents } = require('../models/databases');


//Get admin from database
router.get('/admin', admin, (req, res) => {
    res.send(JSON.stringify({ success: true, message: 'Admin account!'}));
});


//Show all events in database
router.get('/showevents', async (req, res) => {
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


//Add events to the database
router.post('/addevent', async (req, res) => {
    const body = req.body;

    let createEvent = await addEvents(body);

    let resObj = {
        eventid: createEvent.uuid,
        eventName: createEvent.eventName,
        city: createEvent.city,
        date: createEvent.date,
        from: createEvent.from,
        to: createEvent.to,
        tickets: createEvent.tickets,
        price: createEvent.price
    }
    
    res.send(JSON.stringify(resObj));
});


module.exports = router;