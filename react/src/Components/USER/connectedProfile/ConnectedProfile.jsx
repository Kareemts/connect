import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosUrl } from '../../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ConnectedProfile = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const connectionId = location.state;

  const timeStamp = new Date();
  const hours = timeStamp.getHours() % 12 || 12;
  const date =
    hours + ':' + timeStamp.getMinutes() + ', ' + timeStamp.toDateString();

  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  const [connectedProfile, setConnectedProfile] = useState(null);

  console.log('connectedProfile', connectedProfile);

  const [connectedData, setConnectedData] = useState(null);

  const [connect, setConnect] = useState(false);

  //state for user uploaded posts

  const [Posts, setPosts] = useState([]);

  //state for user profie details
  const [noPost, setNopost] = useState(false);

  useEffect(() => {
    axiosUrl
      .get('/connectedProfile', {
        params: { connectionId },
      })
      .then((result) => {
        if (result.data.connectedUserPosts.length <= 0) {
          setConnectedProfile(result.data.connectedProfile);
          setNopost(true);
        } else {
          setConnectedProfile(result.data.connectedProfile);
          setPosts(result.data.connectedUserPosts);
        }
        result.data.connectedProfile?.followers.forEach((element) => {
          if (element.followerId === userId) setConnect(true);
        });
      })
      .catch((err) => {
        navigate('error');
      });

    return () => {};
  }, [connectionId, connectedData, userId]);

  const createConnection = () => {
    setConnect(true);
    axiosUrl
      .post('/connect', {
        connectedId: connectionId.connectionId,
        userId,
        date,
        timeStamp,
      })
      .then((result) => {
        setConnect(true);
        setConnectedData(result.data);
      })
      .catch((err) => {});
  };

  const removeConnection = () => {
    setConnect(false);
    axiosUrl
      .post('/removeConnection', {
        connectedId: connectionId.connectionId,
        userId,
      })
      .then((result) => {
        setConnect(false);
        setConnectedData(result.data);
      })
      .catch((err) => {});
  };

  const userName =
    connectedProfile?.firstName + '_' + connectedProfile?.lastName;
  const name = userName.replaceAll(' ', '_');

  const message = () => {
    const connectionId = connectedProfile?._id;
    alert(connectionId);
    navigate(`/chat/${name}`, {
      state: { connectionId },
    });
  };

  return (
    <Box>
      <Box
        mt={10}
        sx={{
          marginLeft: { xs: '10px', sm: '100px' },
          marginRight: { xs: '10px', sm: '100px' },
        }}
      >
        <Box
          display={'flex'}
          sx={{ justifyContent: 'center' }}
          alignItems={'center'}
          bgcolor={'white'}
          borderRadius={2}
          mb={2}
          p={2}
        >
          <Box
            component={'div'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent="center"
            alignItems={'center'}
            sx={{ marginRight: { xs: '0rem', sm: '1rem', md: '6rem' } }}
          >
            <Avatar
              src={`/images/profileImages/${connectedProfile?.profileImage}`}
              sx={{
                margin: 2,
                width: { xs: '4rem', sm: '5rem', md: '10rem' },
                height: { xs: '4rem', sm: '5rem', md: '10rem' },
                fontSize: { xs: '4rem', sm: '5rem', md: '10rem' },
              }}
              aria-label="recipe"
            ></Avatar>
          </Box>

          <Box m={1}>
            <Box display={'flex'} alignItems={'center'}>
              <Typography m sx={{ fontSize: { xs: '1rem', sm: '2rem' } }}>
                {connectedProfile?.firstName + ' ' + connectedProfile?.lastName}
              </Typography>
            </Box>
            <Box
              display={'flex'}
              justifyContent="space-between"
              alignItems={'center'}
            >
              <Box m>
                <Typography
                  sx={{
                    fontSize: { xs: '1.5vh', sm: '3vh' },
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>
                    <Typography fontWeight={900}>{Posts?.length}</Typography>
                  </span>{' '}
                  Post
                </Typography>
              </Box>
              <Box m>
                <Typography
                  //   onClick={() => setFollowers(true)}
                  sx={{
                    fontSize: { xs: '1.5vh', sm: '3vh' },
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>
                    <Typography fontWeight={900}>
                      {' '}
                      {connectedProfile?.followers.length}
                    </Typography>
                  </span>{' '}
                  Followers
                </Typography>
              </Box>
              <Box
                m
                //   onClick={() => setConnections(true)}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1.5vh', sm: '3vh' },
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>
                    <Typography fontWeight={900}>
                      {connectedProfile?.connections.length}
                    </Typography>
                  </span>{' '}
                  Connections
                </Typography>
              </Box>
            </Box>
            {connect ? (
              <Box>
                <Button
                  sx={{ color: 'black', borderColor: 'black', marginLeft: 1 }}
                  size="small"
                  variant="outlined"
                  onClick={() => removeConnection()}
                >
                  Remove
                </Button>
                <Button
                  sx={{ color: 'black', borderColor: 'black', marginLeft: 3 }}
                  size="small"
                  variant="outlined"
                  onClick={() => message()}
                >
                  Message
                </Button>
              </Box>
            ) : (
              <Button
                size="small"
                variant="contained"
                onClick={() => createConnection()}
              >
                Connect
              </Button>
            )}
          </Box>
        </Box>

        <Box
          bgcolor={'white'}
          mt
          borderRadius={2}
          pl={2}
          p={2}
          sx={{ minHeight: { xs: 350 } }}
        >
          <Box>
            {noPost ? (
              <Box
                m={10}
                display={'flex'}
                justifyContent={'center'}
                sx={{ fontSize: { xs: '1rem', sm: '1.5rem', md: '3rem' } }}
                fontWeight={'bolder'}
              >
                No Posts Availabile
              </Box>
            ) : (
              ''
            )}
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                {Posts.map((element, index) => {
                  return (
                    <Grid
                      key={index}
                      display={'flex'}
                      justifyContent="center"
                      xs={4}
                    >
                      <Card sx={{ maxWidth: 300, margin: '5px' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            sx={{
                              borderRadius: 1,
                              width: {
                                xs: '6rem',
                                sm: '10rem',
                                md: '15rem',
                                lg: '20rem',
                              },
                              height: {
                                xs: '6rem',
                                sm: '10rem',
                                md: '15rem',
                                lg: '20rem',
                              },
                            }}
                            src={`/images/potImages/${element.imageName}`}
                            alt="green iguana"
                            // onClick={() => openPost(element.imageName)}
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ConnectedProfile;
