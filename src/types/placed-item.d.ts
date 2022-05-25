import Status from './status-enum';

export type PlacedItems = {
  id: number,
  placeId: number,
  name: string,
  units: string,
  quantity: number,
  status: Status,
  validUntil: string,
};
