import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { axiosUrl } from '../../../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const EditProfile = () => {
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem('userData'));
  userId = userId?.user.id;

  const [userData, setUserData] = useState(null);
  const [firstName, setFisrName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    axiosUrl
      .get('/getUserData', {
        params: {
          userId,
        },
      })
      .then((result) => {
        if (result.data.error) navigate('/error');
        setUserData(result.data);
        setFisrName(result.data.firstName);
        setLastName(result.data.lastName);
        setBio(result.data.bio);
        setPhone(result.data.phone);
        setEmail(result.data.email);
      })
      .catch((err) => {
        navigate('/error');
      });

    return () => {};
  }, [navigate, userId]);

  const change = () => {
    axiosUrl
      .put('/editProfile', {
        userId,
        firstName,
        lastName,
        bio,
        phone,
        email,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.update) setUpdated(true);
        if (result.data.error) navigate('/error');
        setInterval(() => setUpdated(false), 1000);
      })
      .catch((err) => {});
  };

  return (
    <Box>
      <Box display={'felx'} justifyContent={'center'}>
        <Box m fontWeight={'bold'}>
          Edit Accout informations
        </Box>
        <Divider />
      </Box>
      <Box m={3}>
        {updated ? <Alert severity="success">Updated</Alert> : ''}
        <Box mt>
          <Typography fontSize={12} fontWeight={'bold'}>
            First Name
          </Typography>
          <TextField
            fullWidth
            value={firstName}
            name="firstName"
            size="small"
            onChange={(e) => setFisrName(e.target.value)}
          />
        </Box>
        <Box mt>
          <Typography fontSize={12} fontWeight={'bold'}>
            Last Name
          </Typography>
          <TextField
            fullWidth
            value={lastName}
            size="small"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Box mt>
          <Typography fontSize={12} fontWeight={'bold'}>
            Bio
          </Typography>
          <TextField
            fullWidth
            value={bio}
            size="small"
            onChange={(e) => setBio(e.target.value)}
          />
        </Box>
        <Box mt>
          <Typography fontSize={12} fontWeight={'bold'}>
            Email
          </Typography>
          <TextField
            fullWidth
            value={email}
            size="small"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mt>
          <Typography fontSize={12} fontWeight={'bold'}>
            Phone number
          </Typography>
          <TextField
            fullWidth
            value={phone}
            size="small"
            onChange={(e) => setPhone(e.target.value)}
          />
        </Box>
        <Box display={'flex'} justifyContent={'center'} mt onClick={change}>
          <Button variant="contained">Change</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
