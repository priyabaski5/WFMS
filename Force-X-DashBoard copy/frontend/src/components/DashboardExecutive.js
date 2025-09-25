import React, { useState, useEffect } from 'react';
import { authService } from '../utils/auth';
import '../styles/App.css';

const DashboardExecutive = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = authService.getUser();
    setUserData({
      username: user.username,
      role: user.role,
      email: `${user.username}@company.com`,
      fullName: user.username.charAt(0).toUpperCase() + user.username.slice(1),
      phone: "+1 (555) 123-4567"
    });
  }, []);

  const navItems = [
    { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' },
    { id: 'esg', icon: 'fas fa-leaf', label: 'ESG Index' },
    { id: 'wellness', icon: 'fas fa-person-booth', label: 'Wellness Index' }
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      authService.logout();
    }
  };

  const renderDashboardContent = () => (
    <div className="page active" id="dashboard">
      <div className="page-title">
        <span>Dashboard Overview</span>
        <span className="date-display" id="current-date">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
          })}
        </span>
      </div>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon meetings-icon">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="stat-title">Total Meetings Held</div>
          <div className="stat-value">42</div>
          <div className="stat-change positive">
            <i className="fas fa-arrow-up"></i> 12% from last month
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon deals-closed-icon">
            <i className="fas fa-handshake"></i>
          </div>
          <div className="stat-title">Deals Closed</div>
          <div className="stat-value">18</div>
          <div className="stat-change positive">
            <i className="fas fa-arrow-up"></i> 23% from last month
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon deals-open-icon">
            <i className="fas fa-folder-open"></i>
          </div>
          <div className="stat-title">Deals Open</div>
          <div className="stat-value">24</div>
          <div className="stat-change negative">
            <i className="fas fa-arrow-down"></i> 5% from last month
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon upcoming-icon">
            <i className="fas fa-calendar-day"></i>
          </div>
          <div className="stat-title">Upcoming Meetings</div>
          <div className="stat-value">7</div>
          <div className="stat-change">
            This week
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-title">
          <span>Upcoming Meetings</span>
          <a href="#" className="view-all">View All</a>
        </div>
        
        <div className="meeting-item">
          <div className="meeting-icon" style={{background: '#4361ee'}}>
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="meeting-info">
            <div className="meeting-name">Quarterly Review - TechCorp Inc.</div>
            <div className="meeting-details">Sarah Johnson · Conference Room B</div>
          </div>
          <div className="meeting-time">Tomorrow, 10:00 AM</div>
        </div>
        
        <div className="meeting-item">
          <div className="meeting-icon" style={{background: '#f72585'}}>
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="meeting-info">
            <div className="meeting-name">Product Demo - Innovate LLC</div>
            <div className="meeting-details">Emily Chen · Client Office</div>
          </div>
          <div className="meeting-time">Oct 28, 2:30 PM</div>
        </div>
        
        <div className="meeting-item">
          <div className="meeting-icon" style={{background: '#3a0ca3'}}>
            <i className="fas fa-handshake"></i>
          </div>
          <div className="meeting-info">
            <div className="meeting-name">Contract Signing - Global Solutions</div>
            <div className="meeting-details">Michael Lee · Main Conference Room</div>
          </div>
          <div className="meeting-time">Oct 30, 11:00 AM</div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-title">
          <span>Recent Deals Closed</span>
          <a href="#" className="view-all">View All</a>
        </div>
        
        <div className="deal-item">
          <div className="deal-icon" style={{background: '#4cc9f0'}}>
            <i className="fas fa-check"></i>
          </div>
          <div className="deal-info">
            <div className="deal-name">Enterprise Package - TechCorp Inc.</div>
            <div className="deal-details">Closed yesterday · <span className="priority-high">High Priority</span></div>
          </div>
          <div className="deal-value">$24,500</div>
        </div>
        
        <div className="deal-item">
          <div className="deal-icon" style={{background: '#fca311'}}>
            <i className="fas fa-check"></i>
          </div>
          <div className="deal-info">
            <div className="deal-name">Premium Support - Innovate LLC</div>
            <div className="deal-details">Closed 2 days ago · <span className="priority-medium">Medium Priority</span></div>
          </div>
          <div className="deal-value">$12,000</div>
        </div>
        
        <div className="deal-item">
          <div className="deal-icon" style={{background: '#7209b7'}}>
            <i className="fas fa-check"></i>
          </div>
          <div className="deal-info">
            <div className="deal-name">Starter Package - New Ventures</div>
            <div className="deal-details">Closed 5 days ago · <span className="priority-low">Low Priority</span></div>
          </div>
          <div className="deal-value">$5,800</div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-title">
          <span>Deals Progress</span>
        </div>
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
            <span>Deals Closure Rate</span>
            <span>65%</span>
          </div>
          <div className="progress-bar">
            <div className="progress progress-deals"></div>
          </div>
          <div style={{fontSize: '13px', color: 'var(--gray)', marginTop: '10px'}}>
            18 closed out of 28 total deals
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className={`page ${activePage === 'settings' ? 'active' : ''}`} id="settings">
      <div className="page-title">
        <span>Account Settings</span>
      </div>
      
      <div className="card">
        <h3>Profile Information</h3>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" value={userData.username || 'Loading...'} readOnly />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" className="form-control" value={userData.email || 'Loading...'} readOnly />
        </div>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" className="form-control" value={userData.fullName || 'Loading...'} readOnly />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" className="form-control" value={userData.phone || 'Loading...'} readOnly />
        </div>
        <button className="btn btn-primary">Update Profile</button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="header">
        <div className="header-left">
          <h1>BD Executive Dashboard</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-details">
              <div className="user-name">{userData.username || 'Loading...'}</div>
            </div>
          </div>
          <div className="role-badge">BD Executive</div>
        </div>
      </div>
      
      <div className="app-container">
        <div className="sidebar">
          <div className="user-profile">
            <div className="profile-avatar">
              <i className="fas fa-user-tie"></i>
            </div>
            <div className="user-name">{userData.username || 'Loading...'}</div>
            <div className="user-role">BD Executive</div>
          </div>
          
          <ul className="nav-links">
            {navItems.map(item => (
              <li 
                key={item.id}
                className={activePage === item.id ? 'active' : ''}
                onClick={() => setActivePage(item.id)}
              >
                <i className={item.icon}></i> {item.label}
              </li>
            ))}
            <li onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </li>
          </ul>
        </div>
        
        <div className="main-content">
          {activePage === 'dashboard' && renderDashboardContent()}
          {activePage === 'settings' && renderSettingsContent()}
          {/* Add other pages similarly */}
          {activePage === 'esg' && (
            <div className={`page ${activePage === 'esg' ? 'active' : ''}`}>
              <div className="page-title">
                <span>ESG Index</span>
              </div>
              <div className="card">
                <h3>ESG Index Content</h3>
                <p>Environmental, Social, and Governance metrics will be displayed here.</p>
              </div>
            </div>
          )}
          {activePage === 'wellness' && (
            <div className={`page ${activePage === 'wellness' ? 'active' : ''}`}>
              <div className="page-title">
                <span>Wellness Index</span>
              </div>
              <div className="card">
                <h3>Wellness Index Content</h3>
                <p>Employee wellness metrics will be displayed here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardExecutive;
// import React, { useState, useEffect } from 'react';
// import { authService } from '../utils/auth';

// const DashboardExecutive = () => {
//   const [activePage, setActivePage] = useState('dashboard');
//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//     const user = authService.getUser();
//     setUserData({
//       username: user.username,
//       role: user.role,
//       email: `${user.username}@company.com`,
//       fullName: user.username.charAt(0).toUpperCase() + user.username.slice(1),
//       phone: "+1 (555) 123-4567"
//     });
//   }, []);

//   const navItems = [
//     { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
//     { id: 'settings', icon: 'fas fa-cog', label: 'Settings' },
//     { id: 'esg', icon: 'fas fa-leaf', label: 'ESG Index' },
//     { id: 'wellness', icon: 'fas fa-person-booth', label: 'Wellness Index' }
//   ];

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       authService.logout();
//     }
//   };

//   return (
//     <div className="container">
//       <div className="header">
//         <div className="header-left">
//           <h1>BD Executive Dashboard</h1>
//         </div>
//         <div className="header-right">
//           <div className="user-info">
//             <div className="user-avatar">
//               <i className="fas fa-user"></i>
//             </div>
//             <div className="user-details">
//               <div className="user-name">{userData.username || 'Loading...'}</div>
//             </div>
//           </div>
//           <div className="role-badge">BD Executive</div>
//         </div>
//       </div>

//       <div className="app-container">
//         <div className="sidebar">
//           <div className="user-profile">
//             <div className="profile-avatar">
//               <i className="fas fa-user-tie"></i>
//             </div>
//             <div className="user-name">{userData.username || 'Loading...'}</div>
//             <div className="user-role">BD Executive</div>
//           </div>

//           <ul className="nav-links">
//             {navItems.map(item => (
//               <li
//                 key={item.id}
//                 className={activePage === item.id ? 'active' : ''}
//                 onClick={() => setActivePage(item.id)}
//               >
//                 <i className={item.icon}></i> {item.label}
//               </li>
//             ))}
//             <li onClick={handleLogout}>
//               <i className="fas fa-sign-out-alt"></i> Logout
//             </li>
//           </ul>
//         </div>

//         <div className="main-content">
//           {/* Dashboard Page */}
//           <div className={`page ${activePage === 'dashboard' ? 'active' : ''}`} id="dashboard">
//             {/* Add dashboard content here */}
//             <div className="page-title">
//               <span>Dashboard Overview</span>
//               <span className="date-display">
//                 {new Date().toLocaleDateString('en-US', { 
//                   weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
//                 })}
//               </span>
//             </div>
            
//             {/* Add stats cards and other dashboard elements */}
//           </div>

//           {/* Other pages */}
//           <div className={`page ${activePage === 'settings' ? 'active' : ''}`} id="settings">
//             <div className="page-title">
//               <span>Account Settings</span>
//             </div>
//             {/* Settings content */}
//           </div>

//           {/* Add other pages similarly */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardExecutive;