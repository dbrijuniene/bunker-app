/* eslint-disable no-debugger */
import React from 'react';
import {
  Box, Button, TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../store/hooks';
import { addItem } from '../store/items-slice';
import Status from '../types/status-enum';
import StatusFormControl from './status-form-control';

type ItemDialogProps = {
  open: boolean,
  handleClose: () => void
};

const ItemDialog: React.FC<ItemDialogProps> = ({ open, handleClose }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      units: '',
      quantity: '',
      status: '',
      validUntil: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required'),
      quantity: Yup.number()
        .required('Required')
        .moreThan(0, 'Must be positive numbers'),
      units: Yup.string()
        .required('Required'),
      status: Yup.string()
        .required('Required'),
      validUntil: Yup.string()
        .required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addItem(values));
      resetForm();
      handleClose();
    },
    onReset: () => {
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>New item</DialogTitle>
      <Box component="form" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <DialogContent>
          <TextField
            margin="dense"
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
          <TextField
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
          <TextField
            margin="dense"
            id="units"
            label="Units"
            type="text"
            fullWidth
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.units}
            error={formik.touched.units && Boolean(formik.errors.units)}
            helperText={formik.touched.units && formik.errors.units}
          />
          <TextField
            margin="dense"
            id="status"
            label="Status"
            fullWidth
            variant="outlined"
            onChange={formik.handleChange('status')}
            onBlur={formik.handleBlur('status')}
            value={formik.values.status}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
            select
          >
            <MenuItem value={Status.Wish}>Wish</MenuItem>
            <MenuItem value={Status.Packed}>Packed</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            id="validUntil"
            label="Valid until"
            type="text"
            fullWidth
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.validUntil}
            error={formik.touched.validUntil && Boolean(formik.errors.validUntil)}
            helperText={formik.touched.validUntil && formik.errors.validUntil}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: '25px' }}>
          <Button disabled={!(formik.isValid && formik.dirty)} type="submit" variant="contained">Save</Button>
          <Button type="reset">Cancel</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ItemDialog;
