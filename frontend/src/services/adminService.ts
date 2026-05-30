import api from './api';
import { AdminDashboardStats } from '../types';

export const adminService = {
  getDashboardStats: async (): Promise<AdminDashboardStats> => {
    const response = await api.get<AdminDashboardStats>('/admin/analytics/dashboard');
    return response.data;
  }
};

export default adminService;
