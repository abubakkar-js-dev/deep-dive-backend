const mongoose = require('mongoose');
const {dbName} = require('../constant.js');


const connectMongoDb = async()=>{
    const connectionString = process.env.MONGODB_URI;
    // console.log("MongoDB URI:", connectionString);
    if (!connectionString) {
        console.error('MONGODB_URI is not defined in the environment variables.');
        process.exit(1);
    }
    try{
        const connectionInstance = await mongoose.connect(`${connectionString}/${dbName}`);
        console.log('MongoDB connected successfully:', connectionInstance.connection.host);
        console.log('Database Name:', connectionInstance.connection.db.databaseName);
        return connectionInstance;
    }catch(err){
        console.log('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}

module.exports = connectMongoDb;