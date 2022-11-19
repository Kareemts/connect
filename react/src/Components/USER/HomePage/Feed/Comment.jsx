import { Box, Button, Modal, styled } from '@mui/material';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Comment = ({ open, setOpen }) => {

    console.log(open, setOpen);
  return (
    <Box>
      <StyledModal open={open} onClose={() => setOpen(false)}>
        <Box
          width={300}
          height={300}
          padding={3}
          borderRadius={5}
          bgcolor="white"
          sx={{
            backgroundColor: 'white',
            border: 'none',
            outline: 'none',
          }}
        >
          <Button onClick={() => setOpen(false)}>okkkk</Button>
          aaaaaaaa
        </Box>
      </StyledModal>
    </Box>
  );
};

export default Comment;
