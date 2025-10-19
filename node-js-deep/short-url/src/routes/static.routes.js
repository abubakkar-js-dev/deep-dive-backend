const express = require('express');
const URL = require('../models/url.model');

const router = express.Router();

router.get('/', async(req,res)=>{
    const urls = await URL.find({});
    return res.render('home',{
        urls
    })
})

module.exports = router;
