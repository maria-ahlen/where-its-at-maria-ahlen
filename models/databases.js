const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const { v4: uuidv4 } = require('uuid');

const adapter1 = new FileSync('users.json');
const users = low(adapter1);

const adapter2 = new FileSync('events.json');
const events = low(adapter2);


module.exports = {

    //Users
    async getUserId(user) {
        return await users.get('users').find({ uuid: user.uuid }).value();
    },

    async getUserName(user) {
        return await users.get('users').find({ username: user.username }).value();
    },


    //Events
    async showEvent(uuid) {
        return await events.get('events').find({ eventid: uuid.eventid }).value();
    },

    async getEvents() {
        return await events.get('events').value();
    },

    async addEvents({eventName, city, date, from, to, tickets, price}) {
        const uuid = uuidv4();
        return await events.get('events').push({ eventid: uuid, eventName: eventName, city: city, date: date, from: from, to: to, tickets: tickets, price: price }).write();
    },


    //Tickets
    async getTicket(id) {
        console.log('From database.js: ', id);
        return await events.get('tickets').find({ id: id.id }).value();
    },

    async addTicket(ticket, id) {
        return await events.get('tickets').push({ ticket: ticket.eventid, eventName: ticket.eventName, city: ticket.city, date: ticket.date, from: ticket.from, to: ticket.to, id: id }).write();
    },

    async removeTicket(id) {
        return await events.get('tickets').remove({ id: id }).write();
    }
}