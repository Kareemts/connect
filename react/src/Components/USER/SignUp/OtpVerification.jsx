import styled from '@emotion/styled';
import { Button, Divider, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'translate(3)',
});

const OtpVerification = ({ props }) => {
  const [otpInValid, setOtpInValid] = useState(false);
  const [otpLength, setLength] = useState(false);
  const [colse, setClose] = useState(true);
  const [otp, setOtp] = useState('');
  let navigate = useNavigate();
  console.log(props);

  const submit = () => {
    if (otp.length < 6 || otp === '') {
      setLength(true);
    } else {
      axios
        .post('/otpVarification', {
          props,
          otp,
        })
        .then((result) => {
          console.log(result.data);
          if (result.data.userAdded) {
            navigate('/home');
          } else {
            setOtpInValid(true);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <Box>
      <StyledModal open={true}>
        <Box
          width={350}
          height={400}
          padding={3}
          borderRadius={2}
          bgcolor="white"
          sx={{
            backgroundColor: 'white',
            border: 'none',
            outline: 'none',
          }}
        >
          <Box display={'flex'} justifyContent="end">
            <CloseIcon
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: '#199FF7',
                  transform: 'translate(3)',
                  scale: '1.2',
                },
              }}
              onClick={() => setClose(false)}
            />
          </Box>
          <Box m>
            <Typography variant="h6" display={'flex'} justifyContent="center">
              Enter your otp
            </Typography>
            <Divider />
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center">
            <TextField
              sx={{ margin: 5 }}
              id="standard-error-helper-text"
              label="Enter otp"
              onChange={(e) => setOtp(e.target.value)}
              helperText={
                otpInValid ? (
                  <Box color={'red'}>incorrect otp</Box>
                ) : '' || otpLength ? (
                  <Box color={'red'}>OTP Must have 6 digit</Box>
                ) : (
                  ''
                )
              }
              variant="standard"
            />
            <Button sx={{ margin: 3 }} variant="contained" onClick={submit}>
              Submit
            </Button>
          </Box>
        </Box>
      </StyledModal>
    </Box>
  );
};

export default OtpVerification;