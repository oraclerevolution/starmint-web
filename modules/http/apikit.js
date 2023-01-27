import axios from "axios";

export const TOKEN_KEY = 'SESSION_STORAGE_AUTH_token';

const apiKit = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Add a request interceptor
apiKit.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  
  return config;
});


export default apiKit;
