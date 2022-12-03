import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { axiosUrl } from '../../../../axios/axiosInstance';
import './style.css';

const Comment = ({ openComment, setOpenComment, post, setFeed }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  const userName = userData?.user.name;

  const profileImage = userData?.user.profileImage;

  const comments = post.comments.reverse();
  const timeStamp = new Date();
  const hours = timeStamp.getHours() % 12 || 12;
  const date =
    hours + ':' + timeStamp.getMinutes() + ', ' + timeStamp.toDateString();

  const postedUserId = post.userId._id;

  const [comment, setComment] = useState('');

  const [commentData, setCommntData] = useState(false);

  const [result, setResult] = useState(null);

  const submit = () => {
    if (comment === '') {
      setCommntData(true);
    } else {
      axiosUrl
        .put('/addComment', {
          comment,
          userId,
          date,
          timeStamp,
          postId: post._id,
          userName,
          profileImage,
          postedUserId,
        })
        .then((result) => {
          if (result.data.commentAdded) {
            setFeed(Math.random());
            setOpenComment(true);
            setCommntData(false);
            setResult(result.data);
            setComment('');
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  useEffect(() => {
    return () => {};
  }, [result]);

  return (
    <Box>
      <Box m component={'div'}>
        <Collapse
          className={'collapse'}
          in={openComment}
          sx={{ maxHeight: '300px', overflowY: 'scroll' }}
          timeout="auto"
          unmountOnExit
        >
          <CardContent>
            <Box component={'div'}>
              <Box postion={'fixed'}>
                <Box>
                  <Box pb>Comments</Box>
                  <Divider width={70} />
                </Box>
                <Box display={'flex'} mt>
                  <TextField
                    className={'collapse'}
                    style={{ overflow: 'hidden' }}
                    fullWidth
                    id="standard-basic"
                    variant="outlined"
                    placeholder="Add your comment..."
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    helperText={commentData ? 'Plese add a comment' : ''}
                    rows={1}
                  />
                  <Box pt={3}>
                    <Button onClick={submit}>Post</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
          {comments.map((comment) => {
            return (
              <Box
                key={comment.timeStamp}
                display={'flex'}
                alignItems={'center'}
                m
              >
                <CardMedia
                  component="img"
                  sx={{
                    borderRadius: 100,
                    margin: 1.5,
                    width: { xs: '2rem' },
                    height: { xs: '2rem' },
                  }}
                  src={`/images/profileImages/${comment.commentedUserImage}`}
                  alt="green iguana"
                />
                <Box>
                  <Box
                    component={'div'}
                    sx={{
                      backgroundColor: '#E9E5DF',
                      borderRadius: 5,
                      paddingLeft: 1.5,
                      paddingRight: 1.5,
                      paddingTop: 0.5,
                      paddingBottom: 0.5,
                      maxWidth: 400,
                    }}
                  >
                    <Typography sx={{ fontSize: 13 }}>
                      {comment.commentedUserName}
                    </Typography>
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
        </Collapse>
      </Box>
    </Box>
  );
};

export default Comment;
