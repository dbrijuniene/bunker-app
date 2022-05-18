import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from './features/auth/auth-context';
import Main from './pages/main';
import AddNewItems from './pages/add-new-items';
import Settings from './pages/settings';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login';
import RegisterPage from './pages/registration';
import store from './store';

const App: React.FC = () => (
  <AuthProvider>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<LoginPage />} />
          <Route path="registration" element={<RegisterPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-new-items" element={<AddNewItems />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Provider>
  </AuthProvider>
);

export default App;
