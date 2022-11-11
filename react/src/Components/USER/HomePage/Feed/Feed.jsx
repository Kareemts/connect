import { Box } from '@mui/system';
import React from 'react';
import Post from './Post';

const Feed = () => {
  return (
    <Box flex="3" p="5">
      <Post />
    </Box>
  );
};

export default Feed;
