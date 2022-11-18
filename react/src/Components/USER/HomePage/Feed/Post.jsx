import {
  Avatar,
  Card,
  CardMedia,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import { Box } from '@mui/system';
import { axiosUrl } from '../../../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

//date generation
const timeStamp = new Date();
const hours = timeStamp.getHours() % 12 || 12;
const date =
  hours + ':' + timeStamp.getMinutes() + ', ' + timeStamp.toDateString();

//taking userId from browserStorage
const userData = JSON.parse(localStorage.getItem('userData'));
const userId = userData?.user.id;

const Post = () => {
  const navigate = useNavigate();
  const [getPostes, setGetPostes] = useState(null);
  const [noPost, setNoPost] = useState(false);
  const [like, setLike] = useState(null);
  const [unlike, setUnlike] = useState(null);
  useEffect(() => {
    axiosUrl
      .get('/getPostes')
      .then((result) => {
        if (result.data.length <= 0) {
          setNoPost(true);
        } else if (result.data.userLogin === false) {
          // localStorage.removeItem('userData');
          // localStorage.removeItem('token');
          navigate('/');
        } else {
          setTimeout(() => setGetPostes(result.data), 200);
        }
        console.log(result.data);
      })
      .catch((err) => {});
    return () => {};
  }, [navigate, like,unlike]);

  //for likeing post
  
  const likePost = (postId) => {
    axiosUrl
      .put('/likePost', {
        postId,
        userId,
        date,
        timeStamp,
      })
      .then((result) => {
        setLike(result.data);
        console.log('likedDAta', result.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //for unlikeing post

  const unlikePost = (postId) => {
    axiosUrl
      .put('/unlikePost', {
        postId,
        userId,
      })
      .then((result) => {
        setUnlike(result.data);
        console.log('likedDAta', result.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Box>
      {noPost ? (
        <Card
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: { xs: 0, sm: 5 },
            padding: 0,
          }}
        >
          <Typography variant="h6">No Post Available</Typography>
        </Card>
      ) : (
        ''
      )}
      {getPostes == null ? (
        <Card
          sx={{
            marginTop: { xs: 0, sm: 3 },
            marginRight: 3,
            padding: 0,
            borderRadius: 2,
            boxShadow: {
              xs: 'none',
              sm: ' 0px 10px 37px -3px rgba(0,0,0,0.1)',
            },
            backgroundColor: { xs: '#f3f2ef', sm: 'white' },
          }}
        >
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
        </Card>
      ) : (
        <Box>
          {getPostes.map((post) => {
            return (
              <div key={post._id}>
                <Card
                  sx={{
                    marginTop: { xs: 0, sm: 3 },
                    marginRight: 3,
                    padding: 0,
                    borderRadius: 2,
                    boxShadow: {
                      xs: 'none',
                      sm: ' 0px 10px 37px -3px rgba(0,0,0,0.1)',
                    },
                    backgroundColor: { xs: '#f3f2ef', sm: 'white' },
                  }}
                >
                  <Box display={'flex'} alignItems="center">
                    <Avatar
                      sx={{ bgcolor: 'blue', margin: 2 }}
                      aria-label="recipe"
                    >
                      Ak
                    </Avatar>
                    <Box>
                      {post.userId.firstName + post.userId.lastName}
                      <Box>
                        <Typography
                          sx={{
                            fontSize: { xs: 10, sm: 12 },
                            color: '#8E8E8E',
                          }}
                        >
                          {post.time}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box ml={3} mb>
                    <Typography fontSize={15}>{post.postCaption}</Typography>
                  </Box>
                  <CardMedia
                    sx={{ borderRadius: 1 }}
                    component="img"
                    height="10%"
                    src={`images/potImages/${post.imageName}`}
                    alt="Paella dish"
                  />

                  <Box pl>
                    <Box
                      component={'div'}
                      sx={{ display: 'flex' }}
                      justifyContent="space-between"
                    >
                      <Box m ml={2} component={'span'}>
                        {post.likes.length} likes
                      </Box>
                      <Box m>{post.comments.length} comments</Box>
                      <Box m mr={3}>
                        share
                      </Box>
                    </Box>
                    <Divider />
                    <Box
                      component={'div'}
                      p
                      sx={{ display: 'flex' }}
                      justifyContent="space-between"
                    >
                      {post.likes.includes(userId) ? (
                        <Box
                          m
                          component={'span'}
                          onClick={() => unlikePost(post._id)}
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
                          onClick={() => likePost(post._id)}
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

                      <Box m>
                        <CommentIcon
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              color: '#199FF7',
                              scale: '1.2',
                            },
                          }}
                        />
                      </Box>
                      <Box m>
                        <SendIcon
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              color: '#199FF7',
                              scale: '1.2',
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Divider />
                </Card>
              </div>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Post;
