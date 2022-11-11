import { Box } from '@mui/material';
import React from 'react';
import Notification from '../../Components/USER/Notification/Notification';
import ViewNavbar from './ViewNavbar';
import ViewNavbarMobile from './ViewNavbarMobile';

const ViewNotification = () => {
  return (
    <Box mt={10}>
      <ViewNavbar />
      <Notification />
      <ViewNavbarMobile />
    </Box>
  );
};

export default ViewNotification;
