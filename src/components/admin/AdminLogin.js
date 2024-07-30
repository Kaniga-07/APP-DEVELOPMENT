import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add authentication logic here
    if (username === 'admin' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='admin-login-wrapper'>
      <div className='admin-login-image'>
        {/* Replace 'image-url.jpg' with the path to your image */}
        <img src='image-url.jpg' alt='Login' />
      </div>
      <div className='admin-login-container'>
        <h2 style={{color:"white"}}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label htmlFor='username'  style={{color:"white"}}>Username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'  style={{color:"white"}}>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='login-btn'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
