import { Container } from '@mui/material';
import React from 'react';

type SharedContainerProps = {
  children: React.ReactElement | React.ReactElement[]
};
const SharedContainer: React.FC<SharedContainerProps> = ({ children }) => (
  <Container sx={{ textAlign: 'center', marginTop: '30px' }}>
    {children}
  </Container>
);

export default SharedContainer;
