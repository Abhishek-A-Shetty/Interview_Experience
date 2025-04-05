import api from './api';

const authService = {
  // Google login
  googleLogin: async (tokenId) => {
    try {
      const response = await api.post('/api/auth/google', { tokenId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await api.post('/api/auth/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check auth status
  checkAuth: async () => {
    try {
      const response = await api.get('/api/auth/status');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default authService; 