import { Avatar, Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { axiosUrl } from '../../../../axios/axiosInstance';

const Suggetions = ({ user }) => {
  const [connection, setConnection] = useState(false);

  const timeStamp = new Date();
  const hours = timeStamp.getHours() % 12 || 12;
  const date =
    hours + ':' + timeStamp.getMinutes() + ', ' + timeStamp.toDateString();

  //taking userId from browserStorage
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  const connect = (connectedId) => {
    axiosUrl
      .post('/connect', {
        connectedId,
        userId,
        date,
        timeStamp,
      })
      .then((result) => {
        console.log(result);
        setConnection(true);
      })
      .catch((err) => {});
  };
  return (
    <Box
      m
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'space-around',
      }}
      key={user._id}
    >
      <Box
        m
        display={'flex'}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display={'flex'} justifyContent="center" alignItems="center">
          <Avatar alt="Remy Sharp" src="" />
          <Typography m>{user.firstName + ' ' + user.lastName}</Typography>
        </Box>
        {connection ? (
          <Button
            sx={{
              borderRadius: '10px',
              fontSize: '10px',
              color: 'black',
            }}
          >
            Connected
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              borderRadius: '10px',
              fontSize: '10px',
              '&:hover': {
                color: 'black',
                transform: 'translate(1)',
                scale: '1.2',
              },
            }}
            onClick={() => connect(user._id)}
          >
            Connect
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Suggetions;
