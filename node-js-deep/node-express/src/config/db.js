const mongoose = require('mongoose');

const connectMongodb = async()=>{
    try{
        const connectionInstant = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongodb Connected HOST: ',connectionInstant.connection.host);
        console.log('Database name: ',connectionInstant.connection.db.databaseName);
    }catch(err){
        console.log('Mongodb connection error: ',err);
        process.exit(1);
    }
} 

module.exports = connectMongodb;