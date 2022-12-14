import styled from '@emotion/styled';
import { Divider, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import Logout from './Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

//modal style
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Settings = ({ settings, setSettings }) => {
  const [editProfile, setEditProfile] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const [logout, setLogout] = useState(false);
  return (
    <Box>
      <StyledModal open={settings} onClose={() => setSettings(false)}>
        <Box
          width={550}
          height={550}
          padding={3}
          borderRadius={5}
          bgcolor="white"
          sx={{
            backgroundColor: 'white',
            border: 'none',
            outline: 'none',
          }}
        >
          <Box
            display={'flex'}
            alignItems="center"
            justifyContent={'space-between'}
          >
            <Typography variant="h6">Settings</Typography>
            <Box
              sx={{
                cursor: 'pointer',
                '&:hover': { color: 'black', transform: 's' },
              }}
              color={'#199FF7'}
            >
              <CloseIcon onClick={() => setSettings(false)} />
            </Box>
          </Box>
          <Divider />
          <Box display={'flex'}>
            <Box
              sx={{ width: { xs: 50, sm: 200 } }}
              m
              p={2}
              height={478}
              
            >
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                color={editProfile ? '#199FF7' : 'black'}
                mt={5}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#199FF7', transform: 's' },
                }}
                onClick={() => {
                  setEditProfile(true);
                  setChangePassword(false);
                  setLogout(false);
                }}
              >
                <AccountCircleIcon />
                <Typography m fontWeight={'bold'}>
                  Account
                </Typography>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                color={changePassword ? '#199FF7' : 'black'}
                m
                mt={5}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#199FF7', transform: 's' },
                }}
                onClick={() => {
                  setEditProfile(false);
                  setChangePassword(true);
                  setLogout(false);
                }}
              >
                <KeyIcon />
                <Typography fontWeight={'bold'} m>
                  Password
                </Typography>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                color={logout ? '#199FF7' : 'black'}
                m
                mt={5}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#199FF7', transform: 's' },
                }}
                onClick={() => {
                  setEditProfile(false);
                  setChangePassword(false);
                  setLogout(true);
                }}
              >
                <PowerSettingsNewIcon />
                <Typography fontWeight={'bold'} m>
                  {' '}
                  Logout
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ width: { xs: 170, sm: 350 } }}
              m
              height={510}
              borderRadius={2}
              boxShadow={'0 1px 2px -1px rgb(0 0 0 / 0.3)'}
            >
              {editProfile ? <EditProfile /> : ''}
              {changePassword ? <ChangePassword /> : ''}
              {logout ? <Logout setSettings={setSettings} /> : ''}
            </Box>
          </Box>
        </Box>
      </StyledModal>
    </Box>
  );
};

export default Settings;
