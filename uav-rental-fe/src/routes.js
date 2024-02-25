import React, { useEffect, useState }  from 'react';
import { BrowserRouter as Router, Route, Routes , Navigate} from 'react-router-dom';
import Login from './components/login.tsx';
import Registration from './components/registration.tsx';
import Main from './components/main.tsx';
import { testToken } from './api/token.ts';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Root/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/main" element={<Main />} />

    </Routes>
  );
}


function Root() {
  const [isAuthenticated, setAuthenticationStatus] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      testToken(token)
        .then((response) => {
          console.log(response);
          setAuthenticationStatus(true);
          console.log(isAuthenticated);
        })
        .catch(() => setAuthenticationStatus(false));
    } else {
      setAuthenticationStatus(false);
    }
  }, []);
  

  return isAuthenticated ? <Navigate to="/main" /> : <Navigate to="/login" />;
}

export default AppRouter;