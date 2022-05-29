import { Container } from '@mui/material';
import React from 'react';
import TablePlacedItems from '../components/table-placed-items';

const Items: React.FC = () => (
  <Container sx={{ textAlign: 'center', marginTop: '30px' }}>
    <TablePlacedItems />
  </Container>
);

export default Items;
