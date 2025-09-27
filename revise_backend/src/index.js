const dotenv = require('dotenv')
const app = require('./app');
const PORT = process.env.PORT || 5000;
const connectMongoDb = require('./db/index.js');

dotenv.config();

// connect to MongoDB

connectMongoDb()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
    console.log('MongoDB connection established successfully');
})
.catch((err)=>{
    console.error("Failed to connect to MongoDB:", err);
    // process.exit(1);
})


app.get('/',(req,res)=>{
    res.send('Welcome to the API');
})