import { Box } from '@mui/system';
import React from 'react';
import Post from './Post';
import { axiosUrl } from '../../../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Skeleton, Stack } from '@mui/material';

const Feed = () => {
  const navigate = useNavigate();

  //for take the all postfrom the server
  const [getPostes, setGetPostes] = useState([]);

  //if there is no post the active this state
  const [noPost, setNoPost] = useState(false);

  //for updating the component afrer like the post
  const [liked, setLiked] = useState('');

  //state for refreshing feed

  const [feed, setFeed] = useState(null);

  useEffect(() => {
    axiosUrl
      .get('/getPostes')
      .then((result) => {
        if (result.data.length <= 0) {
          setNoPost(true);
        } else if (result.data.userLogin === false) {
          localStorage.removeItem('userData');
          localStorage.removeItem('token');
          navigate('/');
        } else {
          setGetPostes(result.data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
    return () => {};
  }, [navigate, liked, feed]);

  return (
    <Box flex="3" p="5">
      {noPost ? (
        <Stack spacing={1}>
          {/* For other variants, adjust the size with `width` and `height` */}
          <Box p display={'flex'} alignItems="center">
            <Skeleton
              sx={{ margin: 2 }}
              variant="circular"
              width={40}
              height={40}
            />
            <Skeleton variant="rounded" width={210} height={20} />
          </Box>
          <Skeleton
            sx={{ borderRadius: 2 }}
            variant="rectangular"
            width="100%"
            height={300}
          />
          <Box p m={2}>
            <Skeleton
              sx={{ marginTop: 1 }}
              variant="rounded"
              width={210}
              height={20}
            />
            <Skeleton
              sx={{ marginTop: 1 }}
              variant="rounded"
              width={210}
              height={30}
            />
            <Skeleton
              sx={{ marginTop: 1 }}
              variant="rounded"
              width={210}
              height={40}
            />
          </Box>
        </Stack>
      ) : (
        ''
      )}
      {getPostes?.map((post) => (
        <Post
          key={post._id}
          post={post}
          setLiked={setLiked}
          setFeed={setFeed}
        />
      ))}
    </Box>
  );
};

export default Feed;
