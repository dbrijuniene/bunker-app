import React from 'react';
import {
  Box, Button, TextField, Stack,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useRootSelector } from '../store/hooks';
import { addPlace } from '../store/places-slice';

type AddPlaceDialogProps = {
  open: boolean,
  handleClose: () => void
};

const AddPlaceDialog: React.FC<AddPlaceDialogProps> = ({
  open, handleClose,
}) => {
  const dispatch = useAppDispatch();
  const user = useRootSelector((state) => state.shared.user);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addPlace({ name: values.name, userId: user?.id as number }));
      resetForm();
      handleClose();
    },
    onReset: () => {
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          pt="15px"
        >
          <img style={{ width: '170px', height: '150px' }} src="list.jpg" alt="shoping" />
          <DialogTitle sx={{ textAlign: 'center', fontSize: '1.7rem' }}>New place</DialogTitle>
        </Stack>
        <DialogContent>
          <TextField
            margin="none"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: '25px' }}>
          <Button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            variant="contained"
          >
            Save
          </Button>
          <Button type="reset">Cancel</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddPlaceDialog;
