import styled from '@emotion/styled';
import { Modal, InputBase, Divider, Typography, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Search } from './NavStyle';
import SearchIcon from '@mui/icons-material/Search';
import { axiosUrl } from '../../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

//modal style
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const SearchResult = ({ openSearch, setOpenSearch }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.user.id;
  const navigate = useNavigate();
  const [searchingData, setSearchingData] = useState('');
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const showConnectionProfile = (connectionId, userName) => {
    const name = userName.replaceAll(' ', '_');
    if (connectionId === userId) {
      navigate('/Profile');
    } else {
      navigate(`/user/${name}`, {
        state: { connectionId },
      });
    }
  };

  const serchUser = () => {
    if (searchingData === '') {
      setNoResults(false);
    } else {
      axiosUrl
        .get('/serchUser', {
          params: {
            searchingData,
          },
        })
        .then((result) => {
          console.log(result);
          if (result.data.length <= 0) setNoResults(true);
          if (result.data.length > 0) setNoResults(false);
          setResults(result.data);
        })
        .catch((err) => {});
    }
  };
  return (
    <Box>
      <StyledModal open={openSearch} onClose={() => setOpenSearch(false)}>
        <Box
          width={350}
          height={500}
          padding={3}
          borderRadius={5}
          bgcolor="white"
          sx={{
            backgroundColor: 'white',
            border: 'none',
            outline: 'none',
          }}
        >
          <Box display={'flex'}>
            <Box mr={2}>
              <SearchIcon sx={{ color: '#199FF7' }} />
            </Box>
            <Search sx={{ display: { xs: 'none', sm: 'block' } }}>
              <InputBase
                variant="standard"
                fullWidth
                placeholder="Search..."
                size="small"
                onChange={(e) => {
                  setSearchingData(e.target.value);
                }}
                onKeyUp={serchUser}
              />
            </Search>
          </Box>
          <Divider />
          {noResults ? (
            <Box
              pt={1}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography sx={{ fontSize: 15 }}>No result found</Typography>
            </Box>
          ) : (
            ''
          )}
          {searchingData === '' ? (
            <Box
              pt={15}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography
                sx={{ color: '#b7b7b7', fontWeight: 'bold', fontSize: 25 }}
              >
                Find new connections here
              </Typography>
            </Box>
          ) : (
            <Box sx={{ overflowY: 'scroll', maxHeight: 470 }}>
              {results.map((user) => {
                return (
                  <Box key={user._id} display={'flex'} mt={2}>
                    <Box display={'flex'} alignItems="center">
                      <Avatar
                        src={`/images/profileImages/${user.profileImage}`}
                        alt={'follower.firstName'}
                        sx={{
                          borderRadius: 100,
                          margin: 0.5,
                          width: { xs: '2rem' },
                          height: { xs: '2rem' },
                          cursor: 'pointer',
                        }}
                        onClick={() =>
                          showConnectionProfile(
                            user._id,
                            user.firstName + ' ' + user.lastName
                          )
                        }
                      />
                      <Box m>
                        <Typography sx={{ fontSize: { xs: 13, sm: 15 } }}>
                          {user.firstName + ' ' + user.lastName}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </StyledModal>
    </Box>
  );
};

export default SearchResult;
