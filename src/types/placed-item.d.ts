import Status from './status-enum';

export type PlacedItem = {
  id: number,
  placeId: number,
  name: string,
  quantity: number,
  units: string,
  status: Status,
  validUntil: string,
};
