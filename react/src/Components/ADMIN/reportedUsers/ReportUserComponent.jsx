import styled from '@emotion/styled';
import { Avatar, Box, Button, Divider, Modal, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

import Reports from './Reports';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'translate(3)',
});

const ReportUserComponent = ({ users }) => {
  const [report, setReport] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const block = () => {
    axios
      .put('/admin/blockUser', {
        postId: users._id,
      })
      .then((result) => {
        setBlocked(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unblock = () => {
    axios
      .put('/admin/unblockUser', {
        postId: users._id,
      })
      .then((result) => {
        setBlocked(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box m>
      <Box
        p
        sx={{
          border: 1,
          borderRadius: 2,
        }}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Box>
          <Box>
            <Avatar
              src={`server/images/profileImages/${users?.profileImage}`}
              sx={{
                margin: 2,
                width: { xs: '4rem', sm: '5rem' },
                height: { xs: '4rem', sm: '5rem' },
                fontSize: { xs: '4rem', sm: '5rem' },
              }}
              aria-label="recipe"
            ></Avatar>
          </Box>
        </Box>

        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Typography fontWeight={'bold'}>Posted User</Typography>
          <Typography>{users?.firstName + ' ' + users?.lastName}</Typography>
        </Box>

        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography fontWeight={'bold'}>Reported Count</Typography>
          <Typography>{users?.reportUser.length}</Typography>
          <Button onClick={() => setReport(true)}>show</Button>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {users?.blockUser || blocked ? (
            <Button variant="contained" onClick={() => unblock()}>
              unblock
            </Button>
          ) : (
            <Button variant="contained" color="error" onClick={() => block()}>
              Block
            </Button>
          )}
        </Box>
      </Box>
      <Box>
        <StyledModal open={report} onClose={() => setReport(false)}>
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
            <Box>
              <Typography>Reports</Typography>
              <Divider />
            </Box>
            <Box sx={{ overflowY: 'scroll' }} height={500}>
              {users.reportUser?.map((reports, index) => {
                return <Reports key={index} reports={reports} />;
              })}
            </Box>
          </Box>
        </StyledModal>
      </Box>
    </Box>
  );
};

export default ReportUserComponent;
