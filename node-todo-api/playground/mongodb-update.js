const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server.');
    }
    
    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    // findOneAndUpdate
    // Have to use update operators, check api for list
    // db.collection('Todos')
    //     .findOneAndUpdate({
    //         _id: new ObjectID('5ae4d66ce7bbd38f93e9884c')
    //     }, {
    //         $set: { completed: true }
    //     }, {
    //         returnOriginal: false
    //     }).then((result) => {
    //         console.log(result);
    //     });

    // Challenge
    db.collection('Users')
        .findOneAndUpdate({
            name: 'Albert'
        }, {
            $set: { name: 'Dave'},
            $inc: { age: 1 }
        }, {
            returnOriginal: false
        })
        .then((result) => {
            console.log(result);
        });

    client.close();
});