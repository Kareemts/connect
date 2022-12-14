import { Box, Divider, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { socketServer } from '../../../socketIo/SocketIo';

const DashboardComponent = () => {
  const socket = useRef();
  socket.current = socketServer;

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalPosts, setTotalPosts] = useState(null);
  useEffect(() => {
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(users);
      console.log(users);
    });
    axios
      .get('/admin/dashboardData')
      .then((result) => {
        setTotalUsers(result.data.user);
        setTotalPosts(result.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box>
      <Box  display={'flex'} pt={10} justifyContent={'center'}>
        <Typography variant={'h4'} >Dashboard</Typography>
      </Box>
      <Box display={'flex'} pt={5} justifyContent={'center'}>
        <Divider />
        <Box
          m
          sx={{
            width: 200,
            borderRadius: 2,
            height: 100,
            boxShadow: 2,
          }}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h6'}>Totoal Users</Typography>
          <Divider />
          <Box>{totalUsers}</Box>
        </Box>
        <Box
          m
          sx={{
            width: 200,
            borderRadius: 2,
            height: 100,
            boxShadow: 2,
          }}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h6'}>Totoal Posts</Typography>
          <Divider />
          <Box>{totalPosts}</Box>
        </Box>
        <Box
          m
          sx={{
            width: 200,
            borderRadius: 2,
            height: 100,
            boxShadow: 2,
          }}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h6'}>Online Users </Typography>
          <Divider />
          <Box>{onlineUsers?.length}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardComponent;
