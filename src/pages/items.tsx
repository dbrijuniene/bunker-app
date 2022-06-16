import React from 'react';
import { useMediaQuery } from '@mui/material';
import SharedContainer from '../components/shared-container';
import TablePlacedItems from '../components/table-placed-items';
import theme from '../styles/theme';

const Items: React.FC = () => {
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SharedContainer>
      <img
        style={isSmall ? { display: 'none' } : { width: '350px', height: '250px' }}
        src="womanInShop.webp"
        alt="shoping"
      />
      <img style={isSmall ? { width: '260px', height: '200px' } : { width: '350px', height: '250px' }} src="allDone.webp" alt="shoping" />
      <TablePlacedItems />
    </SharedContainer>
  );
};

export default Items;
