import React, { useState, useEffect } from 'react';
import { authService } from '../utils/auth';
import ApiService from '../utils/api';

const AdminPanel = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadPendingUsers();
  }, []);

  const loadPendingUsers = async () => {
    try {
      setLoading(true);
      const users = await ApiService.getPendingUsers();
      setPendingUsers(users);
    } catch (error) {
      console.error('Error loading pending users:', error);
      setMessage('Error loading pending users');
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (userId) => {
    try {
      await ApiService.approveUser(userId);
      setMessage('✅ User approved successfully!');
      
      // Refresh the pending users list
      await loadPendingUsers();
    } catch (error) {
      console.error('Error approving user:', error);
      setMessage('Error approving user. Please try again.');
    }
  };

  const handleLogout = () => {
    authService.logout();
  };

  if (loading) {
    return (
      <div style={{ 
        fontFamily: 'Montserrat', 
        background: '#f4f7fa', 
        margin: 0, 
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div>Loading pending users...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: 'Montserrat', 
      background: '#f4f7fa', 
      margin: 0, 
      padding: '20px',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#007bff', marginBottom: '20px' }}>
          IT Admin Panel - Approve Users
        </h2>
        
        {message && (
          <div style={{
            padding: '10px',
            background: message.includes('✅') ? '#d4edda' : '#f8d7da',
            color: message.includes('✅') ? '#155724' : '#721c24',
            border: '1px solid',
            borderColor: message.includes('✅') ? '#c3e6cb' : '#f5c6cb',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            {message}
          </div>
        )}
        
        <button 
          className="logout-btn" 
          onClick={handleLogout}
          style={{
            float: 'right',
            padding: '6px 12px',
            background: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
        
        <div style={{ clear: 'both' }}></div>

        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          marginTop: '20px', 
          background: '#fff' 
        }}>
          <thead>
            <tr>
              <th style={{ 
                padding: '12px', 
                border: '1px solid #ddd', 
                textAlign: 'left',
                backgroundColor: '#007bff',
                color: '#fff'
              }}>
                Username
              </th>
              <th style={{ 
                padding: '12px', 
                border: '1px solid #ddd', 
                textAlign: 'left',
                backgroundColor: '#007bff',
                color: '#fff'
              }}>
                Email
              </th>
              <th style={{ 
                padding: '12px', 
                border: '1px solid #ddd', 
                textAlign: 'left',
                backgroundColor: '#007bff',
                color: '#fff'
              }}>
                Role
              </th>
              <th style={{ 
                padding: '12px', 
                border: '1px solid #ddd', 
                textAlign: 'left',
                backgroundColor: '#007bff',
                color: '#fff'
              }}>
                Registered Date
              </th>
              <th style={{ 
                padding: '12px', 
                border: '1px solid #ddd', 
                textAlign: 'left',
                backgroundColor: '#007bff',
                color: '#fff'
              }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ 
                  padding: '20px', 
                  textAlign: 'center', 
                  border: '1px solid #ddd' 
                }}>
                  No pending users for approval
                </td>
              </tr>
            ) : (
              pendingUsers.map(user => (
                <tr key={user.id}>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    {user.username}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    {user.email}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    {user.role}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    <button
                      onClick={() => approveUser(user.id)}
                      style={{
                        padding: '6px 12px',
                        background: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
// import React, { useState, useEffect } from 'react';
// import { authService } from '../utils/auth';

// const AdminPanel = () => {
//   const [pendingUsers, setPendingUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadPendingUsers();
//   }, []);

//   const loadPendingUsers = async () => {
//     try {
//       const token = authService.getToken();
//       // Mock data - replace with actual API call
//       const mockUsers = [
//         { id: 1, username: 'newuser1', email: 'newuser1@company.com', role: 'BD Executive' },
//         { id: 2, username: 'newuser2', email: 'newuser2@company.com', role: 'Team Lead' },
//         { id: 3, username: 'newuser3', email: 'newuser3@company.com', role: 'BD Executive' }
//       ];
//       setPendingUsers(mockUsers);
//     } catch (error) {
//       console.error('Error loading pending users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const approveUser = async (userId) => {
//     try {
//       const token = authService.getToken();
//       // Mock API call
//       console.log('Approving user:', userId);
      
//       // Remove user from pending list
//       setPendingUsers(pendingUsers.filter(user => user.id !== userId));
//       alert('User approved successfully!');
//     } catch (error) {
//       console.error('Error approving user:', error);
//       alert('Error approving user. Please try again.');
//     }
//   };

//   const handleLogout = () => {
//     authService.logout();
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ 
//       fontFamily: 'Montserrat', 
//       background: '#f4f7fa', 
//       margin: 0, 
//       padding: '20px',
//       minHeight: '100vh'
//     }}>
//       <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//         <h2 style={{ color: '#007bff', marginBottom: '20px' }}>
//           IT Admin Panel - Approve Users
//         </h2>
        
//         <button 
//           className="logout-btn" 
//           onClick={handleLogout}
//           style={{
//             float: 'right',
//             padding: '6px 12px',
//             background: '#dc3545',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}
//         >
//           Logout
//         </button>
        
//         <div style={{ clear: 'both' }}></div>

//         <table style={{ 
//           width: '100%', 
//           borderCollapse: 'collapse', 
//           marginTop: '20px', 
//           background: '#fff' 
//         }}>
//           <thead>
//             <tr>
//               <th style={{ 
//                 padding: '12px', 
//                 border: '1px solid #ddd', 
//                 textAlign: 'left',
//                 backgroundColor: '#007bff',
//                 color: '#fff'
//               }}>
//                 Username
//               </th>
//               <th style={{ 
//                 padding: '12px', 
//                 border: '1px solid #ddd', 
//                 textAlign: 'left',
//                 backgroundColor: '#007bff',
//                 color: '#fff'
//               }}>
//                 Email
//               </th>
//               <th style={{ 
//                 padding: '12px', 
//                 border: '1px solid #ddd', 
//                 textAlign: 'left',
//                 backgroundColor: '#007bff',
//                 color: '#fff'
//               }}>
//                 Role
//               </th>
//               <th style={{ 
//                 padding: '12px', 
//                 border: '1px solid #ddd', 
//                 textAlign: 'left',
//                 backgroundColor: '#007bff',
//                 color: '#fff'
//               }}>
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {pendingUsers.length === 0 ? (
//               <tr>
//                 <td colSpan="4" style={{ 
//                   padding: '20px', 
//                   textAlign: 'center', 
//                   border: '1px solid #ddd' 
//                 }}>
//                   No pending users for approval
//                 </td>
//               </tr>
//             ) : (
//               pendingUsers.map(user => (
//                 <tr key={user.id}>
//                   <td style={{ padding: '12px', border: '1px solid #ddd' }}>
//                     {user.username}
//                   </td>
//                   <td style={{ padding: '12px', border: '1px solid #ddd' }}>
//                     {user.email}
//                   </td>
//                   <td style={{ padding: '12px', border: '1px solid #ddd' }}>
//                     {user.role}
//                   </td>
//                   <td style={{ padding: '12px', border: '1px solid #ddd' }}>
//                     <button
//                       onClick={() => approveUser(user.id)}
//                       style={{
//                         padding: '6px 12px',
//                         background: '#28a745',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: '4px',
//                         cursor: 'pointer'
//                       }}
//                     >
//                       Approve
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;