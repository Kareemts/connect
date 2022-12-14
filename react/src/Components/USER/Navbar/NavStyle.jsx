import { styled, Box, Toolbar } from '@mui/material';

export const Search = styled('div')(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  padding: 1,
  border: 1,
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  display: 'flex',
}));

export const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

export const Icones = styled(Box)(({ theme }) => ({
  display: 'none',
  gap: '20px',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

export const UserBozx = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));
