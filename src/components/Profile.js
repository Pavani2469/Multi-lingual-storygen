import React from 'react';
import '../styles/profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      <div className="profile-box">
        <p><strong>Name:</strong> Pavani Nagireddy</p>
        <p><strong>Email:</strong> pavani@example.com</p>
        <p><strong>Member since:</strong> January 2025</p>
      </div>
    </div>
  );
};

export default Profile;
