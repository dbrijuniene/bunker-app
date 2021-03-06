import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Button,
  IconButton,
  Box,
  Typography,
  TextField,
  Stack,
  useMediaQuery,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import TablePlacedItems from '../components/table-placed-items';
import { useRootSelector, useAppDispatch } from '../store/hooks';
import { Place as PlaceType } from '../types';
import { removePlace, updatePlace } from '../store/places-slice';
import AddPlaceDialog from '../components/add-place-dialog';
import { removeItemsByPlaceId } from '../store/items-slice';
import SharedContainer from '../components/shared-container';
import theme from '../styles/theme';

type PlaceNameProps = {
  place: PlaceType,
};

const PlaceName: React.FC<PlaceNameProps> = ({ place }) => {
  const dispatch = useAppDispatch();

  const placesLength = useRootSelector((state) => state.places.length);

  const [edit, setEdit] = useState(false);

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
      setEdit(false);
    },
    onReset: () => {
      setEdit(false);
    },
  });

  const handleDeleteClick = () => {
    dispatch(removePlace(place.id));
    dispatch(removeItemsByPlaceId(place.id));
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      {edit
        ? (
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              my: 1,
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
              focused
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <Container>
              <Button type="submit" disabled={!(formik.isValid && formik.dirty)} variant="contained">
                {' '}
                <CheckIcon fontSize="small" />
                {' '}
                Save
              </Button>
              <Button type="reset" variant="text">
                {' '}
                <ClearIcon fontSize="small" />
                {' '}
                Cancel
              </Button>
            </Container>

          </Box>
        )
        : (
          <>
            <Typography variant="h5">
              {place.name}
            </Typography>
            <IconButton onClick={() => { setEdit(true); }}><EditRoundedIcon color="info" fontSize="small" /></IconButton>
            {placesLength !== 1
              && (
                <IconButton onClick={handleDeleteClick}>
                  <PlaylistRemoveIcon color="error" fontSize="medium" />
                </IconButton>
              )}
          </>
        )}
    </Stack>
  );
};

type PlaceProps = {
  place: PlaceType,
};

const Place: React.FC<PlaceProps> = ({ place }) => (
  <Box>
    <PlaceName place={place} />
    <TablePlacedItems placeId={place.id} />
  </Box>
);

const Places: React.FC = () => {
  const places = useRootSelector((state) => state.places);
  const [open, setOpen] = React.useState(false);

  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SharedContainer>
      <AddPlaceDialog open={open} handleClose={handleClose} />
      <Button
        onClick={() => setOpen(true)}
        sx={{ margin: '25px' }}
        size={isSmall ? 'small' : 'medium'}
        variant="contained"
        startIcon={<AddIcon fontSize="small" />}
      >
        Add place
      </Button>
      <>
        {places.map((place) => (
          <Place key={place.id} place={place} />
        ))}
      </>
    </SharedContainer>
  );
};

export default Places;
