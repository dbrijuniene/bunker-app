import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from '../types/item';
import ItemsService from '../features/auth/items-service';

const Items: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function getItems() {
      const response: Item[] = await ItemsService.get();
      setItems(response);
    }

    getItems();
  }, []);

  return (
    <TableContainer sx={{ maxWidth: 1130, margin: '20px auto' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="center">Unit</TableCell>
            <TableCell align="right">Valid until</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="center">{row.units}</TableCell>
              <TableCell align="right">{row.validUntil}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Items;
