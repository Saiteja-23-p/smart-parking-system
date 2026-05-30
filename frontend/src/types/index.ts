export interface User {
  id: number | string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  vehicleNumber?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  jwt: string;
  id: number | string;
  name: string;
  email: string;
  role: string;
}

export type SlotStatus = 'AVAILABLE' | 'RESERVED' | 'OCCUPIED';
export type SlotType = 'REGULAR' | 'EV' | 'BIKE';

export interface ParkingSlot {
  id: number;
  hubId: number;
  floorLevel: number;
  slotNumber: string;
  type: string;
  status: SlotStatus;
  vehicleType: string;
  isEvCharging: boolean;
  chargerType?: string;
  basePrice: number;
  currentDynamicPrice: number;
  sensorStatus?: string;
  surgeMultiplier?: number;
}

export interface ParkingHub {
  id: number | string;
  hubName: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  hubType: string;
  totalCapacity: number;
  totalFloors: number;
  rating?: number;
  imageUrl?: string;
  evEnabled?: boolean;
  dynamicPricingEnabled?: boolean;
  operatingHours?: string;
  availableSlots: number;
  occupiedSlots?: number;
  totalSlots: number;
  occupancyPct?: number;
  lowestPrice?: number;
  highestPrice?: number;
  evChargersAvailable?: number;
  distanceKm?: number;
  isFavorited?: boolean;
  slots?: ParkingSlot[];
}

export interface BookingRequest {
  hubId: number | string;
  slotId: number | string;
  vehicleId?: number | string;
  vehicleNumber: string;
  startTime: string;
  endTime: string;
}

export type BookingStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'PENDING';

export interface Booking {
  id: number | string;
  hubId: number;
  hubName: string;
  hubAddress?: string;
  hubLat?: number;
  hubLng?: number;
  slotId: number;
  slotNumber: string;
  floorLevel?: number;
  vehicleId?: number | string;
  vehicleNumber: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  dynamicPriceApplied?: number;
  estimatedWalkingMinutes?: number;
  status: BookingStatus;
  bookingToken?: string;
  qrScannedAt?: string;
  checkInTime?: string;
  checkOutTime?: string;
  createdAt?: string;
}

export type TransactionType = 'DEPOSIT' | 'BOOKING_PAYMENT' | 'REFUND';

export interface Transaction {
  id: number | string;
  amount: number;
  timestamp: string;
  type: TransactionType;
  description: string;
}

export interface Wallet {
  id?: number;
  balance: number;
  status?: string;
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalSlots: number;
  availableSlots: number;
  occupiedSlots: number;
  reservedSlots: number;
  activeBookings: number;
}
