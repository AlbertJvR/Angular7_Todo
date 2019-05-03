const express = require('express');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const {mongoose} = require('../db/mongoose');
const {User} = require('../models/user');

module.exports = function(io) {
  const userRouter = express.Router();

  userRouter.post('/', async (req, res) => {
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

  userRouter.get('/me', (req, res) => {
    res.send(req.user);
  });

  userRouter.delete('/me/token', async (req, res) => {
    try {
      await req.user.removeToken(req.token);
      res.status(200).send();
    } catch (error) {
      res.status(400).send();
    }
  });

  userRouter.post('/login', async (req, res) => {
    try {
      var credentials = _.pick(req.body, ['email', 'password']);
      const user = await User.findByCredentials(credentials.email, credentials.password);
      const token = await user.generateAuthToken();
      res.header('x-auth', token).send(user);
    } catch (error) {
      res.status(401).send(error);
    }
  });

  return userRouter;
};
