import React, { useEffect, useRef } from 'react';
import {
  Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import { useRootSelector } from '../store/hooks';
import ItemDialog from './item-dialog';
import AddButton from './table-placed-items/add-item-button';
import StatusDisplay from './table-placed-items/status-display';
import TableRowActions from './table-placed-items/table-row-actions';
import { PlacedItem } from '../types';

type TablePlacedItemsProps = {
  filterValue?: string
  placeId?: number
};

const TablePlacedItems: React.FC<TablePlacedItemsProps> = ({ filterValue, placeId }) => {
  // https://stackoverflow.com/questions/6158828/searching-for-name-using-javascript
  const regexExpression = filterValue ? new RegExp(`${filterValue}.+$`, 'i') : undefined;

  const placeIds = useRootSelector(
    (state) => state.places.map((p) => p.id),
  );
  const items = useRootSelector(
    (state) => state.items
      .filter((i) => (placeId ? i.placeId === placeId : placeIds.indexOf(i.placeId) !== -1))
      .filter((e) => (regexExpression ? e.name.search(regexExpression) !== -1 : true)),
  );

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(placeId ? 5 : -1);
  const [editItem, setEditItem] = React.useState<PlacedItem | undefined>(undefined);
  const [count, setCount] = React.useState<number>(0);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      setOpen(true);
    }
    didMountRef.current = true;
  }, [editItem, count]);

  const handleDialogOpen = (row?: PlacedItem) => {
    setEditItem(row);
    setCount(count + 1);
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
            ).map((row) => (
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
                      <TableRowActions onEdit={() => handleDialogOpen(row)} row={row} />
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
                        <AddButton handleOpen={() => handleDialogOpen()} small />
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
                          <TableRowActions onEdit={() => handleDialogOpen(row)} row={row} />
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
                          <AddButton handleOpen={() => handleDialogOpen()} />
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
      {placeId && <ItemDialog open={open} handleClose={handleDialogClose} placeId={placeId} editItem={editItem} />}
    </TableContainer>
  );
};

export default TablePlacedItems;
