import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../utils/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { value: '', label: '-- Select Role --', disabled: true },
    { value: 'BD executive', label: 'BD Executive' },
    { value: 'TL', label: 'Team Lead (TL)' },
    { value: 'TM', label: 'Team Manager (TM)' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email required';
    }
    
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Enter valid 10-digit mobile number';
    }
    
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setErrorMessage('');
  //   setSuccess(false);
    
  //   const newErrors = validateForm();
    
  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }
    
  //   try {
  //     await authService.register(formData);
  //     setSuccess(true);
      
  //     setTimeout(() => {
  //       navigate('/login');
  //     }, 2000);
  //   } catch (error) {
  //     setErrorMessage(error.message || 'Registration failed. Please try again.');
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccess(false);

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await authService.register(formData);
      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed. Please try again.');
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div style={{
      backgroundColor: '#f5f7fb',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div className="register-container" style={{ width: '100%', maxWidth: '450px' }}>
        <div className="register-card" style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          padding: '30px',
          transition: 'all 0.3s ease'
        }}>
          <div className="register-icon" style={{ textAlign: 'center', marginBottom: '20px' }}>
            <i className="fas fa-user-plus" style={{
              fontSize: '48px',
              color: 'var(--primary)',
              background: 'rgba(67, 97, 238, 0.1)',
              width: '80px',
              height: '80px',
              lineHeight: '80px',
              borderRadius: '50%'
            }}></i>
          </div>
          
          <h2 style={{ textAlign: 'center', color: 'var(--dark)', marginBottom: '10px' }}>
            Create Your Account
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--gray)', marginBottom: '25px' }}>
            Fill in your details to get started
          </p>

          {errorMessage && (
            <div className="alert alert-danger" style={{
              display: 'block',
              padding: '12px 15px',
              borderRadius: '8px',
              marginBottom: '20px',
              backgroundColor: 'rgba(247, 37, 133, 0.1)',
              color: 'var(--danger)',
              border: '1px solid rgba(247, 37, 133, 0.2)'
            }}>
              <i className="fas fa-exclamation-circle"></i> {errorMessage}
            </div>
          )}

          {success && (
            <div className="alert alert-success" style={{
              display: 'block',
              padding: '12px 15px',
              borderRadius: '8px',
              marginBottom: '20px',
              backgroundColor: 'rgba(76, 201, 240, 0.1)',
              color: 'var(--success)',
              border: '1px solid rgba(76, 201, 240, 0.2)'
            }}>
              <i className="fas fa-check-circle"></i> Registration successful! Waiting for IT Admin approval...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '20px', position: 'relative' }}>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `1px solid ${errors.username ? 'var(--danger)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'all 0.3s'
                }}
              />
              {errors.username && (
                <small style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  {errors.username}
                </small>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `1px solid ${errors.email ? 'var(--danger)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
              {errors.email && (
                <small style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  {errors.email}
                </small>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <input
                type="tel"
                name="mobile"
                className="form-control"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `1px solid ${errors.mobile ? 'var(--danger)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
              {errors.mobile && (
                <small style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  {errors.mobile}
                </small>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '20px', position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `1px solid ${errors.password ? 'var(--danger)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  paddingRight: '40px'
                }}
              />
              <i
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '15px',
                  color: 'var(--gray)',
                  cursor: 'pointer'
                }}
              ></i>
              {errors.password && (
                <small style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  {errors.password}
                </small>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '20px', position: 'relative' }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `1px solid ${errors.confirmPassword ? 'var(--danger)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  paddingRight: '40px'
                }}
              />
              <i
                className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '15px',
                  color: 'var(--gray)',
                  cursor: 'pointer'
                }}
              ></i>
              {errors.confirmPassword && (
                <small style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  {errors.confirmPassword}
                </small>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `1px solid ${errors.role ? 'var(--danger)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  color: formData.role ? 'var(--text)' : 'var(--text-light)'
                }}
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value} disabled={role.disabled}>
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <small style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  {errors.role}
                </small>
              )}
            </div>

            <div className="terms" style={{ margin: '20px 0', fontSize: '14px', color: 'var(--gray)', textAlign: 'center' }}>
              By registering, you agree to our <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Privacy Policy</a>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                padding: '14px 20px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                backgroundColor: 'var(--primary)',
                color: 'white',
                width: '100%'
              }}
            >
              Create Account
            </button>
          </form>

          <div className="login-link" style={{ textAlign: 'center', marginTop: '20px', color: 'var(--gray)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;