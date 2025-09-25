import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar, Line, Bubble } from 'react-chartjs-2';
import { authService } from '../utils/auth';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardTeamManager = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [userData, setUserData] = useState({});
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const user = authService.getUser();
    setUserData({
      username: user.username,
      role: user.role
    });

    // Mock team data
    setTeamData([
      { username: "bd1", role: "BD Executive", meetings: 42, closed: 18, open: 24 },
      { username: "bd2", role: "BD Executive", meetings: 35, closed: 12, open: 15 },
      { username: "tl1", role: "Team Lead", meetings: 20, closed: 10, open: 5 },
      { username: "bd3", role: "BD Executive", meetings: 38, closed: 15, open: 12 }
    ]);
  }, []);

  const navItems = [
    { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { id: 'reports', icon: 'fas fa-chart-pie', label: 'Reports' },
    { id: 'bd-tl-data', icon: 'fas fa-users', label: 'BD + TL Data' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' },
    { id: 'esg', icon: 'fas fa-leaf', label: 'ESG Index' },
    { id: 'wellness', icon: 'fas fa-person-booth', label: 'Wellness Index' }
  ];

  // Chart data configurations
  const pieData = {
    labels: ['Car', 'Bus', 'Train', 'Flight'],
    datasets: [
      {
        data: [120, 90, 60, 30],
        backgroundColor: ['#4361ee', '#4cc9f0', '#fca311', '#f72585'],
      },
    ],
  };

  const barData = {
    labels: ['Total Expense', 'Food Expense', 'Travel Expense'],
    datasets: [
      {
        label: 'Expense ($)',
        data: [15000, 5000, 7000],
        backgroundColor: ['#4361ee', '#f72585', '#4cc9f0'],
      },
    ],
  };

  const bubbleData = {
    datasets: [
      {
        label: 'Dept A',
        data: [{ x: 10, y: 20, r: 15 }],
        backgroundColor: '#4361ee',
      },
      {
        label: 'Dept B',
        data: [{ x: 20, y: 15, r: 10 }],
        backgroundColor: '#f72585',
      },
      {
        label: 'Dept C',
        data: [{ x: 30, y: 25, r: 20 }],
        backgroundColor: '#4cc9f0',
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Employee Performance',
        data: [65, 59, 80, 81, 56],
        borderColor: '#4361ee',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const bubbleOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      authService.logout();
    }
  };

  const stats = {
    meetings: teamData.reduce((sum, member) => sum + member.meetings, 0),
    closed: teamData.reduce((sum, member) => sum + member.closed, 0),
    open: teamData.reduce((sum, member) => sum + member.open, 0),
    upcoming: 7,
    topTeam: "Team Alpha"
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-left">
          <h1>Team Manager Dashboard</h1>
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
          <div className="role-badge">Team Manager</div>
        </div>
      </div>

      <div className="app-container">
        <div className="sidebar">
          <div className="user-profile">
            <div className="profile-avatar">
              <i className="fas fa-user-tie"></i>
            </div>
            <div className="user-name">{userData.username || 'Loading...'}</div>
            <div className="user-role">Team Manager</div>
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
          {/* Dashboard Page */}
          <div className={`page ${activePage === 'dashboard' ? 'active' : ''}`}>
            <div className="page-title">
              <span>Manager Overview</span>
              <span className="date-display">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                })}
              </span>
            </div>
            <div className="card">
              <h3>Welcome Manager!</h3>
              <p>This is your personalized dashboard where you can monitor BD Executives and Team Leads.</p>
            </div>
          </div>

          {/* Reports Page */}
          <div className={`page ${activePage === 'reports' ? 'active' : ''}`}>
            <div className="page-title">
              <span>Reports Dashboard</span>
            </div>

            {/* Stats Cards */}
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="stat-title">Meetings Completed</div>
                <div className="stat-value">{stats.meetings}</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <div className="stat-title">Deals Closed</div>
                <div className="stat-value">{stats.closed}</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-folder-open"></i>
                </div>
                <div className="stat-title">Deals Open</div>
                <div className="stat-value">{stats.open}</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-calendar-day"></i>
                </div>
                <div className="stat-title">Upcoming Meetings</div>
                <div className="stat-value">{stats.upcoming}</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-title">Top Performing Team</div>
                <div className="stat-value">{stats.topTeam}</div>
              </div>
            </div>

            {/* Charts */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
              gap: '20px',
              marginTop: '30px'
            }}>
              <div className="card">
                <h3>Distance Travelled by Mode of Transport</h3>
                <div style={{ height: '300px' }}>
                  <Pie data={pieData} options={chartOptions} />
                </div>
              </div>

              <div className="card">
                <h3>Expenses Overview</h3>
                <div style={{ height: '300px' }}>
                  <Bar data={barData} options={chartOptions} />
                </div>
              </div>

              <div className="card">
                <h3>Department Overview</h3>
                <div style={{ height: '300px' }}>
                  <Bubble data={bubbleData} options={bubbleOptions} />
                </div>
              </div>

              <div className="card">
                <h3>Employee Performance Trend</h3>
                <div style={{ height: '300px' }}>
                  <Line data={lineData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>

          {/* BD + TL Data Page */}
          <div className={`page ${activePage === 'bd-tl-data' ? 'active' : ''}`}>
            <div className="page-title">
              <span>BD + TL Team Data</span>
            </div>
            <div className="card">
              <h3>Team Performance</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Role</th>
                      <th>Meetings</th>
                      <th>Deals Closed</th>
                      <th>Deals Open</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamData.map((member, index) => (
                      <tr key={index}>
                        <td>{member.username}</td>
                        <td>{member.role}</td>
                        <td>{member.meetings}</td>
                        <td>{member.closed}</td>
                        <td>{member.open}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Settings Page */}
          <div className={`page ${activePage === 'settings' ? 'active' : ''}`}>
            <div className="page-title">
              <span>Account Settings</span>
            </div>
            <div className="card">
              <h3>Profile</h3>
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={userData.username || ''} 
                  readOnly 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={`${userData.username}@company.com` || ''} 
                  readOnly 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTeamManager;