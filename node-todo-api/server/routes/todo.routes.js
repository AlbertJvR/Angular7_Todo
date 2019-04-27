const express = require('express');
const todoRouter = express.Router();
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const {mongoose} = require('../db/mongoose');
const {Todo} = require('../models/todo');

todoRouter.post('/', (req, res) => {
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

todoRouter.get('/', (req, res) => {
  Todo.find({})
    .then((todos) => {
      const temp = todos.map((todoItem) => {
        return {
          id: todoItem._id,
          text: todoItem.text,
          completed: todoItem.completed,
          completedAt: todoItem.completedAt
        };
      });
      res.send(temp);
    }, (err) => {
      res.status(400).send(err);
    });
});

todoRouter.get('/:id', (req, res) => {
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

todoRouter.delete('/:id', async (req, res) => {
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

todoRouter.patch('/:id', (req, res) => {
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

module.exports = todoRouter;
