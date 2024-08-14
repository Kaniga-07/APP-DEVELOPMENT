import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext'; 
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter all fields.');
    } else {
      setError('');
      try {
        const response = await axios.post('http://localhost:8000/myapp/login/', { username, password });
        const { access, refresh } = response.data;

        // Store tokens in local storage
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);

        login({ username, access, refresh });
        navigate('/courses'); // Redirect to the courses page
      } catch (error) {
        setError('Invalid username or password.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
