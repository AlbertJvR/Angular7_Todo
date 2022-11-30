const {config} = require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = config.port;

io.on('connection', socket => {
  console.log('New rando connected');

  socket.on('todoCreated', (todo) => {
    io.sockets.emit('todoCreated', todo);
    console.log('[TODO] Created');
  });

  socket.on('todoUpdated', (todo) => {
    io.sockets.emit('todoUpdated', todo);
  });

  socket.on('todoDeleted', (todo) => {
    io.sockets.emit('todoDeleted', todo);
  });

  socket.on('disconnect', () => {
    console.log('Tardation disconnected');
  });
});

const todoRouter = require('./routes/todo.routes')(io);
const userRouter = require('./routes/user.routes')(io);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/todos', todoRouter);
app.use('/users', userRouter);

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
