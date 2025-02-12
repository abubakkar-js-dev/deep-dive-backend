const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;
const productRouter = require('./routes/products/products');
const connectMongoDb = require('./config/db');


// middleware

app.use(cors());
app.use(express.json());


// connect with db
connectMongoDb('mongodb://localhost:27017/mvc-db');


// router

app.use('/api/products',productRouter);



app.get('/',(req,res)=>{
    console.log('The server is running.');
    res.send('Welcome to my server');
})


app.listen(port,()=>{
    console.log(`The server is running on port ${port}`);
})