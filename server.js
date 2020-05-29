const express = require('express');
const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin');
const loginRouter = require('./routes/loggedin');
const staffRouter = require('./routes/staff');
const eventsRouter = require('./routes/events');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());


app.use('/admin', adminRouter);
app.use('/auth', loginRouter);
app.use('/staff', staffRouter);
app.use('/events', eventsRouter);


app.listen(8000, () => {
    console.log('Server is running on port 8000...');
});