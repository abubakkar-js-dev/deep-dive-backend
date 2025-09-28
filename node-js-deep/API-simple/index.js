import express from 'express';
import bodyParser from 'body-parser';
import {StatusCodes} from 'http-status-codes'

const app = express();
const PORT = 3000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.status(StatusCodes.OK)
    res.send('Hello world, this is my first API');
});

app.get('/hello',(req,res)=>{
    res.status(StatusCodes.CREATED)
    res.send('Hello from /hello endpoint');
});


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})