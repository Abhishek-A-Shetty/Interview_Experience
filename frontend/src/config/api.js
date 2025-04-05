const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL,
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '30000'),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
};

export default API_CONFIG; 