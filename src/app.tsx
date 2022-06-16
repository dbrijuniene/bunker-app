import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/main';
import Items from './pages/items';
import Places from './pages/places';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login';
import RegisterPage from './pages/registration';
import { useRootSelector } from './store/hooks';

const App: React.FC = () => {
  const user = useRootSelector((state) => state.shared.user);

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
