import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

const connectDB = async ()=>{
    try{
     const connectionInstance =   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
     console.log(`\n Mongodb is connected successfully`)
     console.log("HOST: ",connectionInstance.connection.host);
    }catch(err){
        console.log("MongoDb connection error",err);
        process.exit(1);
    }
}


export default connectDB;