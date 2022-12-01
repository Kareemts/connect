import { Box, Container, Stack } from '@mui/system';
import React from 'react';
import { LoginPageLogo, LogoCaption } from './StyleLogin';
import './Login.css';
import LoginForm from './LoginForm';
import {} from 'react-router-dom';

const Login = () => {
  return (
    <Box>
      <Container>
        <Stack direction="row" spacing={1} justifyContent="space-evenly">
          <LoginPageLogo sx={{ display: { xs: 'none', md: 'block' } }}>
            <div>
              <lottie-player
                src="https://assets6.lottiefiles.com/packages/lf20_osdxlbqq.json"
                background="transparent"
                speed="1"
                style={{ width: '300px', height: '300px' }}
                loop
                autoplay
              ></lottie-player>
              {/* <img src="../../../../images/LargePng.png" alt="" /> */}
              <LogoCaption variant="h4" align="center">
                CREATE NEW CONNECTIONS
              </LogoCaption>
              <LogoCaption variant="h4" align="center">
                WITH CONNECT
              </LogoCaption>
            </div>
          </LoginPageLogo>
          <Box>
            <LoginForm />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
