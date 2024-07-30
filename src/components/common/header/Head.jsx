import React from 'react';
import { useNavigate } from 'react-router-dom';

const Head = () => {
  const navigate = useNavigate();

  const handleLoginSignup = () => {
    navigate('/Login');
  };

  const handleAdminLogin = () => {
    navigate('/AdminLogin');
  };

  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1>ACALEARN</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
          </div>
          <div className='auth-buttons'>
            <button
              style={{
                backgroundColor: '#1eb2a6',
                color: 'white',
                marginRight: '10px',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#169d90'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1eb2a6'}
              onClick={handleLoginSignup}
            >
              Login/Signup
            </button>
            <button
              style={{
                backgroundColor: '#ff5733',
                color: 'white',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e04b29'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff5733'}
              onClick={handleAdminLogin}
            >
              Admin Login
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
