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
import OtpVerification from './OtpVerification';
import {
  FirstName,
  UserExist,
  LastName,
  EmailValid,
  MobileValid,
  PasswordValid,
  ConfirmasswordValid,
  FormValid,
} from './FormValidation';

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
  console.log(password);
  console.log(confirmPassword);

  // state for checking userExist or not
  const [userExi, setUserEx] = useState(false);

  // state for checking first name is valid or not
  const [fistNameValid, setfistNameValid] = useState(false);

  // state for checking last name is valid or not
  const [lastNameValid, setLastNameValid] = useState(false);

  // state for checking email is valid or not
  const [emailValid, setEmailValid] = useState(false);

  // state for checking mobile is valid or not
  const [mobileValid, setMobleNameValid] = useState(false);

  // state for checking password is valid or not
  const [passwordValid, setPasswordValid] = useState(false);

  // state for checking password is valid or not
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  // state for checking form is valid or not
  const [formValidation, setFormValidation] = useState(false);

  // state for otp varification modal
  const [OtpVerify, setOtpVerify] = useState(false);

  // state for signup data varification modal
  const [signUpData, setsignUpData] = useState(false);

  // const [colse, setClose] = useState(true);

  const validateFistName = () => {
    if (firstName.length < 3 || '') {
      setfistNameValid(true);
    } else {
      setfistNameValid(false);
    }
  };

  const validateLastName = () => {
    if (lastName.length < 3 || '') {
      setLastNameValid(true);
    } else {
      setLastNameValid(false);
    }
  };

  const validateEmail = () => {
    const validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(validRegex)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const validatMobile = () => {
    const number = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.match(number)) {
      setMobleNameValid(false);
    } else {
      setMobleNameValid(true);
    }
  };

  const validatPassword = () => {
    if (password.length < 5 || '') {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const validateconfirmPassword = () => {
    if (password === confirmPassword) {
      setConfirmPasswordValid(false);
    } else {
      setConfirmPasswordValid(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      firstName === '' ||
      fistNameValid ||
      lastName === '' ||
      lastNameValid ||
      email === '' ||
      emailValid ||
      phone === '' ||
      mobileValid ||
      password === '' ||
      passwordValid ||
      confirmPassword === '' ||
      confirmPasswordValid
    ) {
      setFormValidation(true);
    } else {
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
            setsignUpData(result.data);
            setOtpVerify(true);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <Box>
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
              {userExi ? <UserExist /> : ''}
              {formValidation ? <FormValid /> : ''}
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
                    onKeyUp={validateFistName}
                    helperText={fistNameValid ? <FirstName /> : ''}
                  />
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
                    onKeyUp={validateLastName}
                    helperText={lastNameValid ? <LastName /> : ''}
                  />
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
                    onKeyUp={validateEmail}
                    helperText={emailValid ? <EmailValid /> : ''}
                  />
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
                    onKeyUp={validatMobile}
                    helperText={mobileValid ? <MobileValid /> : ''}
                  />
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
                    onKeyUp={validatPassword}
                    helperText={passwordValid ? <PasswordValid /> : ''}
                  />
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
                    onKeyUp={validateconfirmPassword}
                    helperText={
                      confirmPasswordValid ? <ConfirmasswordValid /> : ''
                    }
                  />
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
      <OtpVerification
        props={signUpData}
        OtpVerify={OtpVerify}
        setOtpVerify={setOtpVerify}
      />
    </Box>
  );
};

export default SignUp;
