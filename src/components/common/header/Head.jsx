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
            <h1 style={{color:'#169d90'}} >ACALEARN</h1>
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
                backgroundColor: 'white',
                color: '#1eb2a6',
              }} 
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
