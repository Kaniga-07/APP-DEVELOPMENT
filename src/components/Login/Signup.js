import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Ensure the path is correct

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
    } else if (!/^[a-zA-Z\s]+$/.test(username)) {
      setError('Username must contain only letters and spaces.');
    } else {
      setError('');
      try {
        const response = await axios.post('http://localhost:8000/myapp/signup/', {
          username,
          email,
          password
        });

        if (response.status === 201) {
          navigate('/login');
        } else {
          setError('Signup failed.');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data.error || 'There was an error during signup.');
        } else {
          setError('There was an error during signup.');
        }
        console.error('There was an error!', error);
      }
    }
  };

  return (
    <div className='bac'>
      <div className="form-container">
        <h2>Signup</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSignup}>
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
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
