import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

export const register = async (userData) => {
    return await axios.post(`${API_URL}register`, userData);
}

export const login = async (userData) => {
    console.log('userData', userData);
    return await axios.post(`${API_URL}login`, userData);
}