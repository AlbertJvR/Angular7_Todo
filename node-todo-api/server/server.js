require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then((doc) => {
            const newTodo = {
                id: doc._id,
                text: doc.text,
                completed: false,
                completedAt: doc.completedAt
            };

            res.send(newTodo);
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

app.get('/todos', (req, res) => {
    Todo.find({})
        .then((todos) => {
            const temp = todos.map((todoItem) => {
                const newTodo = {
                    id: todoItem._id,
                    text: todoItem.text,
                    completed: todoItem.completed,
                    completedAt: todoItem.completedAt
                };

                return newTodo;
            })
            res.send(temp);
        }, (err) => {
            res.status(400).send(err);
        });
});

app.get('/todos/:id', (req, res) => {
    var todoId = req.params.id;

    if (!ObjectID.isValid(todoId)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: todoId
    })
    .then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        const date = new Date(todo.completedAt);
        const completedAtFormatted = todo.completedAt ? date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() : '';

        const newTodo = {
            id: todo._id,
            text: todo.text,
            completed: todo.completed,
            completedAt: completedAtFormatted
        };

        res.send(newTodo);
    })
    .catch((err) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const todoId = req.params.id;

        if (!ObjectID.isValid(todoId)) {
            return res.status(404).send();
        }

        const todo = await Todo.findOneAndRemove({
                _id: todoId
            });

        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});

    } catch (error) {
        res.status(400).send(error);
    }
});

app.patch('/todos/:id', (req, res) => {
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
        _id: id
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

app.get('/users/me', (req, res) => {
    res.send(req.user);
});

app.delete('/users/me/token', async (req, res) => {
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
