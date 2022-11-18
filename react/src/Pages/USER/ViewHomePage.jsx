import { Box, Stack } from '@mui/system';
import Feed from '../../Components/USER/HomePage/Feed/Feed';
import LeftBar from '../../Components/USER/HomePage/LeftBar/LeftBar';
import RightBar from '../../Components/USER/HomePage/RightBar/RightBar';
import ViewNavbar from './ViewNavbar';
import ViewNavbarMobile from './ViewNavbarMobile';

const ViewHomePage = () => {
  return (
    <Box>
      <Stack
        direction="row"
        spacing={3}
        justifyContent="space-between"
        mt={8.4}
        mb={8}
      >
        <ViewNavbar />
        <LeftBar />
        <Feed />
        <RightBar />
      </Stack>

      <ViewNavbarMobile />
    </Box>
  );
};

export default ViewHomePage;
