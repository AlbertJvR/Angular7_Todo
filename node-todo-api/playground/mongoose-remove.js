const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');

const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({})
//     .then((result) => {
//         console.log(result);
//     });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// can query by more than just id, multiple field query
Todo.findOneAndRemove({_id: '5ae706fad67284223d6edcb9'})
    .then((todo) => {
        console.log(todo);
    });

Todo.findByIdAndRemove('5ae706fad67284223d6edcb8')
    .then((todo) => {
        console.log(todo);
    });
