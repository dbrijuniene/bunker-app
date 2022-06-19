import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../store/items-slice';
import { PlacedItem } from '../../types';

type Props = {
  row: PlacedItem;
};

const DeleteButton: React.FC<Props> = ({ row }) => {
  const dispatch = useDispatch();

  return (
    <IconButton onClick={() => dispatch(removeItem(row.id))} size="small">
      <DeleteForeverIcon color="error" />
    </IconButton>
  );
};

export default DeleteButton;
