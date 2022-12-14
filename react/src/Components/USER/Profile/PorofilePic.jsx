import styled from '@emotion/styled';
import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { axiosUrl } from '../../../axios/axiosInstance';
import CollectionsIcon from '@mui/icons-material/Collections';

//modal style
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const userData = JSON.parse(localStorage.getItem('userData'));
const userId = userData?.user.id;

const PorofilePic = ({ openProfilePic, setOpenProfilePic }) => {
  // state for image upload
  const [profileImages, setProfileImages] = useState({ file: [] });
  //state for image preview
  const [image, setImage] = useState(null);
  // state for post emtyImage
  const [emtyImage, setEmtyImage] = useState(false);

  // function for choose image
  const preview = (e) => {
    setImage(e.target.files[0]);
    setEmtyImage(false);
    const uploadPost = (e) => {
      setProfileImages({
        ...profileImages,
        file: e.target.files[0],
      });
    };
    uploadPost(e);
  };

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', profileImages.file);
    axiosUrl
      .post('/addProfilePic', data, {
        params: {
          userId,
        },
      })
      .then((result) => {
        if (result.data.noImage) {
          setEmtyImage(true);
        } else {
          setProfileImages('');
          setImage('');
          setOpenProfilePic(false);
        }
      });
  };

  return (
    <Box>
      <StyledModal open={openProfilePic}>
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
            <Typography variant="h6">Change your profile picture</Typography>
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
                onClick={() => setOpenProfilePic(false)}
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
                  style={{ borderRadius: 100 }}
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
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems="center"
              mb={3}
              sx={{ width: 300 }}
            >
              <Box
                display={'flex'}
                justifyContent="space-between"
                alignItems={'flex-end'}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: 'black' }}
                  onClick={submit}
                >
                  Change
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </StyledModal>
    </Box>
  );
};

export default PorofilePic;
