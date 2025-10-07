const mongoose = require('mongoose');

async function connectMongoDb() {
    try{
        const connectionInstant = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongodb Connected Host: ',connectionInstant.connection.host);
        console.log('Database Name: ',connectionInstant.connection.db.databaseName);
    }catch(err){
        console.log('Mongodb Connection Error: ',err);
        process.exit(1);
    }
}

module.exports = connectMongoDb;