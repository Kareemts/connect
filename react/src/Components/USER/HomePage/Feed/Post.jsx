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
import CommentIcon from '@mui/icons-material/Comment';
import { Box } from '@mui/system';
import axios from 'axios';

const Post = () => {
  const [getPostes, setGetPostes] = useState(null);
  const [noPost, setNoPost] = useState(false);

  useEffect(() => {
    axios
      .get('/getPostes')
      .then((result) => {
        setTimeout(() => setGetPostes(result.data), 1000);
        if (result.data.length <= 0) {
          setNoPost(true);
        }
        console.log(result.data);
      })
      .catch((err) => {});
    return () => {};
  }, []);

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
            <Skeleton sx={{ borderRadius:2}} variant="rectangular" width="100%" height={300} />
            <Box p m={2}>
              <Skeleton sx={{marginTop:1}} variant="rounded" width={210} height={20} />
              <Skeleton sx={{marginTop:1}} variant="rounded" width={210} height={30} />
              <Skeleton sx={{marginTop:1}} variant="rounded" width={210} height={40} />
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
                      Name
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
                      width={80}
                      sx={{ display: 'flex' }}
                      justifyContent="space-between"
                    >
                      <Box m component={'span'}>
                        <FavoriteBorderIcon />
                        <Typography fontSize={12} variant="">
                          <span>500</span>
                        </Typography>
                      </Box>
                      <Box m>
                        <CommentIcon />
                      </Box>
                    </Box>
                    <Box ml>
                      <Typography fontSize={12}>{post.postCaption}</Typography>
                    </Box>
                    <Box ml>
                      <Typography
                        sx={{
                          fontSize: {xs:10,sm:13},
                          color: '#8E8E8E',
                          cursor: 'pointer',
                        }}
                      >
                        View all comments
                      </Typography>
                    </Box>
                  </Box>
                  <Divider style={{ marginTop: '10px' }} />
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
