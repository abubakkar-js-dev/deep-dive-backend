const express = require('express');
require('dotenv').config();
const cors = require('cors');
const urlRouter = require('./routes/url.routes');

const app = express();


// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: '*'}));

// api routes

app.use('/url',urlRouter);


module.exports = app;
