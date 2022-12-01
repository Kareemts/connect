import styled from '@emotion/styled';
import { Avatar, Button, Divider, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { axiosUrl } from '../../../../axios/axiosInstance';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

//modal style
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Followers = ({ followers, setFollowers }) => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  const [followersData, setFollowersData] = useState([]);

  useEffect(() => {
    axiosUrl
      .get('/getFollowers', {
        params: {
          userId,
        },
      })
      .then((result) => {
        setFollowersData(result.data);
      })
      .catch((err) => {
        alert(err.message);
      });

    return () => {};
  }, [userId]);

  const showConnectionProfile = (connectionId, userName) => {
    const name = userName.replaceAll(' ', '_');
    navigate(`/user/${name}`, {
      state: { connectionId },
    });
  };

  return (
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
          <Typography variant="h6">Connections</Typography>
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
        {followersData?.map((follower) => {
          const useName = follower.firstName + '' + follower.lastName;
          return (
            <Box
              key={follower.connctionId}
              m
              display={'flex'}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display={'flex'} justifyContent="center" alignItems="center">
                <Box
                  sx={{ cursor: 'pointer' }}
                  component={'div'}
                  onClick={() =>
                    showConnectionProfile(follower.connctionId, useName)
                  }
                >
                  <Avatar
                    src={`/images/profileImages/${follower.profileImage}`}
                    alt={follower.firstName}
                    sx={{
                      borderRadius: 100,
                      margin: 0.5,
                      width: { xs: '3rem' },
                      height: { xs: '3rem' },
                    }}
                  />
                </Box>

                <Typography m>
                  {follower.firstName + ' ' + follower.lastName}
                </Typography>
              </Box>
              <Button sx={{ borderRadius: '10px', fontSize: '10px' }}>
                Remove
              </Button>
            </Box>
          );
        })}
      </Box>
    </StyledModal>
  );
};

export default Followers;
