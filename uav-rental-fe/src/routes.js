import React, { useEffect, useState }  from 'react';
import { BrowserRouter as Router, Route, Routes , Navigate} from 'react-router-dom';
import Login from './components/login.tsx';
import Registration from './components/registration.tsx';
import Main from './components/main/main.tsx';
import { testToken } from './api/token.ts';
import MyUAVS from './components/my_uavs/myuavs.tsx';
import MyRentals from './components/my_rentals/myrentals.tsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Root/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/main" element={<Main />} />
      <Route path="/my-uavs" element={<MyUAVS />} />
      <Route path="/my-rentals" element={<MyRentals />} />


    </Routes>
  );
}


function Root() {
  // FIXME: Currently the root component is rendering twice, effecting the useEffect clause
  const [isAuthenticated, setAuthenticationStatus] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Auto sign in through root
      testToken(token)
        .then((response) => {
          setAuthenticationStatus(true);
        })
        .catch(() => setAuthenticationStatus(false));
    } else {
      setAuthenticationStatus(false);
    }
  }, [setAuthenticationStatus]);
  

  return isAuthenticated ? <Navigate to="/main" /> : <Navigate to="/login" />;
}

export default AppRouter;