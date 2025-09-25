import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../utils/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'BD executive'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const roles = [
    { value: 'BD executive', label: 'Executive' },
    { value: 'TL', label: 'Team Lead' },
    { value: 'TM', label: 'Manager' },
    { value: 'itadmin', label: 'Admin' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   try {
  //     await authService.login(formData.username, formData.password, formData.role);
      
  //     // Redirect based on role
  //     const redirectPaths = {
  //       'BD executive': '/dashboard-executive',
  //       'TL': '/dashboard-tl',
  //       'TM': '/dashboard-tm',
  //       'itadmin': '/admin'
  //     };
      
  //     navigate(redirectPaths[formData.role] || '/dashboard-executive');
  //   } catch (error) {
  //     setError('Invalid credentials or account does not exist');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authService.login(formData.username, formData.password, formData.role);

      // Redirect based on role
      const redirectPaths = {
        'BD executive': '/dashboard-executive',
        'TL': '/dashboard-tl',
        'TM': '/dashboard-tm',
        'itadmin': '/admin'
      };

      navigate(redirectPaths[formData.role] || '/dashboard-executive');
    } catch (error) {
      setError(error.message || 'Invalid credentials or account does not exist');
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #132652 0%, #0029BD 100%)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div className="login-container" style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Left Section */}
        <div className="login-left" style={{
          flex: 1,
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
          color: 'white',
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="brand">
            <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Force-X</h1>
            <p>Smart Workforce Platform</p>
          </div>
          
          <div className="features">
            {[
              { icon: '📊', title: 'Real-time Analytics', desc: 'Track performance with live dashboards' },
              { icon: '🧑‍💼', title: 'Team Management', desc: 'Efficiently manage your team\'s workflow' },
              { icon: '🔐', title: 'Secure Access', desc: 'Role-based secure authentication' }
            ].map((feature, index) => (
              <div key={index} className="feature" style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
                <div className="feature-icon" style={{
                  width: '50px', height: '50px', background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginRight: '15px', fontSize: '20px'
                }}>
                  {feature.icon}
                </div>
                <div className="feature-text">
                  <h3 style={{ fontSize: '18px', marginBottom: '5px', fontWeight: '600' }}>{feature.title}</h3>
                  <p style={{ fontSize: '14px', opacity: '0.8' }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="quote" style={{
            marginTop: '40px', fontStyle: 'italic', opacity: '0.9',
            paddingLeft: '20px', borderLeft: '3px solid rgba(255, 255, 255, 0.5)'
          }}>
            "Elevate Every Step. Celebrate Every Success."
          </div>
        </div>

        {/* Right Section */}
        <div className="login-right" style={{
          flex: 1,
          padding: '50px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div className="login-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            {/* ✅ Logo placed neatly above Welcome Back */}
            <div style={{ marginBottom: '20px' }}>
              <img 
                src="/logo.png" 
                alt="Force-X Logo" 
                style={{ 
                  height: '50px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
            <h2 style={{ fontSize: '28px', color: 'var(--text)', marginBottom: '10px', fontWeight: '600' }}>
              Welcome Back
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '16px' }}>
              Sign in to continue to your account
            </p>
          </div>

          {error && (
            <div className="alert" style={{
              display: 'block', background: '#fee2e2', color: 'var(--danger)',
              padding: '12px 16px', borderRadius: '8px', marginBottom: '25px',
              fontSize: '14px', borderLeft: '4px solid var(--danger)'
            }}>
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="role-selector" style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '30px'
            }}>
              {roles.map(role => (
                <button
                  key={role.value}
                  type="button"
                  className={`role-btn ${formData.role === role.value ? 'active' : ''}`}
                  style={{
                    padding: '12px', border: '1px solid var(--border)', borderRadius: '8px',
                    background: formData.role === role.value ? 'var(--primary)' : '#f9fafb',
                    color: formData.role === role.value ? '#fff' : 'var(--text)',
                    fontSize: '14px', cursor: 'pointer', transition: 'all 0.3s ease',
                    fontWeight: '500', textAlign: 'center'
                  }}
                  onClick={() => setFormData({ ...formData, role: role.value })}
                >
                  {role.label}
                </button>
              ))}
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{
                display: 'block', marginBottom: '8px', fontSize: '14px',
                color: 'var(--text)', fontWeight: '500'
              }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  width: '100%', padding: '14px 16px', border: '1px solid var(--border)',
                  borderRadius: '8px', outline: 'none', fontSize: '15px', transition: 'all 0.3s',
                  background: '#f9fafb'
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{
                display: 'block', marginBottom: '8px', fontSize: '14px',
                color: 'var(--text)', fontWeight: '500'
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%', padding: '14px 16px', border: '1px solid var(--border)',
                  borderRadius: '8px', outline: 'none', fontSize: '15px', transition: 'all 0.3s',
                  background: '#f9fafb'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                padding: '14px', border: 'none', borderRadius: '8px', width: '100%',
                fontSize: '16px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s',
                background: 'var(--primary)', color: '#fff',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }}
            >
              Login to Dashboard
            </button>
          </form>

          <p style={{ marginTop: '25px', textAlign: 'center', fontSize: '14px', color: 'var(--text-light)' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Register</Link> | 
            <Link to="/faq" style={{ color: 'var(--primary)', textDecoration: 'none', marginLeft: '5px' }}>FAQ</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;