import { Box, Avatar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { axiosUrl } from '../../../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Online = ({ user }) => {
  let userId = JSON.parse(localStorage.getItem('userData'));
  userId = userId?.user.id;
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [friend, setFriend] = useState(null);
  useEffect(() => {
    axiosUrl
      .get('/getUserData', {
        params: {
          userId: user.userId,
        },
      })
      .then((result) => {
        setUserData(result.data);
        setFriend(
          result.data?.followers?.some((user) => user.followerId === userId)
        );
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });

    return () => {};
  }, []);

  const userName = userData?.firstName + '_' + userData?.lastName;
  const name = userName.replaceAll(' ', '_');

  const showConnectionProfile = () => {
    const connectionId = user.userId;
    navigate(`/user/${name}`, {
      state: { connectionId },
    });
  };

  return (
    <Box>
      {friend ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box m display={'flex'}>
            <Box
              component={'div'}
              sx={{ cursor: 'pointer' }}
              onClick={() => showConnectionProfile()}
            >
              <Avatar
                alt="Remy Sharp"
                src={`/images/profileImages/${userData?.profileImage}`}
              />
            </Box>
            <Typography m>
              {userData?.firstName + ' ' + userData?.lastName}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default Online;
