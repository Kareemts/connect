const io = require('socket.io')(8080, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// find the user for pushing message
const getUser = (userId) => {
  return users.find((user) => user.userId === userId.connectionId);
};

io.on('connection', (socket) => {
  // take use id and socket from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  //send and get message
  socket.on('sendMessage', ({ senderId, receverId, message }) => {
    const user = getUser(receverId);
    io.to(user?.socketId).emit('getMessage', {
      senderId,
      message,
    });
  });

  //for disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
