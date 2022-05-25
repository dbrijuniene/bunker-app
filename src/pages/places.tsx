import React from 'react';
import {
  Container,
  Button,
  IconButton,
  Input,
  Box,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import TablePlacedItems from '../components/table-placed-items';
import { useRootSelector } from '../store/hooks';
import { Place as PlaceType } from '../types';

const PlaceName: React.FC = () => (
  <Box>
    <Input sx={{ marginBottom: '15px' }} type="text" placeholder="Enter place name" />
    <IconButton><EditRoundedIcon color="info" fontSize="small" /></IconButton>
    <IconButton><DeleteForeverIcon color="error" fontSize="small" /></IconButton>
  </Box>
);

type PlaceProps = {
  place: PlaceType,
};

const Place: React.FC<PlaceProps> = ({ place }) => (
  <Box>
    <Button sx={{ margin: '25px' }} variant="outlined">
      {' '}
      <AddIcon />
      {' '}
      add place
    </Button>
    <PlaceName />
    <TablePlacedItems />
  </Box>
);

const Places: React.FC = () => {
  const places = useRootSelector((state) => state.places);

  return (
    <Container sx={{ textAlign: 'center', marginTop: '30px' }}>
      {places.map((place) => (
        <Place place={place} />
      ))}
    </Container>
  );
};

export default Places;
