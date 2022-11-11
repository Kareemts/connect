import { styled } from '@mui/material';
import { Typography } from '@mui/material/';

export const LoginPageLogo = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10vh',
  marginTop:'8rem',
  width: '10vh%',
}));

export const LogoCaption = styled(Typography)(() => ({
  fontSize: '22px',
  fontWeight: '900',
  color: '#838383',
}));
