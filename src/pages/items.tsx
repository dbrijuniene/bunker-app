import React from 'react';
import SharedContainer from '../components/shared-container';
import TablePlacedItems from '../components/table-placed-items';

const Items: React.FC = () => (
  <SharedContainer>
    <img style={{ width: '270px', height: '250px' }} src="planning.webp" alt="shoping" />
    <img style={{ width: '350px', height: '250px' }} src="womanInShop.webp" alt="shoping" />
    <img style={{ width: '350px', height: '250px' }} src="allDone.webp" alt="shoping" />
    <TablePlacedItems />
  </SharedContainer>
);

export default Items;
