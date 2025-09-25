import React from 'react';
import '../../styles/components.css';

const Sidebar = ({ userRole, activePage, onPageChange }) => {
    const menuItems = {
        'BD executive': [
            { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
            { id: 'meeting-input', label: 'Meeting Input', icon: 'fas fa-pen' },
            { id: 'meeting-data', label: 'Meeting Data', icon: 'fas fa-table' },
            { id: 'settings', label: 'Settings', icon: 'fas fa-cog' }
        ],
        'TL': [
            { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
            { id: 'reports', label: 'Reports', icon: 'fas fa-chart-bar' },
            { id: 'settings', label: 'Settings', icon: 'fas fa-cog' },
            { id: 'esg', label: 'ESG Index', icon: 'fas fa-leaf' },
            { id: 'wellness', label: 'Wellness Index', icon: 'fas fa-person-booth' }
        ],
        'TM': [
            { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
            { id: 'reports', label: 'Reports', icon: 'fas fa-chart-pie' },
            { id: 'bd-tl-data', label: 'BD + TL Data', icon: 'fas fa-users' },
            { id: 'settings', label: 'Settings', icon: 'fas fa-cog' },
            { id: 'esg', label: 'ESG Index', icon: 'fas fa-leaf' },
            { id: 'wellness', label: 'Wellness Index', icon: 'fas fa-person-booth' }
        ],
        'itadmin': [
            { id: 'dashboard', label: 'Admin Panel', icon: 'fas fa-users-cog' }
        ]
    };

    const getMenuForRole = (role) => {
        return menuItems[role] || menuItems['BD executive'];
    };

    return (
        <div className="sidebar">
            <div className="user-profile">
                <div className="profile-avatar">
                    <i className="fas fa-user-tie"></i>
                </div>
                <div className="user-name" id="sidebar-username">Loading...</div>
                <div className="user-role">{userRole}</div>
            </div>
            
            <ul className="nav-links">
                {getMenuForRole(userRole).map((item) => (
                    <li 
                        key={item.id}
                        className={activePage === item.id ? 'active' : ''}
                        onClick={() => onPageChange(item.id)}
                    >
                        <i className={item.icon}></i> {item.label}
                    </li>
                ))}
                <li onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                }}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;