const mongoose = require('mongoose');
const {dbName} = require('../constant.js');


const connectMongoDb = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
        console.log('MongoDB connected successfully:', connectionInstance.connection.host);
        console.log('Database Name:', connectionInstance.connection.db.databaseName);
        return connectionInstance;
    }catch(err){
        console.log('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}

module.exports = connectMongoDb;