const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5ae5ad9cc553a845965dfccf11';

// if (!ObjectID.isValid(id)) {
//     return console.log('The specified Id is not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todos', todo);
// });

// Todo.findById(id)
//     .then((todo) => {
//         if(!todo) {
//             return console.log('Object with Id not found');
//         }

//         console.log('Todos', todo);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

var userId = '5ae5caa714393a53f7d9681b';

User.findById(userId)
    .then((user) => {
        if (!user) {
            return console.log('User with specified Id not found');
        }

        console.log('User:', user);
    })
    .catch((err) => {
        console.log(err);
    });
