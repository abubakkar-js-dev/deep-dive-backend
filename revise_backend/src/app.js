const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static('public'));
app.use(cookieParser());


// api routes

module.exports = app;// Add your API routes here