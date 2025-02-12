const mongoose = require('mongoose');

async function connectMongoDb(url) {
    await mongoose.connect(url)
    .then(()=>{
        console.log('The database is connected');
    })
    .catch((err)=>{
        console.log('Mongodb connection error',err);
    })
}


module.exports = connectMongoDb;