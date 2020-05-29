const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter1 = new FileSync('users.json');
const users = low(adapter1);

const adapter2 = new FileSync('events.json');
const events = low(adapter2);


module.exports = {
    async getUserId(user) {
        return await users.get('users').find({ uuid: user.uuid }).value();
    },

    async getUserName(user) {
        return await users.get('users').find({ username: user.username }).value();
    },

    async getTicket(ticket) {
        return await events.get('tickets').find({ id: ticket.id }).value();
    },

    async getEvents() {
        return await events.get('events').value();
    },

    async addEvents({eventName, city, date, from, to, tickets, price}) {
        return await events.get('events').push({ eventName: eventName, city: city, date: date, from: from, to: to, tickets: tickets, price: price }).write();
    },

    async addTicket(id, eventName, city, date, price) {
        return await events.get('tickets').push({ id: id, eventName: eventName, city: city, date: date, price: price }).write();
    },

    async removeTicket(id) {
        return await events.get('tickets').remove({ id: id }).write();
    }
}