// create a subject
class Subject{
    constructor(){
        this.observers = [];
    }

    // add observer to the list
    subscribe(observer){
        this.observers.push(observer);
    }


    // remove observer from list
    unsubscribe(observer){
        this.observers = this.observers.filter(obs=> obs !== observer);
    }

    // notify a message for every observer
    notification(data){
        this.observers.forEach(obs=> obs.update(data));
    }
}


// create a observer

class Observer{
    constructor(name){
        this.name = name
    }

    update(data){
        console.log(`${this.name} received update: ${data}`);
    }
}

// create a subject observible

const newsChannel = new Subject();


// create some observer

const user1 = new Observer('Abu Bakkar');
const user2 = new Observer('Rohim Saheb');
const user3 = new Observer('Karim Saheb');


// subscribe observer

newsChannel.subscribe(user1);
newsChannel.subscribe(user2);
newsChannel.subscribe(user3);


// notify all 

newsChannel.notification('Breacking new: I am learning advance Back end development');


// unsubscribe a user

newsChannel.unsubscribe(user1);

// notify again to check

newsChannel.notification('Breacking news: I am junior software developer.');