import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login.tsx';
import Registration from './components/registration.tsx';
import Main from './components/main.tsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default AppRouter;