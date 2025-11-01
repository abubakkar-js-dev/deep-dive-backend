const express = require('express');
const URL = require('../models/url.model');
const { checkAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/',checkAuth, async(req,res)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    const urls = await URL.find({createdBy: req.user._id});
    return res.render('home',{
        urls
    })
})

router.get('/signup',(req,res)=>{
    return res.render('signup');
})

router.get('/login',(req,res)=>{
    return res.render('login');
});

module.exports = router;
