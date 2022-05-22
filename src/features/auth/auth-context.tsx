import React, { createContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crudentials, User, UserRegistration,
} from '../../types';
import useLocalStorage from '../../hooks/use-local-storage-state';
import AuthService from './auth-service';
import { useRootSelector, useAppDispatch } from '../../store/hooks';
import { setLoading } from '../../store/shared-slice';

export type AuthContextType = {
  user: null | User,
  loggedIn: boolean,
  error: string | null,
  clearError: VoidFunction,
  login: (crudentials: Crudentials, next: string) => void,
  logout: VoidFunction,
  register: (userRegistration: UserRegistration) => void,
  loading: boolean
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useLocalStorage<AuthContextType['loggedIn']>('loggedIn', false);
  const [user, setUser] = useLocalStorage<AuthContextType['user']>('user', null);
  const [error, setError] = useState<AuthContextType['error']>(null);
  const loading = useRootSelector((state) => state.shared.loading);
  const dispatch = useAppDispatch();

  const loginViaCrudentials = async (crudentials: Crudentials) => {
    const loggedInUser = await AuthService.login(crudentials);
    setLoggedIn(true);
    setUser(loggedInUser);
  };

  const login: AuthContextType['login'] = async (crudentials: Crudentials, next) => {
    try {
      dispatch(setLoading(true));
      if (error) {
        setError(null);
      }

      loginViaCrudentials(crudentials);
      navigate(next);
    } catch (err) {
      const { message } = (err as Error);
      setError(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const register: AuthContextType['register'] = async (userRegistration: UserRegistration) => {
    try {
      dispatch(setLoading(true));
      if (error) {
        setError(null);
      }

      const crudentials: Crudentials = await AuthService.register(userRegistration);
      loginViaCrudentials(crudentials);
      navigate('/dashboard');
    } catch (err) {
      const { message } = (err as Error);
      setError(message);
    } finally {
      dispatch(setLoading(false));
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
    loading,
  }), [loggedIn, user, error, loading]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
