const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const {logReqRes} = require('./middlewares/index');

const userRouter = require('./routes/user.routes');




// Middleware for parsing URL-encoded body (e.g., from HTML forms)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// 1️⃣ Logging Middleware
app.use(logReqRes('log.txt'));



// Routes 

app.use('/api/users',userRouter);


module.exports = app;

