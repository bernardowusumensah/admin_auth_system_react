import axios from 'axios';
import type { LoginRequestDto, LoginResponseDto } from '../types/auth.types';

// Base API URL
const API_URL = 'http://localhost:5215/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include authentication token when available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication API service
export const authApi = {
  // Login endpoint
  login: async (credentials: LoginRequestDto): Promise<LoginResponseDto> => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Basic validation
          if (!credentials.username || !credentials.password) {
            throw new Error('Username and password are required');
          }
          resolve({
            token: 'dummy-jwt-token',
            account: {
              id: '1',
              username: credentials.username,
              role: 'Administrator'
            }
          });
        }, 800); // 800ms delay to simulate network request
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
};

export default api;
