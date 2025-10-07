const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();


// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: '*'}));

// api routes




module.exports = app;
