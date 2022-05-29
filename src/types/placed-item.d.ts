import Status from './status-enum';

export type PlacedItems = {
  id: number,
  placeId: number,
  name: string,
  quantity: number,
  units: string,
  status: Status,
  validUntil: Date,
};
