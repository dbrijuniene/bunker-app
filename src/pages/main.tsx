import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AuthContext from '../features/auth/auth-context';
import Navbar from '../components/navbar';

const Main: React.FC = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <>
      {loggedIn && <Navbar />}
      <Box component="main">
        <Outlet />
      </Box>
    </>
  );
};

export default Main;
