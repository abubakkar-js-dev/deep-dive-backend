const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { nanoid } = require('nanoid');
const cookieParser = require('cookie-parser');
const path = require('path');
const URL = require('./models/url.model');
const app = express();

const urlRouter = require('./routes/url.routes');
const staticRouter = require('./routes/static.routes');
const userRouter = require('./routes/user.routes');
const { restrictToLoggedInUserOnly } = require('./middlewares/auth.middleware');

// Example: generate a random ID of length 8

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: '*'}));
app.use(cookieParser());

// api routes

app.use('/url',restrictToLoggedInUserOnly,urlRouter);
app.use('/',staticRouter);
app.use('/user',userRouter);

app.get('/url/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOne({shortId});
    if(!entry){
        return res.status(404).json({success: false, message: 'Short Url is not found.'});
    }
    await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistory: {timestamps:  Date.now()}
        }
    })
    
    return res.redirect(entry.redirectURL);
})

// app.get('/url/test', async(req,res)=>{
//     const allUrls = await URL.find({});
//     return res.render('home',{
//         urls: allUrls,
//     }); 

// })


module.exports = app;
