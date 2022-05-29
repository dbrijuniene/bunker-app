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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppDispatch } from '../store/hooks';
import { addItem } from '../store/items-slice';
import Status from '../types/status-enum';
import { NewPlacedItem } from '../types/new-placed-item';

type ItemDialogProps = {
  open: boolean,
  handleClose: () => void
  placeId: number
};

const ItemDialog: React.FC<ItemDialogProps> = ({
  open, handleClose, placeId,
}) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      units: '',
      quantity: '',
      status: '',
      validUntil: null,
      placeId,
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
      validUntil: Yup.date()
        .transform((v) => (v instanceof Date && !Number.isNaN(v) ? v : null))
        .nullable()
        .required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newItem: NewPlacedItem = {
        name: values.name,
        placeId,
        quantity: values.quantity as unknown as number,
        status: values.status as unknown as Status,
        units: values.units,
        validUntil: values.validUntil as unknown as Date,
      };
      dispatch(addItem(newItem));
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
          <DatePicker
            onChange={(value) => formik.setFieldValue('validUntil', value, true)}
            value={formik.values.validUntil}
            label="Valid until"
            renderInput={(params) => (
              <TextField
                margin="dense"
                id="validUntil"
                type="date"
                fullWidth
                variant="outlined"
                onBlur={formik.handleBlur}
                helperText={formik.touched.validUntil && formik.errors.validUntil}
                {...params}
                //   https://stackoverflow.com/questions/70634443/using-the-mui-datepicker-with-yup-and-react-hook-form-the-error-prop-doesnt-w //
                error={formik.touched.validUntil && Boolean(formik.errors.validUntil)}
              />
            )}
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
