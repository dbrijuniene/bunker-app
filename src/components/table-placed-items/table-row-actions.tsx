import React from 'react';
import { IconButton } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { PlacedItem } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { removeItem } from '../../store/items-slice';

type Props = {
  handleOpen: () => void,
  row: PlacedItem
};

const TableRowActions: React.FC<Props> = ({ handleOpen, row }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <IconButton onClick={handleOpen}>
        <EditRoundedIcon color="info" />
      </IconButton>
      <IconButton onClick={() => dispatch(removeItem(row.id))} size="small">
        <DeleteForeverIcon color="error" />
      </IconButton>
    </>
  );
};

export default TableRowActions;
