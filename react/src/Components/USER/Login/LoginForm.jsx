import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Container from '@mui/material/Container';
import {
  Alert,
  createTheme,
  Divider,
  Modal,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { axiosUrl } from '../../../axios/axiosInstance';
import styled from '@emotion/styled';
const theme = createTheme();

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'translate(3)',
});

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPssword] = useState('');
  const [signInErr, setSignInErr] = useState(false);
  const [userBlocked, setuserBlocked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosUrl
      .post('/signIn', {
        email,
        password,
      })
      .then((result) => {
        if (result.data.userLogin === true) {
          localStorage.setItem('token', result.data.token);
          localStorage.setItem(
            'userData',
            JSON.stringify({ login: true, user: result.data.userDetails })
          );
          navigate('/home');
        } else if (result.data.useBlocked) {
          setuserBlocked(true);
        } else {
          setSignInErr(true);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
    setTimeout(() => {
      setuserBlocked(false);
      setSignInErr(false);
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        mt={5}
        component="main"
        maxWidth="xs"
        // sx={{
        //   boxShadow: {
        //     xs: 'none',
        //     sm: '0px 0px 37px -16px rgba(205, 202, 202, 0.3)',
        //   },
        // }}
        className="login-Form"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box>
            <img
              style={{ width: '70px' }}
              src="../../../../images/LargePng.png"
              alt=""
            />
          </Box>
          <Typography variant="h4" style={{ fontWeight: '900' }}>
            CONNECT
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {userBlocked ? (
              <Alert
                sx={{
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                severity="warning"
              >
                <Box>Your account is blocked</Box>
              </Alert>
            ) : (
              ''
            )}
            {signInErr ? (
              <Alert
                sx={{
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                severity="warning"
              >
                <Box>Invalid Email Id Or Password</Box>
              </Alert>
            ) : (
              ''
            )}
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPssword(e.target.value)}
            />

            <Box display={'flex'} justifyContent="center">
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Box>
            <Grid direction="column" container>
              {/* <Button
                type="submit"
                variant="outlined"
                sx={{ mt: 3, mb: 2, display: 'flex', alignItems: 'center' }}
                className="signInWithGoogle"
              >
                <span style={{ margin: '5px' }}>
                  <img
                    style={{ width: '20px' }}
                    src="../../../../images/google.png"
                    alt=""
                  />
                </span>
                <span> Sign In With Google</span>
              </Button> */}
              {/* <Box className="forgotPasswoord">
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => setOpenModal(true)}
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Box> */}
            </Grid>
          </Box>
        </Box>
        <Box component="main" display={'flex'} justifyContent="center" m mb={3}>
          <span style={{ margin: '5px' }}>
            Don't have an account?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => navigate('/Sign-Up')}
            >
              Sign Up
            </span>{' '}
          </span>
        </Box>
      </Container>
      <StyledModal open={openModal} onClose={() => setOpenModal(false)}>
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
          <Box>
            <Typography>Forgot password</Typography>
            <Divider />
          </Box>
          <Box display={'flex'} justifyContent="center" mt={3}>
            <Typography>Enter your email</Typography>
          </Box>
          <Box>
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Email"
              autoFocus
              onChange={(e) => setPssword(e.target.value)}
            />
          </Box>

          <Box display={'flex'} justifyContent="center">
            <Button
              size="small"
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
          {
            <Box>
              <Box fontSize={12} display={'flex'} justifyContent="center">
                Enter OTP
              </Box>
              <Box display={'flex'} justifyContent="center">
                <Box width={100}>
                  <TextField
                    size="small"
                    margin="normal"
                    required
                    name="password"
                    autoFocus
                    onChange={(e) => setPssword(e.target.value)}
                  />
                </Box>
              </Box>

              <Box display={'flex'} justifyContent="center">
                <Button
                  size="small"
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          }
        </Box>
      </StyledModal>
    </ThemeProvider>
  );
};

export default LoginForm;
