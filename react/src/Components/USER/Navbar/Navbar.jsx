import {
  AppBar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useState } from 'react';
import { Icones, Search, StyledToolbar, UserBozx } from './NavStyle';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#FAFAFA' }}>
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{
            display: { xs: 'none', sm: 'block' },
            color: 'black',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/Home')}
        >
          Connect
        </Typography>
        <Box
          sx={{ display: { xs: 'block', sm: 'none', cursor: 'pointer' } }}
          onClick={() => navigate('/Home')}
        >
          <Box display={'flex'} justifyContent="center" alignItems={'center'}>
            <img width="30" src="../../../../images/LargePng.png" alt="" />
            <Typography variant="h6" sx={{ color: 'black' }}>
              Connect
            </Typography>
          </Box>
        </Box>

        <Search sx={{ display: { xs: 'none', sm: 'block' } }}>
          <InputBase placeholder="Search..." />
        </Search>
        <Icones>
          <HomeIcon
            sx={{
              color: 'black',
              cursor: 'pointer',
              '&:hover': {
                color: '#199FF7',
                transform: 'translate(3)',
                scale: '1.2',
              },
            }}
            onClick={() => navigate('/Home')}
          />
          <Badge badgeContent={4} color="error">
            <QuestionAnswerIcon
              sx={{
                color: 'black',
                cursor: 'pointer',
                '&:hover': {
                  color: '#199FF7',
                  transform: 'translate(3)',
                  scale: '1.2',
                },
              }}
              onClick={() => navigate('/Chat')}
            />
          </Badge>
          <Badge badgeContent={4} color="error">
            <NotificationsActiveIcon
              sx={{
                color: 'black',
                cursor: 'pointer',
                '&:hover': {
                  color: '#199FF7',
                  transform: 'translate(3)',
                  scale: '1.2',
                },
              }}
              onClick={() => navigate('/Notification')}
            />
          </Badge>
          <PersonIcon
            sx={{
              color: 'black',
              cursor: 'pointer',
              '&:hover': {
                color: '#199FF7',
                transform: 'translate(3)',
                scale: '1.2',
              },
            }}
            onClick={() => navigate('/Profile')}
          />
        </Icones>
        <UserBozx onClick={(e) => setOpen(true)}>
          <PersonIcon
            sx={{
              color: 'black',
              cursor: 'pointer',
              '&:hover': {
                color: '#199FF7',
                transform: 'translate(3)',
                scale: '1.2',
              },
            }}
            onClick={() => navigate('/Profile')}
          />
        </UserBozx>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
