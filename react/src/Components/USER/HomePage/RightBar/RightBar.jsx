import {
  Box,
  Button,
  Card,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { axiosUrl } from '../../../../axios/axiosInstance';
import Suggetions from './Suggetions';

const RightBar = () => {
  //taking userId from browserStorage
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  const [suggestions, setSuggestions] = useState([]);



  useEffect(() => {
    axiosUrl
      .get('/suggestions', {
        params: {
          userId,
        },
      })
      .then((result) => {
        setTimeout(() => setSuggestions(result.data), 1000);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });

  }, [userId]);

  return (
    <Box flex="2" p="3" m={5} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position={'fixed'}>
        <Card
          sx={{
            width: 300,
            padding: 1.5,
            marginTop: 3,
            borderRadius: 2,
            boxShadow: ' 0px 10px 37px -3px rgba(0,0,0,0.1)',
            height: 300,
          }}
        >
          <Box display={'flex'} justifyContent="space-between">
            <Typography fontWeight={300}>Suggestions For You</Typography>
            <Button sx={{ borderRadius: '10px', fontSize: '10px' }}></Button>
          </Box>
          <Divider />
          {suggestions ? (
            suggestions?.map((user) => {
              const friend = user?.followers?.map(
                (follower) => follower?.followerId === userId
              );
              return <Suggetions key={user._id} friend={friend} user={user} />;
            })
          ) : (
            <Stack spacing={1}>
              
              <Box pr pt display={'flex'} alignItems="center">
                <Skeleton
                  sx={{ marginRight: 2 }}
                  variant="circular"
                  width={40}
                  height={40}
                />
                <Skeleton variant="rounded" width={210} height={20} />
              </Box>
              <Box pr display={'flex'} alignItems="center">
                <Skeleton
                  sx={{ marginRight: 2 }}
                  variant="circular"
                  width={40}
                  height={40}
                />
                <Skeleton variant="rounded" width={210} height={20} />
              </Box>
              <Box pr display={'flex'} alignItems="center">
                <Skeleton
                  sx={{ marginRight: 2 }}
                  variant="circular"
                  width={40}
                  height={40}
                />
                <Skeleton variant="rounded" width={210} height={20} />
              </Box>
            </Stack>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default RightBar;
