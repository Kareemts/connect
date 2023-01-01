import { AppBar, Badge, Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useEffect, useState } from 'react';
import { Icones, StyledToolbar } from './NavStyle';
import { useNavigate } from 'react-router-dom';
import SearchResult from './SearchResult';
import SearchIcon from '@mui/icons-material/Search';
import SocketIo, { socketServer } from '../../../socketIo/SocketIo';
import { axiosUrl } from '../../../axios/axiosInstance';

const Navbar = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;
  const socket = socketServer;
  const navigate = useNavigate();
  const [openSearch, setOpenSearch] = useState(false);
  const [notification, setNotification] = useState(false);
  const [messages, setMessages] = useState(false);
  const [refreshing, setRefreshing] = useState(null);

  useEffect(() => {
    socket.on('getNotification', (data) => {
      setRefreshing(data);
    });
    socket.on('getMessage', (data) => {
      setRefreshing(data);
    });
  }, [socket]);

  useEffect(() => {
    axiosUrl
      .get('/getNotification', {
        params: {
          userId,
        },
      })
      .then((result) => {
        setNotification(result.data.notification);
        setMessages(result.data.messages);
      })
      .catch((err) => {});

    return () => {};
  }, [refreshing, userId]);

  const getNotification = () => {
    axiosUrl
      .get('notificationStatus', {
        params: {
          userId,
        },
      })
      .then((result) => {
        setNotification(false);
      })
      .catch((err) => {});
  };

  const getMessage = () => {
    axiosUrl
      .get('messageStatus', {
        params: {
          userId,
        },
      })
      .then((result) => {
        setMessages(false);
      })
      .catch((err) => {});
  };
  return (
    <Box>
      <AppBar position="fixed" sx={{ backgroundColor: '#FAFAFA' }}>
        <StyledToolbar>
          <Typography
            variant="h6"
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: 'black',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/Home')}
          >
            Connect
          </Typography>
          <Box
            sx={{ display: { xs: 'block', sm: 'none', cursor: 'pointer' } }}
            onClick={() => navigate('/Home')}
          >
            <Box display={'flex'} justifyContent="center" alignItems={'center'}>
              <img width="30" src="../../../../images/LargePng.png" alt="" />
              <Typography variant="h6" sx={{ color: 'black' }}>
                Connect
              </Typography>
            </Box>
          </Box>

          <Icones>
            <Box
              p
              display={'flex'}
              width={'150px'}
              height={'20px'}
              sx={{
                backgroundColor: '#e2e2e2',
                border: 1,
                borderRadius: 2,
                cursor: 'pointer',
              }}
              onClick={() => setOpenSearch(true)}
            >
              <SearchIcon sx={{ color: '#199FF7' }} />
              <Typography ml={3} color={'#ada6a6'}>
                Search...
              </Typography>
            </Box>

            <HomeIcon
              sx={{
                color: 'black',
                cursor: 'pointer',
                '&:hover': {
                  color: '#199FF7',
                  transform: 'translate(3)',
                  scale: '1.2',
                },
              }}
              onClick={() => navigate('/Home')}
            />
            {messages ? (
              <Badge badgeContent={''} variant="dot" color="error">
                <QuestionAnswerIcon
                  sx={{
                    color: 'black',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#199FF7',
                      transform: 'translate(3)',
                      scale: '1.2',
                    },
                  }}
                  onClick={() => {
                    getMessage();
                    navigate('/Chat');
                    setMessages(false);
                  }}
                />
              </Badge>
            ) : (
              <QuestionAnswerIcon
                sx={{
                  color: 'black',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#199FF7',
                    transform: 'translate(3)',
                    scale: '1.2',
                  },
                }}
                onClick={() => {
                  getMessage();
                  navigate('/Chat');
                  setMessages(false);
                }}
              />
            )}

            {notification ? (
              <Badge badgeContent={''} variant="dot" color="error">
                <NotificationsActiveIcon
                  sx={{
                    color: 'black',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#199FF7',
                      transform: 'translate(3)',
                      scale: '1.2',
                    },
                  }}
                  onClick={() => {
                    getNotification();
                    navigate('/Notification');
                    setNotification(false);
                  }}
                />
              </Badge>
            ) : (
              <NotificationsActiveIcon
                sx={{
                  color: 'black',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#199FF7',
                    transform: 'translate(3)',
                    scale: '1.2',
                  },
                }}
                onClick={() => {
                  getNotification();
                  navigate('/Notification');
                  setNotification(false);
                }}
              />
            )}
            <PersonIcon
              sx={{
                color: 'black',
                cursor: 'pointer',
                '&:hover': {
                  color: '#199FF7',
                  transform: 'translate(3)',
                  scale: '1.2',
                },
              }}
              onClick={() => navigate('/Profile')}
            />
          </Icones>
        </StyledToolbar>
      </AppBar>
      <SocketIo />
      <SearchResult openSearch={openSearch} setOpenSearch={setOpenSearch} />
    </Box>
  );
};

export default Navbar;
