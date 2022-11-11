import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';

const Notification = () => {
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
        <Box
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
        </Box>
        <Box
          bgcolor={'white'}
          sx={{
            boxShadow: ' 0px 10px 37px -3px rgba(0,0,0,0.1)',
            borderRadius: 2,
          }}
          mb={1}
        >
          <Box display={'flex'} pl={2} justifyContent="space-between">
            <Box display={'flex'} alignItems="center">
              <Avatar />
              <Box m>
                <Typography>Name</Typography>
                <Typography
                  sx={{
                    wordWrap: 'break-word',
                    minWidth: { xs: 160, md: 300 },
                    maxWidth: 100,
                  }}
                  fontSize={'13px'}
                >
                  Liked your post
                </Typography>
                <Typography fontSize={'10px'}>31-10-2022</Typography>
              </Box>
            </Box>

            <Box m display={'flex'} alignItems="center">
              <Grid xs={1}>
                <Card sx={{ minWidth: 70, maxWidth: 70, margin: '5px' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="10%"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box
          bgcolor={'white'}
          sx={{
            boxShadow: ' 0px 10px 37px -3px rgba(0,0,0,0.1)',
            borderRadius: 2,
          }}
        >
          <Box display={'flex'} pl={2} justifyContent="space-between">
            <Box display={'flex'} alignItems="center">
              <Avatar />
              <Box m>
                <Typography>Name</Typography>
                <Typography
                  sx={{
                    wordWrap: 'break-word',
                    minWidth: { xs: 160, md: 300 },
                    maxWidth: 100,
                  }}
                  fontSize={'13px'}
                >
                  Liked your post
                </Typography>
                <Typography fontSize={'10px'}>31-10-2022</Typography>
              </Box>
            </Box>

            <Box m display={'flex'} alignItems="center">
              <Grid xs={1}>
                <Card sx={{ minWidth: 70, maxWidth: 70, margin: '5px' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="10%"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Notification;
