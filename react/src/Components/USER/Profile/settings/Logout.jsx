import { Box, Button, Divider } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({setSettings}) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={10}
        borderRadius={2}
        border={1}
        width={200}
        borderColor="blue"
      >
        <Box mt={2}>Are your sure</Box>
        <Box mt={5}>
          <Stack>
            <Divider />
            <Button onClick={() => logout()}>Yes</Button>
            <Divider sx={{ width: 200 }} />
            <Button
            onClick={()=>setSettings(false)}
            >No</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Logout;
