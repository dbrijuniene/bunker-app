import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import {
  Button, IconButton, Paper, Chip, TablePagination, Grid, useMediaQuery,
} from '@mui/material';
// import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { format, isBefore } from 'date-fns';
import { useDispatch } from 'react-redux';
import { useRootSelector, useAppDispatch } from '../store/hooks';
import { removeItem } from '../store/items-slice';
import ItemDialog from './item-dialog';
import Status from '../types/status-enum';
import { PlacedItem } from '../types';

type StatusDisplayProps = {
  status: Status
  validUntil: Date
};

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, validUntil }) => {
  let result;
  switch (status) {
    case Status.Wish:
      result = <Chip label="Wish" size="small" color="info" />;
      break;
    case Status.Packed:
      result = isBefore(new Date(), validUntil)
        ? <Chip label="Packed" size="small" color="success" /> : <Chip label="Expired" size="small" color="error" />;
      break;

    default:
      break;
  }
  return result ?? null;
};

type DeleteButtonProps = {
  row: PlacedItem
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ row }) => {
  const dispatch = useDispatch();

  return (
    <IconButton onClick={() => dispatch(removeItem(row.id))} size="small">
      <DeleteForeverIcon color="error" />
    </IconButton>
  );
};

type AddButtonProps = {
  handleOpen: () => void,
  small?: boolean
};

const AddButton: React.FC<AddButtonProps> = ({ handleOpen, small = false }) => (
  <Button
    onClick={handleOpen}
    variant="outlined"
    size={small ? 'small' : 'medium'}
    startIcon={<AddIcon fontSize="small" />}
  >
    Add Item
  </Button>
);

type TablePlacedItemsProps = {
  placeId?: number
};

const TablePlacedItems: React.FC<TablePlacedItemsProps> = ({ placeId }) => {
  const placeIds = useRootSelector(
    (state) => state.places.map((p) => p.id),
  );
  const items = useRootSelector(
    (state) => state.items.filter((i) => (placeId ? i.placeId === placeId : placeIds.indexOf(i.placeId) !== -1)),
  );
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(placeId ? 5 : -1);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <TableContainer sx={{ maxWidth: 1140, margin: '20px auto' }} component={Paper}>
      {isSmall ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name, Quantity, Unit</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Valid until</TableCell>
              {placeId && (<TableCell />)}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : items
            )
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: -1 } }}
                >
                  <TableCell component="th" scope="row">
                    {`${row.name}: ${row.quantity} (${row.units})`}
                  </TableCell>
                  <TableCell padding="none" size="small" align="center">
                    <StatusDisplay status={row.status} validUntil={new Date(row.validUntil)} />
                  </TableCell>
                  <TableCell align="center">{format(new Date(row.validUntil), 'P')}</TableCell>
                  {placeId
                    && (
                      <TableCell padding="none" align="left">
                        {/* <IconButton size="small"><EditRoundedIcon color="info" /></IconButton> */}
                        <DeleteButton row={row} />
                      </TableCell>
                    )}
                </TableRow>
              ))}
          </TableBody>
          {placeId
            && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6}>
                    <Grid
                      container
                      direction="column-reverse"
                      justifyContent="center"
                      alignItems="center"
                      paddingBottom="15px"
                    >
                      <Grid item xs={5} />
                      <Grid
                        item
                        xs={2}
                      >
                        <AddButton handleOpen={handleOpen} small />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <TablePagination
                          component="div"
                          size="small"
                          rowsPerPageOptions={[10]}
                          count={items.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              'aria-label': 'rows per page',
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          sx={{ '&:nth-last-of-type(odd)': { border: 0 } }}
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
        </Table>
      )
        : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="center">Unit</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Valid until</TableCell>
                {placeId && (<TableCell />)}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : items
              )
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&::nth-last-of-type td, &::nth-last-of-type th, &::nth-last-of-type(odd)': { border: -1, bgcolor: 'secondary.main' } }}
                  >
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="center">{row.units}</TableCell>
                    <TableCell align="center">
                      <StatusDisplay status={row.status} validUntil={new Date(row.validUntil)} />
                    </TableCell>
                    <TableCell align="right">{format(new Date(row.validUntil), 'PPP')}</TableCell>
                    {placeId
                      && (
                        <TableCell align="right">
                          {/* <IconButton onClick={handleOpen}><EditRoundedIcon color="info" /></IconButton> */}
                          <DeleteButton row={row} />
                        </TableCell>
                      )}
                  </TableRow>
                ))}
            </TableBody>
            {placeId
              && (
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item xs={5} />
                        <Grid
                          item
                          xs={2}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <AddButton handleOpen={handleOpen} />
                        </Grid>
                        <Grid
                          item
                          xs={5}
                          sx={{
                            display: 'flex',
                            justifyContent: 'right',
                            alignItems: 'center',
                          }}
                        >
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 15, { label: 'All', value: -1 }]}
                            count={items.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{ '&:nth-last-of-type(odd)': { border: 0 } }}
                            component="div"
                          />
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              )}
          </Table>
        )}
      {placeId && <ItemDialog open={open} handleClose={handleClose} placeId={placeId} />}
    </TableContainer>
  );
};

export default TablePlacedItems;
