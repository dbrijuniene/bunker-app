/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Button,
  IconButton,
  Input,
  Box,
  Typography,
  TextField,
  Stack,
  Paper,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import AddIcon from '@mui/icons-material/Add';
import TablePlacedItems from '../components/table-placed-items';
import { useRootSelector, useAppDispatch } from '../store/hooks';
import { Place as PlaceType } from '../types';
import { removePlace, updatePlace } from '../store/places-slice';

type PlaceNameProps = {
  place: PlaceType,
};

const PlaceName: React.FC<PlaceNameProps> = ({ place }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: place.name,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(updatePlace({ id: place.id, newName: values.name }));
      resetForm({ values: { name: values.name } });
    },
  });

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      {/* <Typography variant="h5">
        {place.name}
      </Typography>
      <IconButton><EditRoundedIcon color="info" fontSize="small" /></IconButton>
      <IconButton onClick={() => dispatch(removePlace(place.id))}><PlaylistRemoveIcon color="error" fontSize="medium" /></IconButton> */}
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          my: 2,
        }}
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
      >
        <TextField
          id="name"
          label="Place name"
          type="text"
          variant="outlined"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}

        />
        <Button type="submit" disabled={!(formik.isValid && formik.dirty)} variant="contained">Save</Button>
        <Button type="reset" variant="text">Cancel</Button>
      </Box>

    </Stack>
  );
};

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
    <PlaceName place={place} />
    <TablePlacedItems />
  </Box>
);

const Places: React.FC = () => {
  const places = useRootSelector((state) => state.places);

  return (
    <Container sx={{ textAlign: 'center', marginTop: '30px' }}>
      {places.map((place) => (
        <Place key={place.id} place={place} />
      ))}
    </Container>
  );
};

export default Places;
