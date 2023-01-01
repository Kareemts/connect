import { Box, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { socketServer } from '../../../../socketIo/SocketIo';
import Online from './Online';
const socket = socketServer;

const LeftBar = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on('getUsers', (users) => {
      setOnlineUsers(users);
    });
  }, []);

  return (
    <Box flex="1" p="3" m={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position={'fixed'} width={200}>
        <Box
          sx={{
            padding: 1.5,
            borderRadius: 2,
            marginTop: 3,
            boxShadow: ' 0px 10px 37px -3px rgba(0,0,0,0.1)',
            height: 300,
            background: 'white',
          }}
        >
          <Typography
            display={'flex'}
            justifyContent="center"
            alignItems="center"
            fontWeight={300}
          >
            Online
          </Typography>
          <Divider />
          {onlineUsers.map((user, index) => {
            return <Online key={index} user={user} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default LeftBar;
