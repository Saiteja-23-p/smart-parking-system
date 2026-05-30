import api from './api';
import { Wallet } from '../types';

export const walletService = {
  getWallet: async (): Promise<Wallet> => {
    const response = await api.get<Wallet>('/wallet');
    return response.data;
  },

  topUpWallet: async (amount: number, paymentMethod = 'UPI'): Promise<Wallet> => {
    const response = await api.post<Wallet>('/wallet/topup', null, {
      params: { amount, paymentMethod }
    });
    return response.data;
  }
};

export default walletService;
