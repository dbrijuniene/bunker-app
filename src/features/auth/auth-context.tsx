import React, { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crudentials, User, UserRegistration,
} from '../../types';
import useLocalStorage from '../../hooks/use-local-storage-state';
import AuthService from './auth-service';
import { useRootSelector, useAppDispatch } from '../../store/hooks';
import { resetServerErrorMsg, setLoading, setServerErrorMsg } from '../../store/shared-slice';

export type AuthContextType = {
  user: null | User,
  loggedIn: boolean,
  login: (crudentials: Crudentials, next: string) => void,
  logout: VoidFunction,
  register: (userRegistration: UserRegistration) => void,
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useLocalStorage<AuthContextType['loggedIn']>('loggedIn', false);
  const [user, setUser] = useLocalStorage<AuthContextType['user']>('user', null);
  const serverErrorMsg = useRootSelector((state) => state.shared.serverErrorMsg);
  const dispatch = useAppDispatch();

  const loginViaCrudentials = async (crudentials: Crudentials) => {
    const loggedInUser = await AuthService.login(crudentials);
    setLoggedIn(true);
    setUser(loggedInUser);
  };

  const login: AuthContextType['login'] = async (crudentials: Crudentials, next) => {
    try {
      dispatch(setLoading(true));
      if (serverErrorMsg) {
        dispatch(resetServerErrorMsg());
      }

      await loginViaCrudentials(crudentials);
      navigate(next);
    } catch (err) {
      const { message } = (err as Error);
      dispatch(setServerErrorMsg(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const register: AuthContextType['register'] = async (userRegistration: UserRegistration) => {
    try {
      dispatch(setLoading(true));
      if (serverErrorMsg) {
        dispatch(resetServerErrorMsg());
      }

      const crudentials: Crudentials = await AuthService.register(userRegistration);
      await loginViaCrudentials(crudentials);
      navigate('/dashboard');
    } catch (err) {
      const { message } = (err as Error);
      dispatch(setServerErrorMsg(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout: AuthContextType['logout'] = () => {
    setLoggedIn(false);
    navigate('/');
  };

  const providerValue = useMemo(() => ({
    user,
    loggedIn,
    login,
    logout,
    register,
  }), [loggedIn, user]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
