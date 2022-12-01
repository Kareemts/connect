import { Avatar, Card, CardMedia, Divider, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';
import LIke from './LIke';
import Comment from './Comment';
import { useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, setLiked, setFeed }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  const navigate = useNavigate();

  const [openComment, setOpenComment] = useState(false);

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
    </Box>
  );
};

export default Post;
