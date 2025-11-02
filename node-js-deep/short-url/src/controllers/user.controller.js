const User = require('../models/user.model');
const {v4: uuidv4} = require('uuid');
const { setUser } = require('../services/auth.services');

async function handleUserSignUp(req,res) {
    const {name,email,password} = req.body;
    try{
        const user = new User({name,email,password});
        await user.save();
        return res.redirect('/')
    }catch(err){
        console.log(err);
        return res.status(500).json({success: false,message: "Internal Server Error"});
    }
}
async function handleUserLogin(req,res) {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email,password});
        if(!user){
            return res.render('login',{message: "Invalid Credentials"});
        }
        const sessionId = uuidv4();  
        // setUser(sessionId,user);

      const token =  setUser(sessionId,user);
        res.cookie('uid',token);
        return res.redirect('/');
    }catch(err){
        console.log(err,"Error From login User")
        return res.status(500).json({success: false,message: "Internal Server Error"});
    }
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}