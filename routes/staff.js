const { Router } = require('express');
const router = new Router();

const { staff } = require('../middleware/auth');

const { removeTicket } = require('../models/databases');

//Get staff from database
router.get('/staff', staff, (req, res) => {
    let resObj = {
        user: req.user.username,
        role: req.user.role,
        success: true
    }

    res.send(JSON.stringify(resObj));
});


//Verify and delete the ticket from database
router.delete('/verifyticket/:id', async (req, res) => {
    const id = req.params.id;    
    let ticket = await removeTicket(id);

    let resObj = {
        eventid: ticket,
        eventName: ticket,
        city: ticket,
        date: ticket,
        from: ticket,
        to: ticket,
        id: ticket
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;