import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box } from '@mui/system';
import { axiosUrl } from '../../../../axios/axiosInstance';
import FavoriteIcon from '@mui/icons-material/Favorite';

//taking userId from browserStorage
const userData = JSON.parse(localStorage.getItem('userData'));
const userId = userData?.user.id;

const timeStamp = new Date();
const hours = timeStamp.getHours() % 12 || 12;
const date =
  hours + ':' + timeStamp.getMinutes() + ', ' + timeStamp.toDateString();

const LIke = ({ post, setLiked }) => {
  const [like, setLike] = useState(null);
  const [unlike, setUnlike] = useState(null);

  useEffect(() => {
    return () => {};
  }, [unlike, like]);

  const likePost = (postId,postedUserId) => {
    axiosUrl
      .put('/likePost', {
        postId,
        userId,
        date,
        timeStamp,
        postedUserId
      })
      .then((result) => {
        setLike(result.data);
        setLiked(Math.random());
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //for unlikeing post

  const unlikePost = (postId, postedUserId) => {
    axiosUrl
      .put('/unlikePost', {
        postId,
        userId,
        postedUserId,
      })
      .then((result) => {
        setUnlike(result.data);
        setLiked(Math.random());
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Box>
      {post.likes.includes(userId) ? (
        <Box
          m
          component={'span'}
          onClick={() => unlikePost(post._id, post.userId._id)}
        >
          <FavoriteIcon
            sx={{
              color: 'red',
              cursor: 'pointer',
              '&:hover': {
                color: 'red',
                scale: '1.2',
              },
            }}
          />
        </Box>
      ) : (
        <Box
          m
          component={'span'}
          onClick={() => likePost(post._id, post.userId._id)}
        >
          <FavoriteBorderIcon
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: '#199FF7',
                scale: '1.2',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default LIke;
