import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  Grid,
  Modal,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import Followers from './Followers/Followers';
import Connections from './Connections/Connections';
import CollectionsIcon from '@mui/icons-material/Collections';
import axios from 'axios';

//modal style
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Profile = () => {
  // state for modal
  const [followers, setFollowers] = useState(false);
  const [connections, setConnections] = useState(false);
  const [post, setPost] = useState(false);

  // state for image upload
  const [postImages, setPostImages] = useState({ file: [] });

  //state for image preview
  const [image, setImage] = useState(null);

  // state for post Caption
  const [postCaption, setPostCaption] = useState('');

  // state for post emtyImage
  const [emtyImage, setEmtyImage] = useState(false);

  

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

  // take user id from localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData.user.id;
  const timeStamp = new Date();
  const hours = timeStamp.getHours() % 12 || 12;
  const time =
    hours + ':' + timeStamp.getMinutes() + ', ' + timeStamp.toDateString();

  //function for upload a post
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log('', postImages);
    data.append('file', postImages.file);
    axios
      .post('/uploadPost', data, {
        params: {
          postCaption,
          userId,
          timeStamp,
          time,
        },
      })
      .then((result) => {
        console.log('aaaaaaaaa', result.data);
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

  return (
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
          borderRadius={50}
          mb
          bgcolor="blue"
          sx={{
            width: { xs: '4rem', sm: '5rem', md: '10rem' },
            height: { xs: '4rem', sm: '5rem', md: '10rem' },
            marginRight: { xs: '0rem', sm: '1rem', md: '6rem' },
          }}
        />
        <Box m={1}>
          <Box display={'flex'} alignItems={'center'}>
            <Typography m sx={{ fontSize: { xs: '1rem', sm: '2rem' } }}>
              Name
            </Typography>
            <SettingsIcon sx={{ cursor: 'pointer' }} />
          </Box>
          <Box
            display={'flex'}
            justifyContent="space-between"
            alignItems={'center'}
          >
            <Box m>
              <Typography
                sx={{ fontSize: { xs: '1.5vh', sm: '3vh' }, cursor: 'pointer' }}
              >
                <span style={{ fontWeight: 'bold' }}>10</span> Post
              </Typography>
            </Box>
            <Box m>
              <Typography
                onClick={() => setFollowers(true)}
                sx={{ fontSize: { xs: '1.5vh', sm: '3vh' }, cursor: 'pointer' }}
              >
                <span style={{ fontWeight: 'bold' }}>10</span> Followers
              </Typography>
            </Box>
            <Box m onClick={() => setConnections(true)}>
              <Typography
                sx={{ fontSize: { xs: '1.5vh', sm: '3vh' }, cursor: 'pointer' }}
              >
                <span style={{ fontWeight: 'bold' }}>10</span> Connections
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid display={'flex'} justifyContent="center" xs={4}>
                <Card sx={{ maxWidth: 300, margin: '5px' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100%"
                      src={`/images/potImages/1668057961836-63649646eefc0bb098098db5.png`}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid display={'flex'} justifyContent="center" xs={4}>
                <Card sx={{ maxWidth: 300, margin: '5px' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100%"
                      src={`/images/potImages/1668057961836-63649646eefc0bb098098db5.png`}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid display={'flex'} justifyContent="center" xs={4}>
                <Card sx={{ maxWidth: 300, margin: '5px' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100%"
                      src={`/images/potImages/1668057961836-63649646eefc0bb098098db5.png`}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid display={'flex'} justifyContent="center" xs={4}>
                <Card sx={{ maxWidth: 300, margin: '5px' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100%"
                      src={`/images/potImages/1668057961836-63649646eefc0bb098098db5.png`}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* MOdal for Followers */}

      <StyledModal open={followers} onClose={() => setFollowers(false)}>
        <Box
          width={450}
          height={550}
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
            display={'flex'}
            alignItems="center"
            justifyContent={'space-between'}
          >
            <Typography variant="h6">Followers</Typography>
            <Box
              sx={{
                cursor: 'pointer',
                '&:hover': { color: 'black', transform: 's' },
              }}
              color={'#199FF7'}
            >
              <CloseIcon onClick={() => setFollowers(false)} />
            </Box>
          </Box>
          <Divider />
          <Followers />
        </Box>
      </StyledModal>

      {/* MOdal for Connections */}

      <StyledModal open={connections} onClose={() => setConnections(false)}>
        <Box
          width={450}
          height={550}
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
            display={'flex'}
            alignItems="center"
            justifyContent={'space-between'}
          >
            <Typography variant="h6">Connections</Typography>
            <Box
              sx={{
                cursor: 'pointer',
                '&:hover': { color: 'black', transform: 's' },
              }}
              color={'#199FF7'}
            >
              <CloseIcon onClick={() => setConnections(false)} />
            </Box>
          </Box>
          <Divider />
          <Connections />
        </Box>
      </StyledModal>

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
                  src={image ? URL.createObjectURL(image) : ''}
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
                  style={{ overflow: 'hidden' }}
                  fullWidth
                  id="standard-basic"
                  label="Write Caption Here..."
                  variant="standard"
                  multiline
                  onChange={(e) => setPostCaption(e.target.value)}
                  rows={1}
                />
                <Button onClick={submit}>Post</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </StyledModal>
    </Box>
  );
};

export default Profile;
