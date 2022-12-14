import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Reports = ({ reports }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    axios
      .get('/admin/getUserData', {
        params: {
          userId: reports.reprtedUserId,
        },
      })
      .then((result) => {
        setUserData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);
  return (
    <Box>
      <Box display={'flex'} alignItems={'center'}>
        <Avatar
          src={`/images/profileImages/${userData?.profileImage}`}
          sx={{
            margin: 2,
            width: { xs: '2rem' },
            height: { xs: '2rem' },
            fontSize: { xs: '2rem' },
          }}
          aria-label="recipe"
        ></Avatar>
        <Box>
          <Typography fontSize={13} fontWeight={'bold'}>
            {userData?.name}
          </Typography>
          <Box>
            <Typography fontSize={13}>{reports?.reportMessage}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;
