import Status from './status-enum';

export type NewPlacedItem = {
  placeId: string,
  name: string,
  quantity: number,
  units: string,
  status: Status,
  validUntil: Date,
};
