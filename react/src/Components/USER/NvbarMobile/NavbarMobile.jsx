import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useNavigate } from 'react-router-dom';

const NvbarMobile = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      width={'100%'}
      sx={{
        bottom: 0,
        position: 'fixed',
        display: { xs: 'block', sm: 'none' },
        borderTop: 1,
      }}
    >
      <BottomNavigation
        sx={{ backgroundColor: '#FAFAFA' }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<HomeIcon />}
          onClick={() => navigate('/Home')}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<QuestionAnswerIcon />}
          onClick={() => navigate('/Chat')}
        />
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<NotificationsActiveIcon />}
          onClick={() => navigate('/Notification')}
        />
      </BottomNavigation>
    </Box>
  );
};

export default NvbarMobile;
