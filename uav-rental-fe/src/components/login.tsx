import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/loginregister.ts';

interface FormData {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(formData); // API request to login user
      localStorage.setItem('token', token);
      navigate('/main'); // Redirect to main page after successful login
    } catch (error) {
      console.error('Login failed:', error);

      // Handle login error, display it on screen
      setErrorMessage("Logging in failed, please make sure your username and password are correct");
      // Clear the error message after 5 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);

    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/registration">Register here</Link>.</p>
    </div>
  );
}

export default Login;