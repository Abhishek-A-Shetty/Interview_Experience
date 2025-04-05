import api from './api';

const experienceService = {
  // Get all experiences
  getAllExperiences: async () => {
    try {
      const response = await api.get('/api/experiences');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user experiences
  getUserExperiences: async () => {
    try {
      const response = await api.get('/api/experiences/user');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new experience
  createExperience: async (experienceData) => {
    try {
      const response = await api.post('/api/experiences', experienceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete experience
  deleteExperience: async (id) => {
    try {
      const response = await api.delete(`/api/experiences/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default experienceService; 