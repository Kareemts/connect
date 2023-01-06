import { useEffect } from 'react';
import { io } from 'socket.io-client';
export const socketServer = io.connect('http://localhost:8080');

const SocketIo = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  useEffect(() => {
    socketServer.emit('addUser', userId);
  }, [userId]);
};

export default SocketIo;
