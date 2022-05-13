/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';
import {
  Crudentials, TemporaryUser, User, UserRegistration,
} from '../../types';

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

  export const register = async (userRegistrantion: UserRegistration): Promise<Crudentials> => {
    const { data: tempUsers } = await axios.get<TemporaryUser[]>('http://localhost:8000/users');

    if (!(userRegistrantion.email && userRegistrantion.name && userRegistrantion.password && userRegistrantion.repeatPassword && userRegistrantion.surname)) {
      throw new Error('Missing data');
    }
    if (userRegistrantion.password !== userRegistrantion.repeatPassword) {
      throw new Error('Passwords do not match');
    }

    const newUser: TemporaryUser = {
      id: tempUsers.length || 0,
      email: userRegistrantion.email,
      name: userRegistrantion.name,
      password: userRegistrantion.password,
      surname: userRegistrantion.surname,
    };

    const { data: createdUser } = await axios.post<TemporaryUser>('http://localhost:8000/users', newUser);

    return { email: createdUser.email, password: createdUser.password };
  };

}

export default AuthService;
