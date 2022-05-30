import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useRootSelector } from '../store/hooks';

const Main: React.FC = () => {
  const user = useRootSelector((state) => state.shared.user);
  return (
    <>
      {user && <Navbar />}
      <Box component="main">
        <Outlet />
      </Box>
    </>
  );
};

export default Main;
