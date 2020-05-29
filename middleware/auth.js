const jwt = require('jsonwebtoken');
const { getUserId } = require('../models/databases');

module.exports = {
    async staff(req, res, next) {
        try {
            const token = req.headers('Authorization').replace('Bearer', '');
            const data = jwt.verify(token, 'hf7hTbdk');
            const user = await getUserId(data);

            req.user = user;
            next();

        } catch (error) {
            res.send(JSON.stringify({ success: false, error: 'Token not valid'}));
        }
    },

    async admin(req, res, next) {
        try {
            const token = req.headers('Authorization').replace('Bearer', '');
            const data = jwt.verify(token, 'hf7hTbdk');
            const user = await getUserId(data);

            if(user.role !== 'admin') {
                throw new Error();
            }

            req.user = user;
            next();

        } catch (error) {
            res.send(JSON.stringify({ success: false, error: 'Token not valid'}));
        }
    }    
}