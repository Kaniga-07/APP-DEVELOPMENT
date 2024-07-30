import React, { useState } from 'react';
import './Admins.css'; // Make sure to create and style this CSS file accordingly

const AdminSettings = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleMobileVerification = () => {
    // Implement the OTP verification logic here
    setIsVerified(true);
    alert('Mobile number verified!');
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      // Implement the password change logic here
      alert('Password changed successfully');
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="admin-settings-wrapper">
      <div className="image-container">
        <img
          src="https://media.istockphoto.com/id/1396113348/vector/3d-web-vector-illustrations-online-concept-computer-with-open-pages-e-learning-design-over.jpg?s=612x612&w=0&k=20&c=UuGSBpij7N-sZLRU-akf97-k7EexWmKgv15EgeApRy0="
          alt="Admin"
          style={{width:"100%"}}
        />
      </div>
      <div className="settings-container">
        <h2>Verify Your Mobile Number</h2>
        <p>We will send an OTP to your mobile number</p>
        <div className="mobile-verification">
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Mobile Number"
            className="input-field"
          />
          <button
            onClick={handleMobileVerification}
            className={`verify-button ${isVerified ? 'verified' : ''}`}
          >
            {isVerified ? 'Verified' : 'Verify'}
          </button>
        </div>

        <h2>Change Password</h2>
        <div className="password-change">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="input-field"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="input-field"
          />
          <button
            onClick={handleChangePassword}
            className="change-password-button"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
