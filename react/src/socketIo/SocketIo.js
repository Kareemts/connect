import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const socketServer = io('ws://localhost:8080');


const SocketIo = () => {
  const socket = useRef();
  socket.current = io('ws://localhost:8080');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  useEffect(() => {
    socket.current.emit('addUser', userId);
  }, [userId]);
};

export default SocketIo;
