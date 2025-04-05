export const isProd = process.env.REACT_APP_ENV === 'production';
export const isDev = process.env.REACT_APP_ENV === 'development';

export const getApiUrl = () => process.env.REACT_APP_API_URL;
export const getGoogleClientId = () => process.env.REACT_APP_GOOGLE_CLIENT_ID;