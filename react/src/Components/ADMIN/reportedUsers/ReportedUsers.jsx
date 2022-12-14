import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ReportUserComponent from './ReportUserComponent';

const ReportedUser = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('/admin/getReportedUsers')
      .then((result) => {
        setUsers(result.data);
      })
      .catch((err) => {});

    return () => {};
  }, []);
  return (
    <Box>
      <Box>
        <Typography variant={'h6'}>Reported Users</Typography>
      </Box>
      {users?.map((users, index) => {
        return <ReportUserComponent key={index} users={users} />;
      })}
    </Box>
  );
};

export default ReportedUser;
