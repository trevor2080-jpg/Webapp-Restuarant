import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const restaurantApi = {
  getAll: () => axios.get(`${API_URL}/restaurant`),
  delete: (id: number) => axios.delete(`${API_URL}/restaurant/${id}`),
  create: (data: any) => axios.post(`${API_URL}/restaurant`, data),
  update: (id: number, data: any) => axios.put(`${API_URL}/restaurant/${id}`, data),
};