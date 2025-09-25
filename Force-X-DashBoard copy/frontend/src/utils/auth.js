import ApiService from './api';

export const authService = {
  login: async (username, password, role) => {
    try {
      const data = await ApiService.login({ username, password, role });
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      localStorage.setItem("userData", JSON.stringify(data.user || { username, role }));
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed. Please check your credentials.');
    }
  },

  register: async (userData) => {
    try {
      const data = await ApiService.register(userData);
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Registration failed. Please try again.');
    }
  },

  logout: () => {
    localStorage.clear();
    window.location.href = '/login';
  },

  getToken: () => localStorage.getItem("token"),
  
  getUser: () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : {
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role")
    };
  },

  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    
    // Basic token expiration check (you might want to use jwt-decode for proper validation)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  },
  
  hasRole: (requiredRole) => localStorage.getItem("role") === requiredRole
};
// export const authService = {
//   login: async (username, password, role) => {
//     try {
//       const response = await fetch("http://localhost:5001/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password, role })
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const data = await response.json();
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("username", username);
//       localStorage.setItem("role", role);
      
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   },

//   register: async (userData) => {
//     try {
//       const response = await fetch("http://localhost:5001/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Registration failed');
//       }

//       return await response.json();
//     } catch (error) {
//       throw error;
//     }
//   },

//   logout: () => {
//     localStorage.clear();
//     window.location.href = '/login';
//   },

//   getToken: () => localStorage.getItem("token"),
//   getUser: () => ({
//     username: localStorage.getItem("username"),
//     role: localStorage.getItem("role")
//   }),

//   isAuthenticated: () => !!localStorage.getItem("token"),
//   hasRole: (requiredRole) => localStorage.getItem("role") === requiredRole
// };