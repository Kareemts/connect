import {
  Avatar,
  Badge,
  Container,
  Divider,
  InputBase,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ChatBox } from './StyledChat';

const Chat = () => {
  return (
    <Box
      sx={{
        marginTop: {
          xs: 6,
          sm: 10,
        },
      }}
    >
      <Container component="main" maxWidth="md" flex={6}>
        <Box display={'flex'} justifyContent="center">
          <Box
            sx={{
              backgroundColor: {
                xs: 'F3F2EF',
                sm: 'white',
              },
              minHeight: 500,
              boxShadow: {
                xs: 'none',
                sm: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              },
              marginTop: {
                xs: 1,
                sm: 0,
              },
            }}
            borderRadius={2}
            flex={1.5}
          >
            <Box
              sx={{ display: { xs: 'none', sm: 'block' } }}
              display={'flex'}
              justifyContent="center"
              p
              flex={2}
            >
              <Typography fontWeight={'bold'}>Name</Typography>
            </Box>
            <Divider sx={{ display: { xs: 'none', sm: 'block' } }} />
            <Box p flex={2} borderRadius={2}>
              <Box p display={'flex'} justifyContent="space-between">
                <Box display={'flex'} alignItems="center">
                  <Avatar />
                  <Typography ml>Name</Typography>
                </Box>
              </Box>
              <Box
                p
                display={'flex'}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display={'flex'} alignItems="center">
                  <Avatar></Avatar>
                  <Typography ml>Name</Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Badge badgeContent={4} color="error"></Badge>
                  <Typography
                    ml={2}
                    sx={{ fontSize: '1.5vh', color: '#8E8E8E' }}
                  >
                    1hr ago
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            p
            m
            flex={3}
            bgcolor={'white'}
            sx={{
              display: { xs: 'none', sm: 'block' },
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            }}
            borderRadius={5}
          >
            <Box p flex={2} borderRadius={2}>
              <Box
                sx={{ display: { xs: 'none', sm: 'block' } }}
                display={'flex'}
                justifyContent="center"
                p
                flex={2}
              >
                <Typography fontWeight={'bold'}>Name</Typography>
              </Box>
              <Divider sx={{ display: { xs: 'none', sm: 'block' } }} />
            </Box>
            <Box mt={47}>
              <Divider />
              <ChatBox>
                <InputBase placeholder="Type a message..." />
              </ChatBox>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Chat;
