/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { useRootSelector, useAppDispatch } from '../store/hooks';
import { removeItem } from '../store/items-slice';

const TablePlacedItems: React.FC = () => {
  const items = useRootSelector((state) => state.items);
  const dispatch = useAppDispatch();

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
                <IconButton onClick={() => dispatch(removeItem(row.id))}><EditRoundedIcon color="info" /></IconButton>
                <IconButton onClick={() => dispatch(removeItem(row.id))}><DeleteForeverIcon color="error" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} align="center">
              <Button variant="outlined">
                {' '}
                <AddIcon />
                {' '}
                add Item
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TablePlacedItems;