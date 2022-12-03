import styled from '@emotion/styled';
import { Divider, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
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
              borderRadius={2}
              boxShadow={'0px 0px 37px -16px rgba(205, 202, 202, 0.8)'}
            >
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                mt={5}
              >
                <AccountCircleIcon />
                <Typography m fontWeight={'bold'}>
                  Profile
                </Typography>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                m
                mt={5}
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
                m
                mt={5}
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
              boxShadow={'0px 0px 37px -16px rgba(205, 202, 202, 0.8)'}
            >
              <EditProfile />
              <ChangePassword />
              <Logout />
            </Box>
          </Box>
        </Box>
      </StyledModal>
    </Box>
  );
};

export default Settings;
