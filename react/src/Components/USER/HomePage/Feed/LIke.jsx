import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box } from '@mui/system';
import { axiosUrl } from '../../../../axios/axiosInstance';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { socketServer } from '../../../../socketIo/SocketIo';
//taking userId from browserStorage
const userData = JSON.parse(localStorage.getItem('userData'));
const userId = userData?.user.id;

const timeStamp = new Date();
const hours = timeStamp.getHours() % 12 || 12;
const date =
  hours + ':' + timeStamp.getMinutes() + ', ' + timeStamp.toDateString();

const LIke = ({ post, setLiked }) => {
  const socket = socketServer;
  const [like, setLike] = useState(null);
  const [unlike, setUnlike] = useState(null);
  const [changeLike, setChangeLike] = useState(false);

  useEffect(() => {
    return () => {};
  }, [unlike, like]);

  const likePost = (postId, postedUserId) => {
    setChangeLike(true);
    socket.emit('sendNotification', {
      postedUserId,
    });
    axiosUrl
      .put('/likePost', {
        postId,
        userId,
        date,
        timeStamp,
        postedUserId,
      })
      .then((result) => {
        setLike(result.data);
        setLiked(Math.random());
      })
      .catch((err) => {
        alert(err.message);
      });

    socket.emit('sendNotification', {
      receverId: postedUserId,
    });
  };

  //for unlikeing post

  const unlikePost = (postId, postedUserId) => {
    setChangeLike(false);
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
      {post.likes.includes(userId) || changeLike ? (
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
