import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Status from '../types/status-enum';

type StatusFormControlProps = {
  onChange: {
    (e: React.ChangeEvent): void;
  },
  onBlur: {
    (e: React.FocusEvent): void;
  },
  value: string,
  error: boolean | undefined,
  helperText: string | false | undefined
};
const StatusFormControl: React.FC<StatusFormControlProps> = () => {
  const [status, setStatus] = React.useState<Status | string>('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof status>) => {
    setStatus(event.target.value as Status);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl sx={{ my: 1, minWidth: 552 }}>
      <InputLabel id="status-select-label">Status</InputLabel>
      <Select
        labelId="status-select-label"
        id="status-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={status}
        label="Status"
        onChange={handleChange}
        autoWidth={false}
      >
        <MenuItem value={Status.Wish}>Wish</MenuItem>
        <MenuItem value={Status.Packed}>Packed</MenuItem>
      </Select>
    </FormControl>
  );
};

export default StatusFormControl;
