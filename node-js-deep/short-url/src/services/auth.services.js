const jwt = require('jsonwebtoken');
const JWT_SECREATE = 'fe55df7a8d4ab4eb4c16c3a8ae7b03d3c6c93d7f8a2124375551e28a0c4455cf'
// const sessionIdToUserIdMap = new Map();

// function setUser(id,user){
//     sessionIdToUserIdMap.set(id,user);
// }

// function getUser(id){
//     return sessionIdToUserIdMap.get(id);
// }

function setUser(id,user){
    const payload = {
        id,
        ...user
    }
    return jwt.sign(payload,JWT_SECREATE,{expiresIn: '4d'})
}

function getUser(token){
    if(!token) return null;
    try {
        // return jwt.verify(token,JWT_SECREATE);
        const decoded = jwt.verify(token,JWT_SECREATE);
        return decoded;
    } catch (err) {
        return null;
    }
}


module.exports ={
    setUser,
    getUser,
}