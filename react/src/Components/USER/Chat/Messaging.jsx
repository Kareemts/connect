import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Divider, InputBase, Typography } from '@mui/material';
import { axiosUrl } from '../../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { format } from 'timeago.js';
import './chat.css';
import { socketServer } from '../../../socketIo/SocketIo';

const Messaging = ({
  connectionId,
  chatingUser,
  UserData,
  setRefresh,
  refresh,
}) => {
  const socket = socketServer;
  const navigate = useNavigate();
  const scrollRef = useRef();
  const timeStamp = new Date();
  const hours = timeStamp.getHours() % 12 || 12;
  const date =
    hours + ':' + timeStamp.getMinutes() + ', ' + timeStamp.toDateString();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;
  const [sentmessage, setSentMessage] = useState('');
  const [getmessages, setGettMessages] = useState([]);
  const [socketMsessage, setSocketMessage] = useState('');

  useEffect(() => {
    socket.on('getMessage', (data) => {
      setSocketMessage(data);
      setRefresh(data)
    });
  }, [ socket,setRefresh,refresh]);

  useEffect(() => {
    axiosUrl
      .get('/getMessages', {
        params: {
          userId,
          connectionId,
        },
      })
      .then((result) => {
        if (result?.data?.error) navigate('/error');
        setGettMessages(result?.data?.chat);
      })
      .catch((err) => {
        console.log(err);
        navigate('/error');
      });

    return () => {};
  }, [socketMsessage, refresh, userId, connectionId, navigate]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    return () => {};
  }, [getmessages, socketMsessage]);

  const sendMessage = () => {
    socket.emit('sendMessage', {
      userId,
      connectionId,
    });

    axiosUrl
      .post('/sendMessage', {
        connectionId,
        sentmessage,
        userId,
        date,
        timeStamp,
      })
      .then((result) => {
        if (result.data.error) navigate('/error');
        setSentMessage(result.data);
        setSentMessage('');
        setRefresh(Math.random());
      })
      .catch((err) => {
        navigate('/error');
      });
    setSentMessage('');
  };
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent="start"
        alignItems="center"
        p
        flex={2}
      >
        <Avatar
          src={`/images/profileImages/${chatingUser?.profieImage}`}
          alt={chatingUser?.name}
          sx={{
            width: { xs: '2rem' },
            height: { xs: '2rem' },
            cursor: 'pointer',
          }}
          // onClick={() => showConnectionProfile()}
          aria-label="recipe"
        ></Avatar>
        <Typography m fontWeight={'bold'}>
          {chatingUser?.name}
        </Typography>
      </Box>
      <Divider sx={{ display: { xs: 'none', sm: 'block' } }} />
      <Box height={370} sx={{ overflowY: 'scroll' }} className={'messaging'}>
        {getmessages?.map((message, index) => {
          return message.messagerId === userId ? (
            <Box
              key={index}
              display={'flex'}
              alignItems={'center'}
              ref={scrollRef}
            >
              <Avatar
                src={`/images/profileImages/${UserData?.profieImage}`}
                alt={chatingUser?.name}
                sx={{
                  width: { xs: '2rem' },
                  height: { xs: '2rem' },
                  cursor: 'pointer',
                }}
                // onClick={() => showConnectionProfile()}
                aria-label="recipe"
              ></Avatar>
              <Box
                m
                p={1}
                sx={{
                  backgroundColor: '#FAFAFA',
                  borderRadius: 3,
                  // minWidth: 100,
                  maxWidth: 400,
                }}
                //   display={'flex'}
                //   justifyContent="end"
              >
                <Box display={'flex'}>
                  <Typography sx={{ fontSize: 9, fontWeight: 'bold' }}>
                    {UserData?.name}
                  </Typography>
                  <Typography ml sx={{ fontSize: 9 }}>
                    {format(message?.timestamp)}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 12, wordWrap: 'break-word' }}>
                  {message?.message}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              key={index}
              display={'flex'}
              alignItems={'center'}
              ref={scrollRef}
            >
              <Avatar
                src={`/images/profileImages/${chatingUser?.profieImage}`}
                alt={chatingUser?.name}
                sx={{
                  width: { xs: '2rem' },
                  height: { xs: '2rem' },
                  cursor: 'pointer',
                }}
                // onClick={() => showConnectionProfile()}
                aria-label="recipe"
              ></Avatar>
              <Box
                m
                p={1}
                sx={{
                  backgroundColor: '#FAFA',
                  borderRadius: 3,
                  minWidth: 100,
                  maxWidth: 400,
                }}
              >
                {' '}
                <Box display={'flex'}>
                  <Typography sx={{ fontSize: 9, fontWeight: 'bold' }}>
                    {chatingUser?.name}
                  </Typography>
                  <Typography ml sx={{ fontSize: 10 }}>
                    {format(message?.timestamp)}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 10, wordWrap: 'break-word' }}>
                  {message.message}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Divider />
      <Box m display={'flex'}>
        {' '}
        <InputBase
          variant="standard"
          autoFocus
          multiline
          fullWidth
          placeholder="Type Message here..."
          size="small"
          value={sentmessage}
          onChange={(e) => setSentMessage(e.target.value)}
        />
        <Button onClick={sendMessage}>send</Button>
      </Box>
    </Box>
  );
};

export default Messaging;
