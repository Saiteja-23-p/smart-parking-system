import api from './api';
import { Booking, BookingRequest } from '../types';

export const bookingService = {
  createBooking: async (request: BookingRequest): Promise<Booking> => {
    const response = await api.post<Booking>('/bookings', request);
    return response.data;
  },

  getUserBookings: async (): Promise<Booking[]> => {
    const response = await api.get<Booking[]>('/bookings/my');
    return response.data;
  },

  cancelBooking: async (bookingId: string | number): Promise<Booking> => {
    const response = await api.put<Booking>(`/bookings/${bookingId}/cancel`);
    return response.data;
  }
};

export default bookingService;
