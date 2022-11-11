import { Avatar, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Followers = () => {
  return (
    <Box>
      <Box
        m
        display={'flex'}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display={'flex'} justifyContent="center" alignItems="center">
          <Avatar alt="Remy Sharp" src="" />
          <Typography m>Name</Typography>
        </Box>
        <Button sx={{ borderRadius: '10px', fontSize: '10px' }}>Remove</Button>
      </Box>
      <Box
        m
        display={'flex'}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display={'flex'} justifyContent="center" alignItems="center">
          <Avatar alt="Remy Sharp" src="" />
          <Typography m>Name</Typography>
        </Box>
        <Button sx={{ borderRadius: '10px', fontSize: '10px' }}>Connect</Button>
      </Box>
      <Box
        m
        display={'flex'}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display={'flex'} justifyContent="center" alignItems="center">
          <Avatar alt="Remy Sharp" src="" />
          <Typography m>Name</Typography>
        </Box>
        <Button sx={{ borderRadius: '10px', fontSize: '10px' }}>Remove</Button>
      </Box>
    </Box>
  );
};

export default Followers;
