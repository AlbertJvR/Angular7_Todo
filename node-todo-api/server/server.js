require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const todoRouter = require('./routes/todo.routes');
const userRouter = require('./routes/user.routes');

const app = express();
const port = process.env.PORT;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/todos', todoRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
