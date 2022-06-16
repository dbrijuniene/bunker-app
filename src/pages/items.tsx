import React from 'react';
import {
  useMediaQuery, IconButton, InputAdornment, TextField, Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SharedContainer from '../components/shared-container';
import TablePlacedItems from '../components/table-placed-items';
import theme from '../styles/theme';

const Items: React.FC = () => {
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const [filterValue, setFilterValue] = React.useState('');

  return (
    <SharedContainer>
      <Box>
        <img
          style={isSmall ? { display: 'none' } : { width: '350px', height: '250px' }}
          src="womanInShop.webp"
          alt="shoping"
        />
        <img style={isSmall ? { width: '260px', height: '200px' } : { width: '350px', height: '250px' }} src="allDone.webp" alt="shoping" />
      </Box>
      <TextField
        value={filterValue}
        onChange={(event) => setFilterValue(event.target.value)}
        fullWidth
        label="Search"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TablePlacedItems filterValue={filterValue} />
    </SharedContainer>
  );
};

export default Items;
