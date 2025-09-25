import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FAQ from './components/FAQ';
import AdminPanel from './components/AdminPanel';
import DashboardExecutive from './components/DashboardExecutive';
import DashboardTeamLead from './components/DashboardTeamLead';
import DashboardTeamManager from './components/DashboardTeamManager';
import ProtectedRoute from './components/Common/ProtectedRoute';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Protected Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="itadmin">
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/dashboard-executive" element={
            <ProtectedRoute requiredRole="BD executive">
              <DashboardExecutive />
            </ProtectedRoute>
          } />
          <Route path="/dashboard-tl" element={
            <ProtectedRoute requiredRole="TL">
              <DashboardTeamLead />
            </ProtectedRoute>
          } />
          <Route path="/dashboard-tm" element={
            <ProtectedRoute requiredRole="TM">
              <DashboardTeamManager />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;