const io = require('socket.io')(8080, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const onlineUsers = [];

const addOnlineUsers = (userId, socketId) => {
  !onlineUsers.find((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

io.on('connection', (socket) => {
  console.log('connected to socket server');

  // take userid and socket from user
  socket.on('addUser', (userId) => {
    addOnlineUsers(userId, socket.id);
    io.emit('getUsers', onlineUsers);
    console.log(onlineUsers);
  });

  socket.on('sendNotification', (data) => {
    console.log(data);
    console.log('onlineUsers8888888888888888', onlineUsers);
    const user = onlineUsers.find((user) => user.userId === data.receverId);

    // console.log('user', user);
    // if (user) {
    //   io.emit('getNotification', data);
    // }
  });
});
