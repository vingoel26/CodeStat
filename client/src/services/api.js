const API_URL = 'http://localhost:5000/api';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

// Auth API
export const authAPI = {
    register: (name, email, password) =>
        apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        }),

    login: (email, password) =>
        apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),

    getMe: () => apiCall('/auth/me'),
};

// Accounts API
export const accountsAPI = {
    getAll: () => apiCall('/accounts'),

    add: (platform, handle) =>
        apiCall('/accounts', {
            method: 'POST',
            body: JSON.stringify({ platform, handle }),
        }),

    remove: (id) =>
        apiCall(`/accounts/${id}`, {
            method: 'DELETE',
        }),

    refresh: (id) =>
        apiCall(`/accounts/${id}/refresh`, {
            method: 'POST',
        }),
};

// Platforms API
export const platformsAPI = {
    // Generic
    getData: (platform, handle) => apiCall(`/platforms/${platform}/${handle}`),

    // Codeforces Specific
    getCodeforcesProfile: (handle) => apiCall(`/platforms/codeforces/${handle}`),
    getCodeforcesRating: (handle) => apiCall(`/platforms/codeforces/${handle}/rating`),
};
