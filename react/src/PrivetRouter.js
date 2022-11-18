import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivetRouter = () => {
  const token = localStorage.getItem('token');
  let auth = false;
  if (token) {
    auth = true;
  } else {
    auth = false;
  }
  return auth ? <Outlet /> : <Navigate to="/" />;
};
export default PrivetRouter;
