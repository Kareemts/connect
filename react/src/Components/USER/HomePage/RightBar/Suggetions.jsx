import { Avatar, Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { axiosUrl } from '../../../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Suggetions = ({ user, friend }) => {
  const navigate = useNavigate();

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
        setConnection(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userName = user.firstName + '_' + user.lastName;
  const name = userName.replaceAll(' ', '_');

  const showConnectionProfile = () => {
    const connectionId = user._id;
    navigate(`/user/${name}`, {
      state: { connectionId },
    });
  };

  return (
    <Box>
      {!friend[0] ? (
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
            <Box
              display={'flex'}
              justifyContent="center"
              alignItems="center"
              sx={{ cursor: 'pointer' }}
              component={'div'}
              onClick={() => showConnectionProfile()}
            >
              <Avatar
                alt={user.firstName}
                src={`/images/profileImages/${user.profileImage}`}
              />
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
      ) : (
        ''
      )}
    </Box>
  );
};

export default Suggetions;
