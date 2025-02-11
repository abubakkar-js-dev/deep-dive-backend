import express from 'express';
import cors from 'cors';
import EventEmitter from 'events';
const app = express();

// middleware
app.use(cors());
// jokes api
app.get('/api/jokes',(req,res)=>{
    const jokes = [
        {
            setup: "Why don't scientists trust atoms?",
            punchline: "Because they make up everything!"
        },
        {
            setup: "Why did the scarecrow win an award?",
            punchline: "Because he was outstanding in his field!"
        },
        {
            setup: "Why don't skeletons fight each other?",
            punchline: "They don't have the guts."
        },
        {
            setup: "What do you call fake spaghetti?",
            punchline: "An impasta!"
        },
        {
            setup: "Why did the bicycle fall over?",
            punchline: "Because it was two-tired!"
        }
    ];

    res.send(jokes);
})

    // Event emmiter in node js
    const myEmmiter = new EventEmitter();

    myEmmiter.on('hello',(name)=>{
        console.log(`Hello ${name}, How are you`);
    })

    myEmmiter.emit('hello','Abu Bakkar');

    const greetListener= (name)=>{
        console.log(`Hey, What's up ${name}`);
    }

    myEmmiter.on('greet',greetListener);
    myEmmiter.emit('greet','Shuhana');

    myEmmiter.off('greet',greetListener);
    myEmmiter.emit('greet','Rahi'); // No output because the emiter is removed


app.get('/',(req,res)=>{
    res.send('Server is okay....')

})




const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Serve at https://localhost:${port}`);
})