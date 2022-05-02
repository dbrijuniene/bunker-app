import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { AuthProvider } from './features/auth/auth-context';

import Main from './pages/main';
import AddNewItems from './pages/add-new-items';
import Settings from './pages/settings';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login';

const App: React.FC = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<LoginPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-new-items" element={<AddNewItems />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default App;
