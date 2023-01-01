import { Avatar, Badge, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { format } from 'timeago.js';
import { axiosUrl } from '../../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './chat.css';

const ChatingFriends = ({ chat, setChatId }) => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  const [conversationUser, setConversationUser] = useState(null);

  const connectionId = chat.chatingId.find((id) => id !== userId);

  useEffect(() => {
    const chatingId = chat.chatingId.find((id) => id !== userId);

    axiosUrl
      .get('/getConversationUserData', {
        params: {
          chatingId,
        },
      })
      .then((result) => {
        if (result.data.error) navigate('/error');
        setConversationUser(result.data);
      })
      .catch((err) => {
        navigate('/error');
      });

    return () => {};
  }, [chat.chatingId, userId, navigate]);

  const message = () => {
    setChatId(chat._id);
    const name = conversationUser?.name.replaceAll(' ', '_');

    axiosUrl
      .get('newMessageStatus', {
        params: {
          userId,
          connectionId,
        },
      })
      .then((result) => {
        navigate(`/chat/${name}`, {
          state: { connectionId },
        });
      })
      .catch((err) => {});
  };

  const position = chat.chat.length - 1;
  return (
    <Box p display={'flex'} justifyContent="space-between" alignItems="center">
      <Box display={'flex'} alignItems="center">
        <Avatar
          src={`/images/profileImages/${conversationUser?.profileImage}`}
          alt={chat.firstName}
          sx={{
            width: { xs: '2rem' },
            height: { xs: '2rem' },
            cursor: 'pointer',
          }}
          onClick={message}
          aria-label="recipe"
        ></Avatar>
        <Box>
          <Box component={'div'} sx={{ cursor: 'pointer' }} onClick={message}>
            <Typography ml>{conversationUser?.name}</Typography>
          </Box>
          <Box
            sx={{ overflowX: 'scroll', maxWidth: 100 }}
            className={'showMessage'}
          >
            {chat?.messages ? (
              <Typography
                fontSize={14}
                color={'#199FF7'}
                fontWeight={'bolder'}
                ml
              >
                {chat.chat[position].message}
              </Typography>
            ) : (
              <Typography fontSize={12} ml>
                {chat.chat[position].message}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Box m>
        <Box display={'flex'} flexDirection={'column'}>
          {/* <Badge badgeContent={4} color="error"></Badge> */}
          <Box>
            <Typography mt={1} sx={{ fontSize: '1.5vh', color: '#8E8E8E' }}>
              {format(chat.chat[position].timestamp)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatingFriends;
