import { LoggedUser } from './logged-user';

export type SharedState = {
  loading: boolean,
  serverErrorMsg: string | undefined,
  user: LoggedUser | undefined
};
