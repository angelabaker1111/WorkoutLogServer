require("dotenv").config();
const express = require('express');
const app = express();
const sequelize = require('./db')
const log = require('./controllers/logcontroller');
const user = require('./controllers/usercontroller');
// const bodyParser = require("body-parser");

sequelize.sync();
// sequelize.sync({force: true});


// app.use(bodyParser.json());


app.use(require("./middleware/headers"));

app.use(express.json());

app.use('/log', log);
app.use('/user', user);

app.listen(3000, function () {
    console.log('This is mine on port 3000');
});
