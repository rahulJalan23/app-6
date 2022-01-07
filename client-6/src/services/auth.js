import axios from 'axios';
import backendUrl from './backendUrl';

const login = async (credentials) => {
  const response = await axios.post(`${backendUrl}/auth/login`, credentials);
  return response.data;
};

const signup = async (enteredData) => {
  const response = await axios.post(`${backendUrl}/auth/register`, enteredData);
  return response.data;
};

const authService = { login, signup };

export default authService;
