// const {SHA256} = require('crypto-js');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

////////////////////////////////////////////////////////////////////////////////////
// TESTING BCRYPT
////////////////////////////////////////////////////////////////////////////////////

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => { 
//    bcrypt.hash(password, salt, (err, hash) => {
//       console.log(hash); 
//    });
// });

var hashedPassword = '$2a$10$2U2XdHiz7QIg1cU4kf8uweJo9P2lPU/0OJIx1qYsxdfkcwhO8ZZLm';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

////////////////////////////////////////////////////////////////////////////////////
// PROPER VERSION WITH JWT
////////////////////////////////////////////////////////////////////////////////////

// var data = {
//     id: 10,
//     name: 'Koosie'
// };

// var token = jwt.sign(data, '123abc');
// var decoded = jwt.verify(token, '123abc');

// console.log(token);
// console.log('Decoded: ', decoded);

////////////////////////////////////////////////////////////////////////////////////
// MANUAL VERSION WITH CRYPTO-JS
////////////////////////////////////////////////////////////////////////////////////
// var message = 'I am some random string';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'some secret').toString()
// };

// var resultHash = SHA256(JSON.stringify(token.data) + 'some secret').toString();

// Middleman inteference
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was compromised, dont trust it');
// }
