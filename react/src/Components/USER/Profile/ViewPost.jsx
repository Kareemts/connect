import styled from '@emotion/styled';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { format } from 'timeago.js';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { axiosUrl } from '../../../axios/axiosInstance';
import { useEffect } from 'react';
//modal style
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const ViewPost = ({
  viewPost,
  setViewPost,
  postData,
  postComments,
  setPostComments,
  setRefresh
}) => {


  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;
  const timeStamp = new Date();

  const [comment, setComment] = useState('');

  const [commentData, setCommntData] = useState(false);

  const [postAdded, setPostAdded] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axiosUrl
      .get('/getPostComments', {
        params: {
          postId: postData?._id,
        },
      })
      .then((result) => {
        setPostComments(result.data.reverse());
      })
      .catch((err) => {});

    return () => {};
  }, [postAdded, postData?._id, setPostComments]);

  const submit = () => {
    if (comment === '') {
      setCommntData(true);
    } else {
      axiosUrl
        .put('/addComment', {
          comment,
          userId,
          timeStamp,
          postId: postData?._id,
          postedUserId: postData?.userId,
        })
        .then((result) => {
          if (result.data.commentAdded) {
            setComment('');
            setPostAdded(Math.random());
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const deletePost = () => {
    axiosUrl.delete('/deletePost', {
      params: {
        postId: postData?._id,
      },
    }).then((result) => {
      setViewPost(false)
      setRefresh(Math.random())
    }).catch((err) => {
      
    });
  };

  return (
    <StyledModal open={viewPost} onClose={() => setViewPost(false)}>
      <Box
        width={700}
        height={500}
        bgcolor="black"
        borderRadius={1}
        sx={{
          border: 'none',
          outline: 'none',
        }}
        display={'flex'}
        alignItems={'center'}
      >
        <Box>
          <Card>
            <CardMedia
              component="img"
              sx={{
                borderRadius: 1,
                width: {
                  xs: '15rem',
                  sm: '20rem',
                },
                height: {
                  xs: '15rem',
                  sm: '20rem',
                },
              }}
              src={`/images/potImages/${postData?.imageName}`}
              alt="green iguana"
            />
          </Card>
        </Box>
        <Box
          sx={{
            borderRadius: 1,
            width: {
              xs: '15rem',
              sm: '30rem',
            },
            height: {
              xs: '15rem',
              sm: '31.2rem',
            },
          }}
          bgcolor="white"
        >
          <Box>
            <Box m display={'flex'} justifyContent={'space-between'}>
              <Typography>Comments</Typography>
              <Box>
                <IconButton aria-label="more" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={() => deletePost()}>Delete post</MenuItem>
                </Menu>
              </Box>
            </Box>
            <Divider />
            <Box height={300} sx={{ overflowY: 'scroll' }}>
              {postComments.map((comment) => {
                return (
                  <Box
                    key={comment.timeStamp}
                    display={'flex'}
                    alignItems={'center'}
                  >
                    <Avatar
                      src={`/images/profileImages/${comment?.profileImage}`}
                      alt={comment?.firstName}
                      sx={{
                        margin: 2,
                        width: { xs: '2rem' },
                        height: { xs: '2rem' },
                        cursor: 'pointer',
                      }}
                      // onClick={() => showConnectionProfile()}
                      aria-label="recipe"
                    ></Avatar>
                    <Box>
                      <Box>
                        <Box display={'flex'}>
                          <Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>
                            {comment?.firstName + ' ' + comment?.lastName}
                          </Typography>
                          <Typography sx={{ fontSize: 10, marginLeft: 1 }}>
                            {format(comment?.timeStamp)}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 11,
                            wordWrap: 'break-word',
                            maxWidth: { xs: 200, md: 400 },
                            minWidth: { xs: 200, md: 350 },
                          }}
                        >
                          {comment?.comment}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Divider />
            <Box m={2} display={'flex'}>
              <Box>
                <FavoriteBorderIcon
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#199FF7',
                      scale: '1.2',
                    },
                  }}
                />
                {postData?.likes.length}
              </Box>
              <Box ml={2}>
                <CommentIcon />
              </Box>
            </Box>
            {postData?.postCaption === '' ? (
              <Box ml={3} height={10}></Box>
            ) : (
              <Box ml={3}>{postData?.postCaption}</Box>
            )}
          </Box>
          <Box display={'flex'} m={2} mt={1}>
            <TextField
              size="small"
              className={'collapse'}
              style={{ overflow: 'hidden' }}
              fullWidth
              id="standard-basic"
              variant="outlined"
              placeholder="Add your comment..."
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              helperText={commentData ? '' : ''}
              rows={1}
            />
            <Box>
              <Button onClick={submit}>Post</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </StyledModal>
  );
};

export default ViewPost;
