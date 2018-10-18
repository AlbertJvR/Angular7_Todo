const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server.');
    }
    
    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    // deleteMany 
    // db.collection('Todos')
    //     .deleteMany({text: 'Eat dinner'})
    //     .then((result) => {
    //         console.log(result);
    //     });

    // deleteOne
    // db.collection('Todos')
    //     .deleteOne({text: 'Eat dinner'})
    //     .then((result) => {
    //        console.log(result); 
    //     });

    //findOneAndDelete
    // db.collection('Todos')
    //     .findOneAndDelete({completed: false})
    //     .then((result) => {
    //        console.log(result); 
    //     });

    // Challenge
    db.collection('Users')
        .deleteMany({name: 'Albert', age: 27, location: 'Centurion'})
        .then((result) => {
            console.log('deleteMany result:');
            console.log(result.result);
        });

    db.collection('Users')
        .findOneAndDelete({_id: 123})
        .then((result) => {
            console.log('findOneAndDelete result:');
            console.log(result);
        });

    client.close();
});