import styled from '@emotion/styled';
import { Avatar, Button, Divider, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosUrl } from '../../../../axios/axiosInstance';

//modal style
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Connections = ({ connections, setConnections }) => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;

  const [connectionsData, setConnectionsData] = useState([]);

  useEffect(() => {
    axiosUrl
      .get('/getConnections', {
        params: {
          userId,
        },
      })
      .then((result) => {
        setConnectionsData(result.data);
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
        {connectionsData?.map((connection, index) => {
          const useName = connection.firstName + '' + connection.lastName;

          return (
            <Box
              key={index}
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
                    showConnectionProfile(connection.connctionId, useName)
                  }
                >
                  <Avatar
                    src={`/images/profileImages/${connection.profileImage}`}
                    alt={connection.firstName}
                    sx={{
                      borderRadius: 100,
                      margin: 0.5,
                      width: { xs: '3rem' },
                      height: { xs: '3rem' },
                    }}
                  />
                </Box>

                <Typography m>
                  {connection.firstName + ' ' + connection.lastName}
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

export default Connections;
