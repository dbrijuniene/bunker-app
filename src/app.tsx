import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import Items from './pages/items';
import Places from './pages/places';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login';
import RegisterPage from './pages/registration';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Main />}>
      <Route index element={<LoginPage />} />
      <Route path="registration" element={<RegisterPage />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="items" element={<Items />} />
      <Route path="places" element={<Places />} />
    </Route>
  </Routes>
);

export default App;
