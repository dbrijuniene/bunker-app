import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Main from './pages/main';
import AddNewItems from './pages/add-new-items';
import Settings from './pages/settings';
import Dashboard from './pages/dashboard';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-new-items" element={<AddNewItems />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
