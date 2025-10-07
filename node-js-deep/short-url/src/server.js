const app = require("./app");
const connectMongoDb = require("./config/db.config");

const port = process.env.PORT || 3000;




// connect database 


connectMongoDb()
.then(()=>{
    app.listen(port,()=>{
        console.log('The server listening on PORT: ',port);
    })
    console.log('MongoDb Connected Successfully');
})
.catch(err=>{
    console.log('Failed to connect Mongodb',err);
})