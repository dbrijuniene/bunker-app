import React, { createContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crudentials, User, UserRegistration,
} from '../../types';
import useLocalStorage from '../../hooks/use-local-storage-state';
import AuthService from './auth-service';

export type AuthContextType = {
  user: null | User,
  loggedIn: boolean,
  error: string | null,
  clearError: VoidFunction,
  login: (crudentials: Crudentials, next: string) => void,
  logout: VoidFunction,
  register: (userRegistration: UserRegistration) => void
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useLocalStorage<AuthContextType['loggedIn']>('loggedIn', false);
  const [user, setUser] = useLocalStorage<AuthContextType['user']>('user', null);
  const [error, setError] = useState<AuthContextType['error']>(null);

  const loginViaCrudentials = async (crudentials: Crudentials) => {
    const loggedInUser = await AuthService.login(crudentials);
    setLoggedIn(true);
    setUser(loggedInUser);
  };

  const login: AuthContextType['login'] = async (crudentials: Crudentials, next) => {
    try {
      if (error) {
        setError(null);
      }

      loginViaCrudentials(crudentials);
      navigate(next);
    } catch (err) {
      const { message } = (err as Error);
      setError(message);
    }
  };

  const register: AuthContextType['register'] = async (userRegistration: UserRegistration) => {
    try {
      if (error) {
        setError(null);
      }

      const crudentials: Crudentials = await AuthService.register(userRegistration);
      loginViaCrudentials(crudentials);
      navigate('/dashboard');
    } catch (err) {
      const { message } = (err as Error);
      setError(message);
    }
  };

  const logout: AuthContextType['logout'] = () => {
    setLoggedIn(false);
    navigate('/');
  };

  const clearError: AuthContextType['clearError'] = () => {
    setError(null);
  };

  const providerValue = useMemo(() => ({
    user,
    loggedIn,
    error,
    clearError,
    login,
    logout,
    register,
  }), [loggedIn, user, error]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
