import { Container, Paper, Typography } from '@mui/material';
import React from 'react';

const AddNewItems: React.FC = () => (
  <Container sx={{ my: 5 }}>
    <Paper sx={{ p: 5 }}>
      <Typography sx={{ color: 'black' }} component="h1" variant="h3">Add new items</Typography>
    </Paper>
  </Container>
);

export default AddNewItems;
