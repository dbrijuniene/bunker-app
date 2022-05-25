export type Item = {
  id: string,
  name: string,
  units: string,
  quantity: number,
  status: Status,
  validUntil: string,
};

export enum Status {
  Wish,
  Packed,
  Expired,
}
