import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SignUp.css';
import { useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
import vaidate from 'neo-form-validations';

const theme = createTheme();

const SignUp = () => {
  const [firstName, setFisrName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPssword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const timeStamp = new Date();
  const time =
    timeStamp.getHours() +
    ':' +
    timeStamp.getMinutes() +
    ', ' +
    timeStamp.toDateString();

  // state for checking userExist or not
  const [userExi, setUserEx] = useState(false);

  // state for checking first name is valid or not
  const [fistNameValid, setfistNameValid] = useState(true);

  // state for checking last name is valid or not
  const [lastNameValid, setLastNameValid] = useState(true);

  // state for checking email is valid or not
  const [emailValid, setEmailValid] = useState(true);

  // state for checking mobile is valid or not
  const [mobileValid, setMobleNameValid] = useState(true);

  // state for checking password is valid or not
  const [passwordValid, setPasswordValid] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('/signUp', {
        firstName,
        lastName,
        phone,
        email,
        password,
        timeStamp,
        time,
      })
      .then((result) => {
        if (result.data.userExi) {
          setUserEx(true);
        } else {
          setUserEx(false);
        }
      })
      .catch((err) => {});
  };

  const formValdation = () => {
    let firstNameData = vaidate.isUser(firstName);
    setfistNameValid(firstNameData);

    let lastNameData = vaidate.isUser(lastName);
    setLastNameValid(lastNameData);

    let emailData = vaidate.isEmail(email);
    setEmailValid(emailData);

    // let mobileData = vaidate.isUser(phone);
    setMobleNameValid(true);

    let passwordData = vaidate.isPassword(password);
    setPasswordValid(passwordData);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className="signUp">
        <CssBaseline />
        <Box
          bgcolor={'white'}
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography mb component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            {userExi ? (
              <Alert
                sx={{
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                severity="warning"
              >
                <Box> Email Id Or Mobile Number Already Exist</Box>
              </Alert>
            ) : (
              ''
            )}

            <Grid mt container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFisrName(e.target.value)}
                  onKeyUp={formValdation}
                />
                <Box>
                  {fistNameValid ? (
                    ''
                  ) : (
                    <Box mt>
                      <Typography
                        sx={{
                          color: 'red',
                          fontSize: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Fill Properly
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onKeyUp={formValdation}
                />
                <Box>
                  {lastNameValid ? (
                    ''
                  ) : (
                    <Box mt>
                      <Typography
                        sx={{
                          color: 'red',
                          fontSize: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Fill Properly
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={formValdation}
                />
                <Box>
                  {emailValid ? (
                    ''
                  ) : (
                    <Box mt>
                      <Typography
                        sx={{
                          color: 'red',
                          fontSize: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Fill Properly
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Mobile Number"
                  name="phone"
                  autoComplete="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyUp={formValdation}
                />
                <Box>
                  {mobileValid ? (
                    ''
                  ) : (
                    <Box mt>
                      <Typography
                        sx={{
                          color: 'red',
                          fontSize: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Fill Properly
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPssword(e.target.value)}
                  onKeyUp={formValdation}
                />
                <Box>
                  {passwordValid ? (
                    ''
                  ) : (
                    <Box mt>
                      <Typography
                        sx={{
                          color: 'red',
                          fontSize: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Fill Properly
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Box>
                  {fistNameValid ? (
                    ''
                  ) : (
                    <Box mt>
                      <Typography
                        sx={{
                          color: 'red',
                          fontSize: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Fill Properly
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start" padding={2}>
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
