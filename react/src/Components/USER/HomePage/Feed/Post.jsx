import {
  Avatar,
  Button,
  Card,
  CardMedia,
  Divider,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';
import LIke from './LIke';
import Comment from './Comment';
import { useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styled from '@emotion/styled';
import { axiosUrl } from '../../../../axios/axiosInstance';
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'translate(3)',
});
const Post = ({ post, setLiked, setFeed }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  const navigate = useNavigate();

  const [openComment, setOpenComment] = useState(false);
  const [postReporting, setPostReporting] = useState(false);
  const [reportMessage, setReportMessage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userName = post.userId.firstName + '_' + post.userId.lastName;
  const name = userName.replaceAll(' ', '_');



  const showConnectionProfile = () => {
    const connectionId = post.userId._id;

    if (connectionId === userId) {
      navigate('/Profile');
    } else {
      navigate(`/user/${name}`, {
        state: { connectionId },
      });
    }
  };

  const report = () => {
    if (reportMessage != null) {
      axiosUrl
        .post('/reprtPost', {
          postId: post._id,
          userId,
          reportMessage,
          time: Date.now(),
        })
        .then((result) => {
          setAnchorEl(null);
          if (result.data.reported) setPostReporting(false);
          // if(result.data.error){}
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  return (
    <Box>
      <Box component={'div'}>
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
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box display={'flex'} alignItems="center">
                <Avatar
                  src={`/images/profileImages/${post.userId.profileImage}`}
                  alt={post.userId.firstName}
                  sx={{
                    margin: 2,
                    width: { xs: '3rem' },
                    height: { xs: '3rem' },
                    cursor: 'pointer',
                  }}
                  onClick={() => showConnectionProfile()}
                  aria-label="recipe"
                ></Avatar>

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
              <Box mt>
                <IconButton aria-label="more" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <Box>
                <MenuItem onClick={() => setPostReporting(true)}>
                  Report
                </MenuItem>
              </Box>
            </Menu>

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
                  {post.likes.length} Like
                </Box>
                <Box m>{post.comments.length} Comment</Box>
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
                <Box m>
                  <LIke post={post} setLiked={setLiked} />
                </Box>
                <Box>
                  <Box
                    component={'div'}
                    onClick={() => setOpenComment(!openComment)}
                  >
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
                  </Box>
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
            <Comment
              setOpenComment={setOpenComment}
              openComment={openComment}
              post={post}
              setFeed={setFeed}
            />
            <Divider />
          </Card>
        </div>
      </Box>
      <StyledModal open={postReporting} onClose={() => setPostReporting()}>
        <Box
          width={350}
          height={300}
          padding={3}
          borderRadius={2}
          bgcolor="white"
          sx={{
            backgroundColor: 'white',
            border: 'none',
            outline: 'none',
          }}
        >
          <Box>Report post</Box>
          <Divider />
          <Box>
            <Box mt={3} mb={2} fontSize={12}>
              Reason for reporting
            </Box>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              multiline
              rows={5}
              onChange={(e) => setReportMessage(e.target.value)}
            />
          </Box>
          <Box mt display={'flex'} justifyContent={'flex-end'}>
            <Button onClick={() => report()}>Report</Button>
          </Box>
        </Box>
      </StyledModal>
    </Box>
  );
};

export default Post;
