import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { axiosUrl } from '../../../axios/axiosInstance';

const Notification = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  const [notifications, setNotifications] = useState([]);

  const newdata = notifications.sort((a, b) => b.time - a.time);

  const [noNotification, setNoNotifications] = useState(false);

  useEffect(() => {
    axiosUrl
      .get('/notifications', {
        params: {
          userId,
        },
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.length <= 0) {
          setNoNotifications(true);
        } else {
          setNotifications(result.data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });

    return () => {};
  }, [userId]);

  return (
    <Box>
      <Container component="main" maxWidth="sm" flex={3}>
        <Box
          display={'flex'}
          p
          mb={2}
          justifyContent="center"
          sx={{
            boxShadow: ' 0px 10px 37px -3px rgba(0,0,0,0.1)',
            borderRadius: 5,
          }}
          fontWeight="bold"
          bgcolor={'white'}
        >
          NOTIFICATION
        </Box>

        {noNotification ? (
          <Box
            sx={{ fontSize: { xs: 30 } }}
            fontWeight={'bold'}
            fontSize={30}
            pt={20}
            display={'flex'}
            justifyContent={'center'}
          >
            No Notifications
          </Box>
        ) : (
          ''
        )}
        {/* <Box
          bgcolor={'white'}
          display={'flex'}
          alignItems="center"
          p
          mb={2}
          justifyContent="space-evenly"
          sx={{
            boxShadow: ' 0px 10px 37px -3px rgba(0,0,0,0.1)',
            borderRadius: 2,
          }}
        >
          <Typography> Friend Requtes (2)</Typography>
          <Button>See All</Button>
        </Box> */}
        {newdata?.map((data, index) => {
          return (
            <Box
              key={index}
              bgcolor={'white'}
              sx={{
                boxShadow: ' 0px 10px 37px -3px rgba(0,0,0,0.1)',
                borderRadius: 2,
              }}
              mb={1}
            >
              <Box display={'flex'} pl={2}>
                <Box display={'flex'} alignItems="center">
                  <CardMedia
                    component="img"
                    sx={{
                      borderRadius: 100,
                      width: { xs: '3rem' },
                      height: { xs: '3rem' },
                    }}
                    src={`/images/profileImages/${data.profileImage}`}
                    alt="green iguana"
                  />
                  <Box m>
                    <Typography sx={{ fontSize: { xs: 13, sm: 15 } }}>
                      {data.firstName + ' ' + data.lastName}
                    </Typography>
                    <Typography
                      sx={{
                        wordWrap: 'break-word',
                        minWidth: { xs: 160, md: 300 },
                        fontSize: { xs: 11, sm: 12 },
                        maxWidth: 100,
                      }}
                      fontSize={'13px'}
                    >
                      {data.message}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 8, sm: 9 } }}>
                      {data.time}
                    </Typography>
                  </Box>
                </Box>
                <Box m display={'flex'} alignItems="center">
                  {data.message === 'You have new follower' ? (
                    <Button
                      sx={{
                        borderRadius: '10px',
                        fontSize: { xs: 8, sm: 10 },
                        color: 'black',
                        backgroundColor: '#C8C8C8',
                      }}
                    >
                      remove
                    </Button>
                  ) : (
                    <Grid xs={1}>
                      <Card
                        sx={{
                          minWidth: { xs: 40, sm: 70 },
                          maxWidth: { xs: 40, sm: 70 },
                          margin: '5px',
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            src={`/images/potImages/${data.imageName}`}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
};

export default Notification;
