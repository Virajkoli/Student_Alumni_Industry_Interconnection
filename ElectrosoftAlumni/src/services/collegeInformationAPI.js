import apiService from '../utils/apiService';

// College Information API calls
export const collegeInformationAPI = {
  // Get college information with campuses
  getCollegeInformation: async (collegeId) => {
    try {
      const response = await apiService.request(`/api/colleges/${collegeId}/information`);
      return response;
    } catch (error) {
      console.error('Error fetching college information:', error);
      throw error;
    }
  },

  // Update college information
  updateCollegeInformation: async (collegeId, data) => {
    try {
      const response = await apiService.request(`/api/colleges/${collegeId}/information`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.error('Error updating college information:', error);
      throw error;
    }
  },

  // Get college campuses
  getCollegeCampuses: async (collegeId) => {
    try {
      const response = await apiService.request(`/api/colleges/${collegeId}/campuses`);
      return response;
    } catch (error) {
      console.error('Error fetching college campuses:', error);
      throw error;
    }
  },

  // Update college campuses
  updateCollegeCampuses: async (collegeId, campuses) => {
    try {
      const response = await apiService.request(`/api/colleges/${collegeId}/campuses`, {
        method: 'PUT',
        body: JSON.stringify({ campuses }),
      });
      return response;
    } catch (error) {
      console.error('Error updating college campuses:', error);
      throw error;
    }
  },

  // Add a new campus
  addCollegeCampus: async (collegeId, campusData) => {
    try {
      const response = await apiService.request(`/api/colleges/${collegeId}/campuses`, {
        method: 'POST',
        body: JSON.stringify(campusData),
      });
      return response;
    } catch (error) {
      console.error('Error adding college campus:', error);
      throw error;
    }
  },

  // Delete a campus
  deleteCollegeCampus: async (collegeId, campusId) => {
    try {
      const response = await apiService.request(`/api/colleges/${collegeId}/campuses/${campusId}`, {
        method: 'DELETE',
      });
      return response;
    } catch (error) {
      console.error('Error deleting college campus:', error);
      throw error;
    }
  },
};

export default collegeInformationAPI;
