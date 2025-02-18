// require('dotenv').config({path: './.env'});
import dotenv from "dotenv";

import express from "express";
import connectDB from "./src/config/db.js";
const port = process.env.PORT || 5000;

const app = express();

dotenv.config({
    path: "./.env",
})


// connect db
connectDB();


app.get('/',(req,res)=>{
    console.log('The server is running');
    res.send('The server is running');
})


app.listen(port,()=>{
    console.log(`Server is listening on port: ${port}`);
})



/** 

;( async()=>{
    try{
     await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

     app.on('error',(error)=>{
        console.log("ERROR:",error);
        throw error;
     })

     app.listen(port,()=>{
        console.log(`App is listening on port ${port}`);
        
     })
    }catch(err){
        console.log("ERROR: ",err);
        throw err;
    }
})()

*/