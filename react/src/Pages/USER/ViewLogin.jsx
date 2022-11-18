import React, { useEffect } from 'react';
import Login from '../../Components/USER/Login/Login';
import { useNavigate } from 'react-router-dom';

const ViewLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('token');
    if (token) {
      navigate('/home');
    } else {
      navigate('/');
    }
    return () => {};
  },[navigate]);
  return (
    <div>
      <Login />
    </div>
  );
};

export default ViewLogin;
