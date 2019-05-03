const express = require('express');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const {mongoose} = require('../db/mongoose');
const {Todo} = require('../models/todo');

module.exports = function (io) {
  const todoRouter = express.Router();

  todoRouter.post('/', async (req, res) => {
    try {
      const todo = new Todo({
        text: req.body.text
      });

      const savedTodo = await todo.save();

      const newTodo = {
        id: savedTodo._id,
        text: savedTodo.text,
        completed: false,
        completedAt: savedTodo.completedAt
      };

      io.sockets.emit('todoCreated', newTodo);

      res.send(newTodo);
    } catch (error) {
      return res.status(400).send(error);
    }
  });

  todoRouter.get('/', async (req, res) => {
    const todos = await Todo.find({})
      .catch((error) => {
        return res.status(400).send(error);
      });

    const temp = todos.map((todoItem) => {
      return {
        id: todoItem._id,
        text: todoItem.text,
        completed: todoItem.completed,
        completedAt: todoItem.completedAt
      };
    });
    res.send(temp);
  });

  todoRouter.get('/:id', async (req, res) => {
    const todoId = req.params.id;

    if (!ObjectID.isValid(todoId)) {
      return res.status(404).send();
    }

    const todo = await Todo.findOne({
      _id: todoId
    })
      .catch((error) => {
        return res.status(400).send(error);
      });

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

      io.sockets.emit('todoDeleted', todo);

      res.send({todo});

    } catch (error) {
      res.status(400).send(error);
    }
  });

  todoRouter.patch('/:id', async (req, res) => {
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

    const todo = await Todo.findOneAndUpdate({
        _id: id
      },
      {$set: body},
      {new: true})
      .catch((error) => {
        return res.status(400).send(error);
      });

    if (!todo) {
      return res.status(404).send();
    }

    io.sockets.emit('todoUpdated', todo);

    res.send({todo});
  });

  return todoRouter;
};
