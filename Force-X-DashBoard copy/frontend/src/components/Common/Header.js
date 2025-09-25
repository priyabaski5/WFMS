import React from 'react';
import { authService } from '../../utils/auth';

const Header = ({ title, showUserInfo = true }) => {
  const userData = authService.getUser();

  return (
    <div className="header">
      <div className="header-left">
        {/* ✅ Logo from PNG file */}
        <div className="logo" style={{
          marginRight: '15px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <img 
            src="/logo.png" 
            alt="Force-X Logo" 
            style={{ 
              height: '40px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
        <h1>{title}</h1>
      </div>

      {showUserInfo && (
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-details">
              <div className="user-name">{userData.username || 'Loading...'}</div>
            </div>
          </div>
          <div className="role-badge">{userData.role}</div>
        </div>
      )}
    </div>
  );
};

export default Header;