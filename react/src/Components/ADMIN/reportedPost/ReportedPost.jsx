import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ReportPosrComponent from './ReportPosrComponent';

const ReportedPost = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get('/admin/getReportedPosts')
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => {});

    return () => {};
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant={'h6'}>Reported Post</Typography>
      </Box>
      {posts.map((post, index) => {
        return (
          <ReportPosrComponent  key={index} post={post} />
        );
      })}
    </Box>
  );
};

export default ReportedPost;
