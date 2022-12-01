import styled from '@emotion/styled';
import { Box, Card, CardActionArea, CardMedia, Modal } from '@mui/material';
import React from 'react';
//modal style
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const ViewPost = ({ viewPost, setViewPost, imageName }) => {
  return (
    <StyledModal open={viewPost} onClose={() => setViewPost(false)}>
      <Box
        padding={3}
        borderRadius={5}
        sx={{
          border: 'none',
          outline: 'none',
        }}
      >
        {' '}
        <Card sx={{ margin: '5px' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{
                borderRadius: 1,
                width: {
                  xs: '23rem',
                  sm: '40rem',
                },
                height: {
                  xs: '23rem',
                  sm: '40rem',
                },
              }}
              src={`/images/potImages/${imageName}`}
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
      </Box>
    </StyledModal>
  );
};

export default ViewPost;
