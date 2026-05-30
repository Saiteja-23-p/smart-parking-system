import api from './api';
import { ParkingHub, ParkingSlot } from '../types';

export const parkingService = {
  getAllHubs: async (): Promise<ParkingHub[]> => {
    const response = await api.get<ParkingHub[]>('/hubs');
    return response.data;
  },

  searchNearbyHubs: async (lat: number, lng: number, radius = 50.0): Promise<ParkingHub[]> => {
    const response = await api.get<ParkingHub[]>('/hubs/search', {
      params: { lat, lng, radius },
    });
    return response.data;
  },

  getHubDetails: async (id: number | string): Promise<ParkingHub> => {
    const response = await api.get<ParkingHub>(`/hubs/${id}`);
    return response.data;
  },

  getHubSlots: async (id: number | string): Promise<ParkingSlot[]> => {
    const response = await api.get<ParkingSlot[]>(`/hubs/${id}/slots`);
    return response.data;
  },

  updateSlotStatus: async (slotId: number | string, status: 'AVAILABLE' | 'RESERVED' | 'OCCUPIED'): Promise<ParkingSlot> => {
    const response = await api.put<ParkingSlot>(`/hubs/slots/${slotId}/status`, { status });
    return response.data;
  }
};

export default parkingService;
