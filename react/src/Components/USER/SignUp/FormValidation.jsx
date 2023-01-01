import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { Box } from '@mui/material';
import { Alert } from '@mui/material';

export const UserExist = () => {
  return (
    <Alert
      sx={{
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      severity="warning"
    >
      <Box> Email Id Or Mobile Number Already Exist</Box>
    </Alert>
  );
};

export const FormValid = () => {
    return (
      <Alert
        sx={{
          fontSize: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        severity="warning"
      >
        <Box>Please fill the form properly</Box>
      </Alert>
    );
  };



export const FirstName = () => {
  return (
    <Box color={'red'} display={'flex'}>
      <ErrorIcon sx={{ fontSize: 18 }} />
      <Box ml> Enter first name</Box>
    </Box>
  );
};

export const LastName = () => {
  return (
    <Box color={'red'} display={'flex'}>
      <ErrorIcon sx={{ fontSize: 18 }} />
      <Box ml> Enter LastName name</Box>
    </Box>
  );
};

export const EmailValid = () => {
  return (
    <Box color={'red'} display={'flex'}>
      <ErrorIcon sx={{ fontSize: 18 }} />
      <Box ml> Enter proper email </Box>
    </Box>
  );
};

export const MobileValid = () => {
  return (
    <Box color={'red'} display={'flex'}>
      <ErrorIcon sx={{ fontSize: 18 }} />
      <Box ml> Enter proper mobile number </Box>
    </Box>
  );
};

export const PasswordValid = () => {
  return (
    <Box color={'red'} display={'flex'}>
      <ErrorIcon sx={{ fontSize: 18 }} />
      <Box ml> Password must have 5 digit </Box>
    </Box>
  );
};

export const ConfirmasswordValid = () => {
  return (
    <Box color={'red'} display={'flex'}>
      <ErrorIcon sx={{ fontSize: 18 }} />
      <Box ml> Password not match </Box>
    </Box>
  );
};