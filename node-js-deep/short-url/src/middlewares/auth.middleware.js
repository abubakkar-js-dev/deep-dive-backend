const { getUser } = require("../services/auth.services");

async function restrictToLoggedInUserOnly(req,res,next){
    const sessionId = req.cookies?.uid;
    console.log(sessionId,'session id in middleware');

    if(!sessionId){
        return res.redirect('/login');
    }
    const user = getUser(sessionId);
    if(!user) return res.redirect('/login');

    req.user = user; 
    next();
}
async function checkAuth(req,res,next){
    const user = getUser(req.cookies?.uid);

    req.user = user; 
    next();
}


module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}