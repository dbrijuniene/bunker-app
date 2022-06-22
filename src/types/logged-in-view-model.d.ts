import { LoggedUser } from './logged-user';

type LoggedInViewModel = {
  user: LoggedUser,
  token: string
};

export default LoggedInViewModel;
