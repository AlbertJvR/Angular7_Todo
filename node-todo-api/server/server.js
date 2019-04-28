require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT;

const todoRouter = require('./routes/todo.routes')(io);
const userRouter = require('./routes/user.routes');

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
