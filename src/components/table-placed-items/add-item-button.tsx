import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  handleOpen: () => void;
  small?: boolean;
};

const AddButton: React.FC<Props> = ({ handleOpen, small = false }) => (
  <Button
    onClick={handleOpen}
    variant="outlined"
    size={small ? 'small' : 'medium'}
    startIcon={<AddIcon fontSize="small" />}
  >
    Add Item
  </Button>
);

export default AddButton;
