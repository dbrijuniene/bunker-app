import React from 'react';
import { IconButton } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { PlacedItem } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { removeItem } from '../../store/items-slice';

type Props = {
  onEdit: () => void,
  row: PlacedItem
};

const TableRowActions: React.FC<Props> = ({ onEdit, row }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <IconButton onClick={onEdit}>
        <EditRoundedIcon color="info" />
      </IconButton>
      <IconButton onClick={() => dispatch(removeItem(row.id))} size="small">
        <DeleteForeverIcon color="error" />
      </IconButton>
    </>
  );
};

export default TableRowActions;
