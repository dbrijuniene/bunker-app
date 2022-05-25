import React from 'react';
import {
  Container,
  Typography,
  Button,
  IconButton,
  Input,
  Box,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import Items from '../components/items';

const PlaceName: React.FC = () => (
  <Box>
    <Input sx={{ marginBottom: '15px' }} type="text" placeholder="Enter place name" />
    <IconButton><EditRoundedIcon color="info" fontSize="small" /></IconButton>
    <IconButton><DeleteForeverIcon color="error" fontSize="small" /></IconButton>
  </Box>
);

const Places: React.FC = () => (
  <Container sx={{ textAlign: 'center', marginTop: '30px' }}>
    <Button sx={{ margin: '25px' }} variant="outlined">
      {' '}
      <AddIcon />
      {' '}
      add place
    </Button>
    <PlaceName />
    <Items />
  </Container>
);

export default Places;
