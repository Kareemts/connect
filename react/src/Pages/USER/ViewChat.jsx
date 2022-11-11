import { Box } from '@mui/system';
import React from 'react';
import Chat from '../../Components/USER/Chat/Chat';
import ViewNavbar from './ViewNavbar';
import ViewNavbarMobile from './ViewNavbarMobile';

const ViewChat = () => {
  return (
    <Box>
      <ViewNavbar />
      <Chat />
      <ViewNavbarMobile />
    </Box>
  );
};

export default ViewChat;
