/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import {
  Button, IconButton, TextField, Paper, Box,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRootSelector, useAppDispatch } from '../store/hooks';
import { addItem, removeItem } from '../store/items-slice';

const TablePlacedItems: React.FC = () => {
  const items = useRootSelector((state) => state.items);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      status: Yup.number()
        .required('Required'),
      validUntil: Yup.string()
        .required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addItem(values));
      handleClose();
    },
    onReset: () => {
      handleClose();
    },
  });

  return (
    <TableContainer sx={{ maxWidth: 1140, margin: '20px auto' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="center">Unit</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Valid until</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row, i) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th, &:nth-last-child(odd)': { border: -1, bgcolor: 'secondary.main' } }}
            >
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="center">{row.units}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.validUntil}</TableCell>
              <TableCell align="right">
                <IconButton><EditRoundedIcon color="info" /></IconButton>
                <IconButton onClick={() => dispatch(removeItem(row.id))}><DeleteForeverIcon color="error" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} align="center">
              <Button onClick={() => { setOpen(true); }} variant="outlined">
                {' '}
                <AddIcon fontSize="small" />
                {' '}
                add Item
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
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
              type="text"
              fullWidth
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
            />
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
            <Button type="submit" variant="contained">Save</Button>
            <Button type="reset">Cancel</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </TableContainer>
  );
};

export default TablePlacedItems;
