const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT'],
  },
});

let users = [];

const addOnlineUsers = (userId, socketId) => {
  !users.find((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user?.userId === userId);
};

io.on('connection', (socket) => {
  console.log('socket server connected');

  socket.on('addUser', (userId) => {
    addOnlineUsers(userId, socket.id);
    socket.emit('getUsers', users);
    console.log(users);
  });

  socket.on('sendMessage', (senderId) => {
    console.log('senderId', senderId.connectionId.connectionId);
    const user = getUser(senderId.connectionId.connectionId);
    console.log('user', user);
    socket.to(user?.socketId).emit('getMessage', { data: Math.random() });
  });

  socket.on('sendNotification', (senderId) => {
    console.log('senderId', senderId);
    const user = getUser(senderId.receverId);
    console.log('user', user);
    socket.to(user?.socketId).emit('getNotification', { data: Math.random() });
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
    removeUser(socket.id);
    socket.emit('getUsers', users);
  });
});

server.listen(8080, () => {
  console.log('server listening on');
});
