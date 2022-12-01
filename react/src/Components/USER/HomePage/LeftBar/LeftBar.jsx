import { Avatar, Box, Card, Divider, Typography } from '@mui/material';
import React from 'react';

const LeftBar = () => {
  return (
    <Box flex="1" p="3" m={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position={'fixed'}>
        <Card
          sx={{
            padding: 1.5,
            borderRadius: 2,
            marginTop: 3,
            boxShadow: ' 0px 10px 37px -3px rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            display={'flex'}
            justifyContent="center"
            alignItems="center"
            fontWeight={300}
          >
            Online
          </Typography>
          <Divider />
          <Box
            m
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'space-around',
            }}
          >
            <Box m display={'flex'} justifyContent="center" alignItems="center">
              <Avatar alt="Remy Sharp" src="" />
              <Typography m>Name</Typography>
            </Box>
            <Box m display={'flex'} justifyContent="center" alignItems="center">
              <Avatar alt="Remy Sharp" src="" />
              <Typography m>Name</Typography>
            </Box>
            <Box m display={'flex'} justifyContent="center" alignItems="center">
              <Avatar alt="Remy Sharp" src="" />
              <Typography m>Name</Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default LeftBar;
