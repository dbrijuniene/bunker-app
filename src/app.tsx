import React, { useEffect } from 'react';
import {
  Routes, Route, Navigate, useLocation, useNavigate,
} from 'react-router-dom';
import Main from './pages/main';
import Items from './pages/items';
import Places from './pages/places';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login';
import RegisterPage from './pages/registration';
import { useRootSelector, useAppDispatch } from './store/hooks';
import { reload } from './store/shared-slice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useRootSelector((state) => state.shared.user);

  useEffect(() => {
    if (!user && sessionStorage.getItem(process.env.REACT_APP_AUTH_TOKEN as string)) {
      dispatch(reload()).unwrap().then(() => {
        navigate(location.pathname);
      }).catch(() => navigate('/'));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="registration" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="items" element={user ? <Items /> : <Navigate to="/" />} />
        <Route path="places" element={user ? <Places /> : <Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
