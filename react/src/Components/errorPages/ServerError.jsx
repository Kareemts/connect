import { Box, Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const ServerError = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box display={'flex'} justifyContent="center" alignItems={'center'}>
        <Stack>
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_gs9xrxtb.json"
            background="transparent"
            speed="1"
            style={{ width: '500px', height: '500px' }}
            loop
            autoplay
          ></lottie-player>

          <Box m display={'flex'} justifyContent="center">
            <Button variant="contained" onClick={() => navigate('/')}>
              back to home
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ServerError;
