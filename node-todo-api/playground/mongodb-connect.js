// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// ID generator used by MongoDB
// var obj = new ObjectID();
// console.log(obj);

// This is and ES6 capability called Object Destructuring 
// Handy way to create variables from an objects' properties
// var user = {name: 'Albert', age: 25};
// var {name} = user;
// console.log(name);
///////////////////////////////////////////////////////////

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server.');
    }
    
    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Albert',
    //     age: 27,
    //     location: 'Centurion'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to create user', err);
    //     }

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });

    client.close();
});