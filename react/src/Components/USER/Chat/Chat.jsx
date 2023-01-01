import { Container, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosUrl } from '../../../axios/axiosInstance';
import ChatingFriends from './ChatingFriends';
import Messaging from './Messaging';

const Chat = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  const navigate = useNavigate();
  const location = useLocation();
  const connectionId = location.state;

  const [chatingUser, setChatingUser] = useState(null);
  const [UserData, setUserData] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [refresh, setRefresh] = useState('');

  useEffect(() => {
    if (connectionId === null) setChatingUser(null);

    axiosUrl
      .get('/getChatingUser', {
        params: {
          connectionId,
          userId,
        },
      })
      .then((result) => {
        if (result.data.error) navigate('/error');
        setChats(result.data.chats);
        if (result.data.chatingData === null) {
          setChatingUser(null);
        } else {
          setChatingUser(result.data.chatingData);
          setUserData(result.data.UserData);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/error');
      });

    return () => {};
  }, [refresh, connectionId, navigate, userId, chatId]);

  return (
    <Box
      sx={{
        marginTop: {
          xs: 6,
          sm: 10,
        },
      }}
    >
      <Container component="main" maxWidth="md" flex={6}>
        <Box display={'flex'} justifyContent="center">
          <Box
            sx={{
              backgroundColor: {
                xs: 'F3F2EF',
                sm: 'white',
              },
              minHeight: 500,
              boxShadow: {
                xs: 'none',
                sm: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              },
              marginTop: {
                xs: 1,
                sm: 0,
              },
            }}
            borderRadius={2}
            flex={1.5}
          >
            <Box
              sx={{ display: { xs: 'none', sm: 'block' } }}
              display={'flex'}
              justifyContent="center"
              p
              flex={2}
            >
              <Typography fontWeight={'bold'}>Name</Typography>
            </Box>
            <Divider sx={{ display: { xs: 'none', sm: 'block' } }} />
            <Box p flex={2} borderRadius={2}>
              {chats?.map((chat, index) => {
                return (
                  <ChatingFriends
                    key={index}
                    chat={chat}
                    setChatId={setChatId}
                  />
                );
              })}
            </Box>
          </Box>
          {chatingUser === null ? (
            <Box
              p
              m
              flex={3}
              bgcolor={'white'}
              sx={{
                display: { xs: 'none', sm: 'block' },
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              }}
              borderRadius={5}
            >
              <Box
                display={'flex'}
                justifyContent="start"
                alignItems="center"
                p
                flex={2}
              ></Box>

              <Box
                height={370}
                display={'flex'}
                alignItems="center"
                justifyContent="center"
              >
                <Box fontWeight={'bold'}>Select a user and start chating</Box>
              </Box>
            </Box>
          ) : (
            <Box
              p
              m
              flex={3}
              bgcolor={'white'}
              sx={{
                display: { xs: 'none', sm: 'block' },
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              }}
              borderRadius={5}
            >
              <Messaging
                flex={3}
                chatingUser={chatingUser}
                UserData={UserData}
                connectionId={connectionId}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Chat;
