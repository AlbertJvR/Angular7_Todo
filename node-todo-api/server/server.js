require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middelware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save()
        .then((doc) => {
            res.send(doc);
        }, (err) => {
            res.status(400).send(err);
        });
});

app.post('/users', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);

        await user.save();
        const token = await user.generateAuthToken();

        // when you prefix header with "x-", you create a custom header not necessarily
        // supported by http
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
            _creator: req.user._id
        })
        .then((todos) => {
            res.send({
                todos
            });
        }, (err) => {
            res.status(400).send(err);
        });
});

app.get('/todos/:id', authenticate, (req, res) => {
    var todoId = req.params.id;

    if (!ObjectID.isValid(todoId)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: todoId,
        _creator: req.user._id
    })
    .then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    })
    .catch((err) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', authenticate, async (req, res) => {
    try {
        const todoId = req.params.id;

        if (!ObjectID.isValid(todoId)) {
            return res.status(404).send();
        }

        const todo = await Todo.findOneAndRemove({
                _id: todoId,
                _creator: req.user._id
            });

        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});

    } catch (error) {
        res.status(400).send(error);
    }
});

app.patch('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, 
    {$set: body}, 
    {new: true})
        .then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({todo});
        })
        .catch((err) => {
            res.status(400).send();
        });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (error) {
        res.status(400).send();
    }
});

app.post('/users/login', async (req, res) => {
    try {
        var credentials = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(credentials.email, credentials.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(401).send(error);
    }
});
    
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};
