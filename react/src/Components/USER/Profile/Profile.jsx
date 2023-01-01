import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Modal,
  styled,
  TextField,
  Avatar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import Followers from './Followers/Followers';
import Connections from './Connections/Connections';
import CollectionsIcon from '@mui/icons-material/Collections';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import CircularProgress from '@mui/material/CircularProgress';
import PorofilePic from './PorofilePic';
import { axiosUrl } from '../../../axios/axiosInstance';
import ViewPost from './ViewPost';
import Settings from './settings/Settings';

//modal style
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Profile = () => {
  // take user id from localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  const userProfileImage = userData?.user.profileImage;

  const timeStamp = new Date();
  const hours = timeStamp.getHours() % 12 || 12;
  const time =
    hours + ':' + timeStamp.getMinutes() + ', ' + timeStamp.toDateString();

  // state for modals
  const [followers, setFollowers] = useState(false);

  const [connections, setConnections] = useState(false);

  const [settings, setSettings] = useState(false);

  const [post, setPost] = useState(false);

  const [openProfilePic, setOpenProfilePic] = useState(false);

  const [viewPost, setViewPost] = useState(false);

  const [postData, setPostData] = useState(null);

  const [postComments, setPostComments] = useState([]);

  // state for image upload
  const [postImages, setPostImages] = useState({ file: [] });

  //state for image preview
  const [image, setImage] = useState(null);

  // state for post Caption
  const [postCaption, setPostCaption] = useState('');

  // state for post emtyImage
  const [emtyImage, setEmtyImage] = useState(false);

  //state for user uploaded posts
  const [Posts, setPosts] = useState([]);

  //state for user profie details
  const [profileData, setProfileData] = useState(null);

  //state for user profie details
  const [noPost, setNopost] = useState(false);

  const [refresh, setRefresh] = useState(false);

  // function for choose image
  const preview = (e) => {
    setImage(e.target.files[0]);
    setEmtyImage(false);
    const uploadPost = (e) => {
      setPostImages({
        ...postImages,
        file: e.target.files[0],
      });
    };
    uploadPost(e);
  };

  //function for upload a post
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log('', postImages);
    data.append('file', postImages.file);
    axiosUrl
      .post('/uploadPost', data, {
        params: {
          postCaption,
          userId,
          timeStamp,
          time,
          userProfileImage,
        },
      })
      .then((result) => {
        if (result.data.noImage) {
          setEmtyImage(true);
        } else {
          setPostImages('');
          setPostCaption('');
          setImage('');
          setPost(false);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const openPost = (post) => {
    setPostData(post);
    setViewPost(true);
  };

  useEffect(() => {
    axiosUrl
      .get('/profile', {
        params: {
          userId,
        },
      })
      .then((result) => {
        setProfileData(result.data.userData);
        if (result.data.post <= 0) {
          setNopost(true);
        }
        if (result.data.post.length > 0) {
          setNopost(false);
        }
        setPosts(result.data.post.reverse());
      })
      .catch((err) => {
        alert(err.message);
      });
    return () => {};
  }, [openProfilePic, post, userId, refresh]);

  const getPostComment = (postId) => {
    axiosUrl
      .get('/getPostComments', {
        params: {
          postId,
        },
      })
      .then((result) => {
        setPostComments(result.data.reverse());
      })
      .catch((err) => {});
  };

  return (
    <Box>
      {profileData && (
        <Box
          mt={10}
          sx={{
            marginLeft: { xs: '10px', sm: '100px' },
            marginRight: { xs: '10px', sm: '100px' },
          }}
        >
          <Box
            display={'flex'}
            sx={{ justifyContent: 'center' }}
            alignItems={'center'}
            bgcolor={'white'}
            borderRadius={2}
            mb={2}
            p={2}
          >
            <Box
              component={'div'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent="center"
              alignItems={'center'}
              sx={{ marginRight: { xs: '0rem', sm: '1rem', md: '6rem' } }}
            >
              <Avatar
                src={`/images/profileImages/${profileData?.profileImage}`}
                alt={profileData?.firstName}
                sx={{
                  margin: 2,
                  width: { xs: '4rem', sm: '5rem', md: '10rem' },
                  height: { xs: '4rem', sm: '5rem', md: '10rem' },
                  fontSize: { xs: '4rem', sm: '5rem', md: '10rem' },
                }}
                aria-label="recipe"
              ></Avatar>

              <Box component={'div'} onClick={() => setOpenProfilePic(true)}>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <Typography
                    component={'h6'}
                    sx={{ fontSize: { xs: 10, sm: 15 } }}
                  >
                    Change
                  </Typography>
                  <PhotoCamera
                    sx={{ fontSize: { xs: 13, sm: 20 }, margin: 1 }}
                  />
                </IconButton>
              </Box>
            </Box>

            <Box m={1}>
              <Box display={'flex'} alignItems={'center'}>
                <Typography sx={{ fontSize: { xs: '1rem', sm: '2rem' } }}>
                  {profileData?.firstName + ' ' + profileData?.lastName}
                </Typography>
                <SettingsIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setSettings(true)}
                />
              </Box>
              <Box display={'flex'} alignItems={'center'}>
                <Typography sx={{ fontSize: { xs: '.7rem', sm: '1rem' } }}>
                  {profileData?.bio}
                </Typography>
              </Box>
              <Box
                display={'flex'}
                justifyContent="space-between"
                alignItems={'center'}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.5vh', sm: '3vh' },
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>
                      <Typography fontWeight={900}>{Posts?.length}</Typography>
                    </span>{' '}
                    Post
                  </Typography>
                </Box>
                <Box m>
                  <Typography
                    onClick={() => setFollowers(true)}
                    sx={{
                      fontSize: { xs: '1.5vh', sm: '3vh' },
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>
                      <Typography fontWeight={900}>
                        {' '}
                        {profileData?.followers.length}
                      </Typography>
                    </span>{' '}
                    Followers
                  </Typography>
                </Box>
                <Box m onClick={() => setConnections(true)}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.5vh', sm: '3vh' },
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>
                      <Typography fontWeight={900}>
                        {profileData?.connections.length}
                      </Typography>
                    </span>{' '}
                    Connections
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            bgcolor={'white'}
            mt
            borderRadius={2}
            pl={2}
            p={2}
            sx={{ minHeight: { xs: 350 } }}
          >
            <Box>
              <Box display={'flex'} justifyContent={'center'}>
                <Typography mt>Posts</Typography>
              </Box>
              <Box
                m={1}
                display={'flex'}
                color="#199FF7"
                justifyContent={'end'}
                alignItems="center"
              >
                Share New Post{' '}
                <AddBoxIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setPost(true)}
                />
              </Box>
            </Box>
            <Box>
              {noPost ? (
                <Box
                  m={10}
                  display={'flex'}
                  justifyContent={'center'}
                  fontSize={50}
                  fontWeight={'bolder'}
                >
                  No Posts Availabile
                </Box>
              ) : (
                ''
              )}
              <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                  {Posts.map((post, index) => {
                    return (
                      <Grid
                        key={index}
                        display={'flex'}
                        justifyContent="center"
                        xs={4}
                      >
                        <Card sx={{ maxWidth: 300, margin: '5px' }}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              sx={{
                                borderRadius: 1,
                                width: {
                                  xs: '6rem',
                                  sm: '10rem',
                                  md: '15rem',
                                  lg: '20rem',
                                },
                                height: {
                                  xs: '6rem',
                                  sm: '10rem',
                                  md: '15rem',
                                  lg: '20rem',
                                },
                              }}
                              src={`/images/potImages/${post.imageName}`}
                              alt="green iguana"
                              onClick={() => {
                                getPostComment(post._id);
                                openPost(post);
                              }}
                            />
                          </CardActionArea>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Box>
          </Box>

          {/* MOdal for Post */}

          <StyledModal open={post} onClose={() => setPost(false)}>
            <Box
              width={300}
              height={300}
              padding={3}
              borderRadius={5}
              bgcolor="white"
              sx={{
                backgroundColor: 'white',
                border: 'none',
                outline: 'none',
              }}
            >
              <Box
                mb
                display={'flex'}
                alignItems="center"
                justifyContent={'space-between'}
              >
                <Typography variant="h6">Share New Post</Typography>
                <Box>
                  <CloseIcon
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: '#199FF7',
                        transform: 'translate(3)',
                        scale: '1.2',
                      },
                    }}
                    onClick={() => setPost(false)}
                  />
                </Box>
              </Box>
              <Divider />
              <Box
                width={300}
                height={300}
                display={'flex'}
                justifyContent="space-evenly"
                alignItems="center"
                flexDirection="column"
              >
                {emtyImage ? <Box color={'red'}>Plese Select A Image</Box> : ''}
                {image ? (
                  <Box display={'flex'} alignItems="center">
                    <img
                      alt=""
                      width="200px"
                      height="200px"
                      style={{ borderRadius: 5 }}
                      src={image ? URL?.createObjectURL(image) : ''}
                    ></img>
                  </Box>
                ) : (
                  <Box
                    display={'flex'}
                    flexDirection="column"
                    justifyContent={'center'}
                    alignItems="center"
                  >
                    <CollectionsIcon
                      style={{ fontSize: 100, marginBottom: '15' }}
                    />
                    <Button variant="contained" component="label">
                      <Typography style={{ fontSize: '12px' }}>
                        Select From your Device
                      </Typography>
                      <input
                        hidden
                        accept="image/*"
                        multiple=""
                        name="upload_file"
                        type="file"
                        onChange={(e) => {
                          preview(e);
                        }}
                      />
                    </Button>
                  </Box>
                )}

                <Box mb={3} sx={{ width: 300 }}>
                  <Box
                    display={'flex'}
                    justifyContent="space-between"
                    alignItems={'flex-end'}
                  >
                    <TextField
                      fullWidth
                      label="Write Caption Here..."
                      variant="standard"
                      multiline
                      onChange={(e) => setPostCaption(e.target.value)}
                    />
                    <Button onClick={submit}>Post</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </StyledModal>
          <PorofilePic
            openProfilePic={openProfilePic}
            setOpenProfilePic={setOpenProfilePic}
          />
          <Connections
            connections={connections}
            setConnections={setConnections}
          />
          <Followers followers={followers} setFollowers={setFollowers} />
          <ViewPost
            viewPost={viewPost}
            setViewPost={setViewPost}
            postData={postData}
            postComments={postComments}
            setPostComments={setPostComments}
            setRefresh={setRefresh}
          />
          <Settings settings={settings} setSettings={setSettings} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
