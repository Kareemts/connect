import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commentModal: '',
};

const commentModalSlice = createSlice({
  name: 'commnetModal',
  initialState,
  reducers: {
    openCommentModal: (state) => {
      state.commentModal = true
    },
    colseCommentModal: (state) => {
      state.commentModal = false;
    },
  },
});

export default commentModalSlice.reducer;
export const { openCommentModal, colseCommentModal } =
  commentModalSlice.actions;
