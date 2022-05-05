import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';

const Settings: React.FC = () => (
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
          bgcolor: '#e44232',
        }}
      >
        Get Started
      </Button>
    </Box>
  </Container>
);

export default Settings;
