import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from './features/auth/auth-context';
import Main from './pages/main';
import AddNewItems from './pages/add-new-items';
import Places from './pages/places';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login';
import RegisterPage from './pages/registration';
import store from './store';

const App: React.FC = () => (
  <Provider store={store}>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<LoginPage />} />
          <Route path="registration" element={<RegisterPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-new-items" element={<AddNewItems />} />
          <Route path="places" element={<Places />} />
        </Route>
      </Routes>
    </AuthProvider>
  </Provider>
);

export default App;
