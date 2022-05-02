import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';

const Dashboard: React.FC = () => (
  <Container sx={{ my: 5, textAlign: 'center' }}>
    <Typography
      component="h1"
      variant="h3"
      sx={{
        fontWeight: 'bold',
        fontSize: '70px',
      }}
    >
      Organize it all
      {' '}
      <br />
      with Bunker app
    </Typography>
    <Box sx={{ mt: 5 }}>
      <Button
        variant="contained"
        sx={{
          fontWeight: 'bold',
          borderRadius: '7px',
          bgcolor: '#e44232',
        }}
      >
        Get Started
      </Button>
    </Box>
    <img style={{ width: '900px', height: '500px' }} src="main-foto.webp" alt="home-page-foto" />
  </Container>
);

export default Dashboard;
