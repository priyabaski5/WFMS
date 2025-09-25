const API_BASE_URL = 'http://localhost:5001/api';

class ApiService {
    static async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, config);
            
            // Handle non-JSON responses
            const contentType = response.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                throw new Error(data.message || data || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Auth APIs
    static async login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    static async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    // Admin APIs
    static async getPendingUsers() {
        return this.request('/admin/pending-users');
    }

    static async approveUser(userId) {
        return this.request('/admin/approve-user', {
            method: 'POST',
            body: JSON.stringify({ userId }),
        });
    }

    static async getAllUsers() {
        return this.request('/admin/all-users');
    }
}

export default ApiService;
// const API_BASE_URL = 'http://localhost:5001/api';

// class ApiService {
//     static async request(endpoint, options = {}) {
//         const url = `${API_BASE_URL}${endpoint}`;
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...options.headers,
//             },
//             ...options,
//         };

//         // Add auth token if available
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         try {
//             const response = await fetch(url, config);
//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'API request failed');
//             }

//             return data;
//         } catch (error) {
//             console.error('API Error:', error);
//             throw error;
//         }
//     }

//     // Auth APIs
//     static async login(credentials) {
//         return this.request('/auth/login', {
//             method: 'POST',
//             body: JSON.stringify(credentials),
//         });
//     }

//     static async register(userData) {
//         return this.request('/auth/register', {
//             method: 'POST',
//             body: JSON.stringify(userData),
//         });
//     }

//     static async getPendingUsers() {
//         return this.request('/auth/pending-users');
//     }

//     static async approveUser(userId) {
//         return this.request('/auth/approve-user', {
//             method: 'POST',
//             body: JSON.stringify({ userId }),
//         });
//     }

//     // Meeting APIs
//     static async saveMeeting(meetingData) {
//         return this.request('/meetings', {
//             method: 'POST',
//             body: JSON.stringify(meetingData),
//         });
//     }

//     static async getMeetings() {
//         return this.request('/meetings');
//     }

//     // Dashboard APIs
//     static async getDashboardData(role) {
//         return this.request(`/dashboard/${role}`);
//     }

//     static async getReportsData(period) {
//         return this.request(`/reports?period=${period}`);
//     }
// }

// export default ApiService;