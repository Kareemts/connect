// const io = require('socket.io')(8080, {
//     cors: {
//       origin: 'http://localhost:3000',
//     },
//   });
  
//   let onlineUsers = [];
//   let users = [];
  
//   const addOnlineUsers = (userId, socketId) => {
//     !onlineUsers.find((user) => user.userId === userId) &&
//       onlineUsers.push({ userId, socketId });
//   };
  
//   const addUser = (userId, socketId) => {
//     !users.find((user) => user.userId === userId) &&
//       users.push({ userId, socketId });
//   };
  
//   const removeUser = (socketId) => {
//     users = onlineUsers.filter((user) => user.socketId !== socketId);
//   };
  
//   // find the user for pushing message
//   const getUser = (userId) => {
//     return users.find((user) => user?.userId === userId?.connectionId);
//   };
  
//   // const getUserData = (userId) => {
//   //   return onlineUsers.find((user) => user?.userId === userId);
//   // };
  
//   io.on('connection', (socket) => {
//     // take use id and socket from user
//     socket.on('addUser', (userId) => {
//       addUser(userId, socket.id);
//       addOnlineUsers(userId, socket.id);
//       io.emit('getUsers', onlineUsers);
//       console.log(onlineUsers);
//     });
  
//     //send and get message
//     socket.on('sendMessage', ({ senderId, receverId, message }) => {
//       const user = getUser(receverId);
//       console.log(users);
//       io.to(user?.socketId).emit('getMessage', {
//         senderId,
//         message,
//       });
//     });
  
//     //send and get notifications
//     socket.on('sendNotification', (data) => {
//       console.log(data);
//       console.log('onlineUsers8888888888888888', onlineUsers);
//       const user = onlineUsers.find((user) => user.userId === data.receverId);
  
//       console.log('user', user);
//       if (user) {
//         io.to(user.socketId).emit('getNotification', data);
//       }
//     });
  
//     //for disconnect
//     socket.on('disconnect', () => {
//       console.log('a user disconnected');
//       removeUser(socket.id);
//       io.emit('getUsers', users);
//     });
//   });


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

  



  