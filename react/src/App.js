import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import ViewHomePage from './Pages/USER/ViewHomePage';
import ViewNotification from './Pages/USER/ViewNotification';
import ViewProfile from './Pages/USER/ViewProfile';
import ViewSignup from './Pages/USER/ViewSignup';
import ViewLogin from './Pages/USER/ViewLogin';
import ViewChat from './Pages/USER/ViewChat';
import { Box } from '@mui/material';
import PrivetRouter from './PrivetRouter';
import Comment from './Components/USER/HomePage/Feed/Comment';

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewLogin />} />
          <Route path="/Sign-Up" element={<ViewSignup />} />
          <Route element={<PrivetRouter />}>
            <Route path="/home" element={<ViewHomePage />} />
            <Route path="/comments/:id" element={<Comment />} />
            <Route path="/Profile" element={<ViewProfile />} />
            <Route path="/Notification" element={<ViewNotification />} />
            <Route path="/Chat" element={<ViewChat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
