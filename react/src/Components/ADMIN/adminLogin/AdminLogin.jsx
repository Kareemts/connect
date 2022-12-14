import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Container from '@mui/material/Container';
import { Alert, createTheme, ThemeProvider, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
const theme = createTheme();

const AdminLogin = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [signInErr, setSignInErr] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/admin/adminSignIn', {
        userName,
        password,
      })
      .then((result) => {
        if (result.data.adminSignIn) {
          navigate('/admin/dashboard');
        } else if (result.data.error) {
          navigate('/error');
        } else {
          setSignInErr(true);
        }
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
        navigate('/error');
      });
    setTimeout(() => {
      setSignInErr(false);
    }, 2000);
  };

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="login-Form">
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
            <Typography variant="h6" style={{ fontWeight: '900' }}>
              Admin
            </Typography>
            <Typography variant="h4" style={{ fontWeight: '900' }}>
              CONNECT
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
                  <Box>Invalid User Name Or Password</Box>
                </Alert>
              ) : (
                ''
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="User Name"
                name="userName"
                autoComplete="email"
                autoFocus
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default AdminLogin;
