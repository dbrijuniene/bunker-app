/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';
import { Crudentials, TemporaryUser, User } from '../../types';

namespace AuthService {

  export const login = async ({ email, password }: Crudentials): Promise<User> => {
    const { data: tempUsers } = await axios.get<TemporaryUser[]>(`http://localhost:8000/users?email=${email}`);
    if (tempUsers.length === 0) {
      throw new Error('User with such email was not found');
    }

    const [tempUser] = tempUsers;

    if (tempUser.password !== password) {
      throw new Error('Passwords do not match');
    }

    return {
      id: tempUser.id,
      name: tempUser.name,
      surname: tempUser.surname,
      email: tempUser.email,
    };
  };

}

export default AuthService;
