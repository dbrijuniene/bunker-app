import Status from './status-enum';

export type PlacedItem = {
  id: string,
  placeId: string,
  name: string,
  quantity: number,
  units: string,
  status: Status,
  validUntil: string,
};
