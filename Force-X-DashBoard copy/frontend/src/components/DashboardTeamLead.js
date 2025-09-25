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
import { Pie, Bar, Line } from 'react-chartjs-2';
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

const DashboardTeamLead = () => {
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
      { username: "bd3", role: "BD Executive", meetings: 28, closed: 8, open: 10 }
    ]);
  }, []);

  const navItems = [
    { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { id: 'reports', icon: 'fas fa-chart-bar', label: 'Reports' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' },
    { id: 'esg', icon: 'fas fa-leaf', label: 'ESG Index' },
    { id: 'wellness', icon: 'fas fa-person-booth', label: 'Wellness Index' }
  ];

  // Chart data configurations
  const pieData = {
    labels: ['Car', 'Train', 'Flight', 'Bus'],
    datasets: [
      {
        data: [120, 90, 60, 30],
        backgroundColor: ['#4361ee', '#f72585', '#4cc9f0', '#fca311'],
      },
    ],
  };

  const barData = {
    labels: ['Total', 'Food', 'Travel'],
    datasets: [
      {
        label: 'Expenses ($)',
        data: [10000, 3000, 7000],
        backgroundColor: ['#3a0ca3', '#f72585', '#4361ee'],
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance Score',
        data: [65, 70, 75, 80, 78, 85],
        borderColor: '#4361ee',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        fill: true,
        tension: 0.3,
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

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      authService.logout();
    }
  };

  const stats = {
    meetings: teamData.reduce((sum, member) => sum + member.meetings, 0),
    closed: teamData.reduce((sum, member) => sum + member.closed, 0),
    open: teamData.reduce((sum, member) => sum + member.open, 0),
    upcoming: 7
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-left">
          <h1>Team Lead Dashboard</h1>
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
          <div className="role-badge">Team Lead</div>
        </div>
      </div>

      <div className="app-container">
        <div className="sidebar">
          <div className="user-profile">
            <div className="profile-avatar">
              <i className="fas fa-user-tie"></i>
            </div>
            <div className="user-name">{userData.username || 'Loading...'}</div>
            <div className="user-role">Team Lead</div>
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
              <span>Overview (TL)</span>
            </div>
            <div className="card">
              <h3>Welcome Team Lead!</h3>
              <p>Quick summary of team activity and performance metrics.</p>
            </div>
          </div>

          {/* Reports Page */}
          <div className={`page ${activePage === 'reports' ? 'active' : ''}`}>
            <div className="page-title">
              <span>BD Executive Reports</span>
            </div>

            {/* Stats Cards */}
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-icon meetings-icon">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="stat-title">Meetings Completed</div>
                <div className="stat-value">{stats.meetings}</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon deals-closed-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <div className="stat-title">Deals Closed</div>
                <div className="stat-value">{stats.closed}</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon deals-open-icon">
                  <i className="fas fa-folder-open"></i>
                </div>
                <div className="stat-title">Deals Open</div>
                <div className="stat-value">{stats.open}</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon upcoming-icon">
                  <i className="fas fa-calendar-day"></i>
                </div>
                <div className="stat-title">Upcoming Meetings</div>
                <div className="stat-value">{stats.upcoming}</div>
              </div>
            </div>

            {/* Charts Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
              gap: '20px',
              marginTop: '30px'
            }}>
              <div className="card">
                <h3>Distance by Transport Mode</h3>
                <div style={{ height: '300px' }}>
                  <Pie data={pieData} options={chartOptions} />
                </div>
              </div>

              <div className="card">
                <h3>Expense Breakdown</h3>
                <div style={{ height: '300px' }}>
                  <Bar data={barData} options={chartOptions} />
                </div>
              </div>

              <div className="card">
                <h3>Team Performance Trend</h3>
                <div style={{ height: '300px' }}>
                  <Line data={lineData} options={chartOptions} />
                </div>
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
          </div>

          {/* Settings Page */}
          <div className={`page ${activePage === 'settings' ? 'active' : ''}`}>
            <div className="page-title">
              <span>Settings</span>
            </div>
            <div className="card">
              <h3>Account Management</h3>
              <p>Team Lead settings and preferences.</p>
            </div>
          </div>

          {/* Other pages would go here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardTeamLead;