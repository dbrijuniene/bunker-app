import React from 'react';
import Chip from '@mui/material/Chip';
import { isBefore } from 'date-fns';
import Status from '../../types/status-enum';

type Props = {
  status: Status;
  validUntil: Date;
};

const StatusDisplay: React.FC<Props> = ({ status, validUntil }) => {
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

export default StatusDisplay;
