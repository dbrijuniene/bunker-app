import Status from './status-enum';

export type Item = {
  id: number,
  name: string,
  units: string,
  quantity: number,
  status: Status,
  validUntil: string,
};
