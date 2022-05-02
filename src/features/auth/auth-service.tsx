// import axios from 'axios';
// import { Crudentials, User, TemporaryUser } from '../../types';
import { Crudentials, User } from '../../types';
import data from '../../data/data';

/* eslint-disable @typescript-eslint/no-namespace */
namespace AuthService {

  export const login = async ({ email, password }: Crudentials): Promise<User> => {
    // NEVEIKIA const { data: tempUsers } = await axios.get<TemporaryUser[]>(`http://localhost:8000/users?email=${email}`);
    const user = data.users.find((u) => u.email === email);

    if (!user) {
      throw new Error('User with such email was not found');
    }

    if (user.password !== password) {
      throw new Error('Passwords do not match');
    }

    return user;
  };

}

export default AuthService;
