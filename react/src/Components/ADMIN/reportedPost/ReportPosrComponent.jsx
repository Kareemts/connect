import styled from '@emotion/styled';
import {
  Box,
  Button,
  CardMedia,
  Divider,
  Modal,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { server } from '../../../serverPort';
import Reports from './Reports';


const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'translate(3)',
});

const ReportPosrComponent = ({ post }) => {
  const [userData, setUserData] = useState(null);
  const [report, setReport] = useState(false);
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    axios
      .get('/admin/getUserData', {
        params: {
          userId: post.userId,
        },
      })
      .then((result) => {
        console.log(result.data);
        setUserData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, [post.userId]);

  const block = () => {
    axios
      .put('/admin/blockPost', {
        postId: post._id,
      })
      .then((result) => {
        setBlocked(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unblock = () => {
    axios
      .put('/admin/unblockPost', {
        postId: post._id,
      })
      .then((result) => {
        setBlocked(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box m>
      <Box
        p
        sx={{
          border: 1,
          borderRadius: 2,
        }}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Box>
          <Box>
            <CardMedia
              sx={{ borderRadius: 1 }}
              component="img"
              height="100"
              src={`${server}/images/potImages/${post.imageName}`}
              alt="Paella dish"
            />
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Typography fontWeight={'bold'}>Post Caption</Typography>
          <Typography>{post?.postCaption}</Typography>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography fontWeight={'bold'}>Reported Count</Typography>
          <Typography>{post?.reportPost.length}</Typography>
          <Button onClick={() => setReport(true)}>show</Button>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Typography fontWeight={'bold'}>Posted User</Typography>
          <Typography>{userData?.name}</Typography>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {post?.blockPost || blocked ? (
            <Button variant="contained" onClick={() => unblock()}>
              unblock
            </Button>
          ) : (
            <Button variant="contained" color="error" onClick={() => block()}>
              Block
            </Button>
          )}
        </Box>
      </Box>
      <Box>
        <StyledModal open={report} onClose={() => setReport(false)}>
          <Box
            width={450}
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
            <Box>
              <Typography>Reports</Typography>
              <Divider />
            </Box>
            <Box sx={{ overflowY: 'scroll' }} height={500}>
              {post.reportPost?.map((reports, index) => {
                return <Reports key={index} reports={reports} />;
              })}
            </Box>
          </Box>
        </StyledModal>
      </Box>
    </Box>
  );
};

export default ReportPosrComponent;
