import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';

const userData = JSON.parse(localStorage.getItem('userData'));
const useId = userData.user.id;

const RightBar = () => {
  const [suggestions, setSuggestions] = useState(null);

  useEffect(() => {
    axios
      .get('/suggestions', {
        params: {
          useId,
        },
      })
      .then((result) => {
        setTimeout(() => setSuggestions(result.data), 1000);
      })
      .catch((err) => {
        alert(err.message);
      });
    return () => {};
  }, []);

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
          }}
        >
          <Box display={'flex'} justifyContent="space-between">
            <Typography fontWeight={300}>Suggestions For You</Typography>
            <Button sx={{ borderRadius: '10px', fontSize: '10px' }}>
              See All
            </Button>
          </Box>
          <Divider />
          {suggestions ? (
            suggestions.map((user) => {
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
                    <Box
                      display={'flex'}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Avatar alt="Remy Sharp" src="" />
                      <Typography m>
                        {user.firstName + ' ' + user.lastName}
                      </Typography>
                    </Box>
                    <Button sx={{ borderRadius: '10px', fontSize: '10px' }}>
                      Connect
                    </Button>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Stack spacing={1}>
              {/* For other variants, adjust the size with `width` and `height` */}
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
