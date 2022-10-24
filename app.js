const express = require('express');
const cors = require('cors');
const router = require('./routers');
const {basicErrorHandler, sequelizeErrorHandler} = require('./middlewares/handleErrors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//ROUTER
app.use('/api', router);

app.use(sequelizeErrorHandler);

app.use(basicErrorHandler);

module.exports = app;
