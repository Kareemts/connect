import { Box } from '@mui/system';
import React from 'react';
import Profile from '../../Components/USER/Profile/Profile';
import ViewNavbar from './ViewNavbar';
import ViewNavbarMobile from './ViewNavbarMobile';

const ViewProfile = () => {
  return (
    <Box>
      <ViewNavbar />
      <Profile />
      <ViewNavbarMobile />
    </Box>
  );
};

export default ViewProfile;
