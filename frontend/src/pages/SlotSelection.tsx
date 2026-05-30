import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, HelpCircle, ShieldAlert, Cpu, Sparkles, Navigation, DollarSign } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { ParkingSlot, ParkingHub, Booking } from '../types';
import { parkingService } from '../services/parkingService';
import { bookingService } from '../services/bookingService';

// List of all mock hubs as fallback
const defaultMockHubs: ParkingHub[] = [
  {
    id: 1,
    hubName: 'Inorbit Mall Smart Hub',
    address: 'Mindspace, Madhapur, Hyderabad, India',
    city: 'Hyderabad',
    latitude: 17.4346,
    longitude: 78.3866,
    hubType: 'MALL',
    totalCapacity: 200,
    totalFloors: 3,
    rating: 4.8,
    evEnabled: true,
    availableSlots: 62,
    totalSlots: 200,
    distanceKm: 0.8,
    lowestPrice: 50.0
  },
  {
    id: 2,
    hubName: 'GVK One Premium Parking',
    address: 'Banjara Hills, Hyderabad, India',
    city: 'Hyderabad',
    latitude: 17.4184,
    longitude: 78.4485,
    hubType: 'COMMERCIAL',
    totalCapacity: 150,
    totalFloors: 2,
    rating: 4.7,
    evEnabled: true,
    availableSlots: 15,
    totalSlots: 150,
    distanceKm: 4.2,
    lowestPrice: 70.0
  },
  {
    id: 3,
    hubName: 'T-Hub Innovation Parking',
    address: 'Raidurg, Hyderabad, India',
    city: 'Hyderabad',
    latitude: 17.4384,
    longitude: 78.3756,
    hubType: 'COMMERCIAL',
    totalCapacity: 100,
    totalFloors: 1,
    rating: 4.9,
    evEnabled: true,
    availableSlots: 48,
    totalSlots: 100,
    distanceKm: 1.2,
    lowestPrice: 40.0
  },
  {
    id: 11,
    hubName: 'Korutla Bus Stand Parking',
    address: 'Bus Stand Rd, Korutla, Telangana, India',
    city: 'Korutla',
    latitude: 18.8242,
    longitude: 78.7128,
    hubType: 'COMMERCIAL',
    totalCapacity: 100,
    totalFloors: 1,
    rating: 4.6,
    evEnabled: true,
    availableSlots: 32,
    totalSlots: 100,
    distanceKm: 0.1,
    lowestPrice: 30.0
  },
  {
    id: 12,
    hubName: 'Korutla Shopping Complex',
    address: 'Main Road, Korutla, Telangana, India',
    city: 'Korutla',
    latitude: 18.8214,
    longitude: 78.7145,
    hubType: 'MALL',
    totalCapacity: 120,
    totalFloors: 2,
    rating: 4.7,
    evEnabled: true,
    availableSlots: 45,
    totalSlots: 120,
    distanceKm: 0.4,
    lowestPrice: 40.0
  },
  {
    id: 13,
    hubName: 'Korutla Metro-Mart Terminal',
    address: 'Metpally Rd, Korutla, Telangana, India',
    city: 'Korutla',
    latitude: 18.8270,
    longitude: 78.7080,
    hubType: 'MALL',
    totalCapacity: 150,
    totalFloors: 2,
    rating: 4.5,
    evEnabled: true,
    availableSlots: 88,
    totalSlots: 150,
    distanceKm: 0.9,
    lowestPrice: 40.0
  },
  {
    id: 14,
    hubName: 'Korutla Smart Market Hub',
    address: 'Ganesh Temple Road, Korutla, Telangana, India',
    city: 'Korutla',
    latitude: 18.8185,
    longitude: 78.7160,
    hubType: 'STREET',
    totalCapacity: 50,
    totalFloors: 1,
    rating: 4.3,
    evEnabled: false,
    availableSlots: 18,
    totalSlots: 50,
    distanceKm: 1.1,
    lowestPrice: 20.0
  },
  {
    id: 4,
    hubName: 'Airport Smart Park',
    address: 'Shamshabad, Hyderabad, India',
    city: 'Hyderabad',
    latitude: 17.2315,
    longitude: 78.4294,
    hubType: 'AIRPORT',
    totalCapacity: 500,
    totalFloors: 5,
    rating: 4.6,
    evEnabled: true,
    availableSlots: 215,
    totalSlots: 500,
    distanceKm: 24.5,
    lowestPrice: 60.0
  },
  {
    id: 5,
    hubName: 'Charminar Tourist Parking',
    address: 'Charminar, Hyderabad, India',
    city: 'Hyderabad',
    latitude: 17.3616,
    longitude: 78.4747,
    hubType: 'STREET',
    totalCapacity: 50,
    totalFloors: 1,
    rating: 4.4,
    evEnabled: false,
    availableSlots: 12,
    totalSlots: 50,
    distanceKm: 9.8,
    lowestPrice: 15.0
  },
  {
    id: 6,
    hubName: 'UB City Mall Parking',
    address: 'Vittal Mallya Rd, Bengaluru, India',
    city: 'Bengaluru',
    latitude: 12.9724,
    longitude: 77.5951,
    hubType: 'MALL',
    totalCapacity: 250,
    totalFloors: 4,
    rating: 4.8,
    evEnabled: true,
    availableSlots: 182,
    totalSlots: 250,
    distanceKm: 500.0,
    lowestPrice: 60.0
  },
  {
    id: 7,
    hubName: 'Connaught Place Smart CP',
    address: 'New Delhi, India',
    city: 'New Delhi',
    latitude: 28.6304,
    longitude: 77.2177,
    hubType: 'STREET',
    totalCapacity: 80,
    totalFloors: 1,
    rating: 4.5,
    evEnabled: false,
    availableSlots: 42,
    totalSlots: 80,
    distanceKm: 1200.0,
    lowestPrice: 40.0
  },
  {
    id: 8,
    hubName: 'Piccadilly Circus Terminal',
    address: 'West End, London, UK',
    city: 'London',
    latitude: 51.5101,
    longitude: -0.1342,
    hubType: 'COMMERCIAL',
    totalCapacity: 150,
    totalFloors: 2,
    rating: 4.7,
    evEnabled: true,
    availableSlots: 55,
    totalSlots: 150,
    distanceKm: 7800.0,
    lowestPrice: 120.0
  },
  {
    id: 9,
    hubName: 'Times Square Smart Hub',
    address: 'Manhattan, New York, USA',
    city: 'New York',
    latitude: 40.7580,
    longitude: -73.9855,
    hubType: 'COMMERCIAL',
    totalCapacity: 300,
    totalFloors: 3,
    rating: 4.9,
    evEnabled: true,
    availableSlots: 91,
    totalSlots: 300,
    distanceKm: 13000.0,
    lowestPrice: 150.0
  },
  {
    id: 10,
    hubName: 'SF Wharf Station Parking',
    address: 'Fisherman\'s Wharf, San Francisco, USA',
    city: 'San Francisco',
    latitude: 37.8080,
    longitude: -122.4177,
    hubType: 'COMMERCIAL',
    totalCapacity: 100,
    totalFloors: 1,
    rating: 4.6,
    evEnabled: true,
    availableSlots: 38,
    totalSlots: 100,
    distanceKm: 14000.0,
    lowestPrice: 100.0
  }
];

const getHubPrefix = (name: string): string => {
  if (name.includes('Inorbit')) return 'IN';
  if (name.includes('GVK')) return 'GV';
  if (name.includes('T-Hub')) return 'TH';
  if (name.includes('Airport')) return 'AP';
  if (name.includes('Charminar')) return 'CH';
  if (name.includes('UB City')) return 'UB';
  if (name.includes('Connaught')) return 'ND-CP';
  if (name.includes('Piccadilly')) return 'PC';
  if (name.includes('Times Square')) return 'TS';
  if (name.includes('SF Wharf')) return 'SF';
  if (name.includes('Korutla Bus')) return 'KB';
  if (name.includes('Korutla Shopping')) return 'KC';
  if (name.includes('Korutla Metro')) return 'KM';
  if (name.includes('Korutla Smart')) return 'KS';
  const clean = name.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase();
  const parts = clean.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export const SlotSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Load preselected hub from routing state, or fallback to default Madhapur
  const initialHub: ParkingHub = location.state?.preselectedHub || {
    id: 1,
    hubName: 'Inorbit Mall Smart Hub',
    address: 'Mindspace, Madhapur, Hyderabad',
    city: 'Hyderabad',
    latitude: 17.4346,
    longitude: 78.3866,
    hubType: 'MALL',
    totalCapacity: 200,
    totalFloors: 3,
    rating: 4.8,
    evEnabled: true,
    availableSlots: 62,
    totalSlots: 200,
    distanceKm: 0.8,
    lowestPrice: 50.0
  };

  const [hubs, setHubs] = useState<ParkingHub[]>([]);
  const [hub, setHub] = useState<ParkingHub>(initialHub);
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [duration, setDuration] = useState<number>(2); // default 2 hours
  const [vehicleNumber, setVehicleNumber] = useState('TS09AB1234');
  const [bookingMode, setBookingMode] = useState<'NOW' | 'SCHEDULED'>('NOW');
  const [planDate, setPlanDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [planTime, setPlanTime] = useState<string>('12:00');
  const [planName, setPlanName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [bookingProgress, setBookingProgress] = useState(false);
  const [error, setError] = useState('');

  // Fetch all hubs
  useEffect(() => {
    const loadHubs = async () => {
      try {
        const response = await parkingService.getAllHubs();
        if (response && response.length > 0) {
          setHubs(response);
          const found = response.find(h => h.id === hub.id);
          if (found) setHub(found);
        } else {
          setHubs(defaultMockHubs);
          const found = defaultMockHubs.find(h => h.id === hub.id);
          if (found) setHub(found);
        }
      } catch (e) {
        console.warn('API error loading hubs. Setting default local hubs list.', e);
        setHubs(defaultMockHubs);
        const found = defaultMockHubs.find(h => h.id === hub.id);
        if (found) setHub(found);
      }
    };
    loadHubs();
  }, []);

  // Fetch slots from Spring Boot API or generate mock slots localized to India
  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const response = await parkingService.getHubSlots(hub.id);
        if (response && response.length > 0) {
          const mapped = response.map((s: any) => ({
            ...s,
            currentDynamicPrice: s.currentDynamicPrice || s.basePrice || 50.0,
            basePrice: s.basePrice || 50.0
          }));
          setSlots(mapped);
        } else {
          setSlots(getMockSlots());
        }
      } catch (e) {
        console.warn('API slots fetch failed. Seeding local Gachibowli slot bays.', e);
        setSlots(getMockSlots());
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [hub]);

  const getMockSlots = (): ParkingSlot[] => {
    const generated: ParkingSlot[] = [];
    const types = ['REGULAR', 'EV', 'BIKE'];
    const prices = [50.0, 80.0, 20.0];
    const prefix = getHubPrefix(hub.hubName);
    
    // Generate slots matrix based on total floors
    const floors = hub.totalFloors || 3;
    for (let floor = 1; floor <= floors; floor++) {
      for (let num = 1; num <= 8; num++) {
        const idx = (floor + num) % 3;
        const type = types[idx];
        const basePrice = prices[idx];

        // Pseudo-random status
        const seed = (floor * 7 + num * 13) % 10;
        let status: 'AVAILABLE' | 'RESERVED' | 'OCCUPIED' = 'AVAILABLE';
        if (seed < 3) status = 'OCCUPIED';
        else if (seed < 5) status = 'RESERVED';

        generated.push({
          id: floor * 100 + num,
          hubId: Number(hub.id),
          floorLevel: floor,
          slotNumber: `${prefix}-F${floor}-${type.slice(0, 2)}${num}`,
          type,
          status,
          vehicleType: type === 'BIKE' ? 'BIKE' : 'CAR',
          isEvCharging: type === 'EV',
          basePrice,
          currentDynamicPrice: basePrice * (status === 'OCCUPIED' ? 1.2 : 1.0)
        });
      }
    }
    return generated;
  };

  const handleSelectSlot = (slot: ParkingSlot) => {
    if (slot.status === 'AVAILABLE') {
      setSelectedSlot(slot);
    }
  };

  const handleConfirmReservation = async () => {
    if (!selectedSlot) return;
    if (!vehicleNumber.trim()) {
      setError('Please provide a vehicle license number.');
      return;
    }

    setBookingProgress(true);
    setError('');

    // Compute start and end times dynamically based on selected booking mode
    let startTimeString = new Date().toISOString();
    let endTimeString = new Date(Date.now() + duration * 60 * 60 * 1000).toISOString();

    if (bookingMode === 'SCHEDULED') {
      try {
        const parsedStart = new Date(`${planDate}T${planTime}:00`);
        startTimeString = parsedStart.toISOString();
        endTimeString = new Date(parsedStart.getTime() + duration * 60 * 60 * 1000).toISOString();
      } catch (err) {
        console.error('Invalid scheduled date/time values', err);
      }
    }

    const bookingPayload = {
      hubId: Number(hub.id),
      slotId: selectedSlot.id,
      vehicleNumber: vehicleNumber.toUpperCase(),
      startTime: startTimeString,
      endTime: endTimeString
    };

    try {
      // Connect to Spring Boot Booking Endpoint
      const response = await bookingService.createBooking({
        ...bookingPayload,
        // Match backend fields exactly
        vehicleId: 1 // fallback dev user vehicle
      });

      const savedBooking: Booking = {
        id: response.id,
        hubId: response.hubId,
        hubName: hub.hubName,
        hubAddress: hub.address,
        slotId: response.slotId,
        slotNumber: selectedSlot.slotNumber,
        startTime: response.startTime,
        endTime: response.endTime,
        totalAmount: response.totalAmount,
        status: response.status,
        bookingToken: response.bookingToken || `TK-${response.id}-${Date.now()}`,
        vehicleNumber: response.vehicleNumber,
        passCode: `PASS-${response.id}` as any, // custom pass override
        eventName: bookingMode === 'SCHEDULED' ? planName : undefined
      } as any;

      localStorage.setItem('currentBooking', JSON.stringify(savedBooking));
      
      setTimeout(() => {
        setBookingProgress(false);
        navigate('/pass');
      }, 1500);

    } catch (e: any) {
      console.warn('API Booking Creation failed. Proceeding with offline transaction clearing.', e);
      // Fallback sandbox mock booking
      const fallbackBooking: Booking = {
        id: 'bk-' + Math.floor(1000 + Math.random() * 9000),
        hubId: Number(hub.id),
        hubName: hub.hubName,
        hubAddress: hub.address,
        slotId: selectedSlot.id,
        slotNumber: selectedSlot.slotNumber,
        startTime: bookingPayload.startTime,
        endTime: bookingPayload.endTime,
        totalAmount: (selectedSlot.currentDynamicPrice || selectedSlot.basePrice || 50.0) * duration,
        status: 'ACTIVE',
        bookingToken: `TOKEN-${selectedSlot.slotNumber}-${Date.now()}`,
        vehicleNumber: vehicleNumber.toUpperCase(),
        eventName: bookingMode === 'SCHEDULED' ? planName : undefined
      } as any;

      localStorage.setItem('currentBooking', JSON.stringify(fallbackBooking));

      setTimeout(() => {
        setBookingProgress(false);
        navigate('/pass');
      }, 1500);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col gap-4 relative overflow-hidden bg-slate-50">
      
      {/* Modern Hub Selector at the very top */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-[#2563EB] rounded-lg">
            <Navigation className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              Select Parking Terminal <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5 uppercase">
              Current Terminal: <span className="font-bold text-slate-700">{hub.hubName}</span> ({hub.city})
            </p>
          </div>
        </div>
        
        <div className="relative min-w-[280px]">
          <select
            value={hub.id}
            onChange={(e) => {
              const selected = hubs.find(h => h.id === Number(e.target.value));
              if (selected) {
                setHub(selected);
                setSelectedSlot(null);
              }
            }}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 text-xs rounded-lg font-bold text-slate-700 uppercase focus:outline-none focus:border-[#2563EB] cursor-pointer"
          >
            {hubs.map((h) => (
              <option key={h.id} value={h.id}>
                {h.hubName} ({h.city}) &bull; ₹{(h.lowestPrice || 40.0).toFixed(2)}/hr
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid View and Checkout details */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden min-h-0">
        
        {/* Left grid Matrix container */}
        <div className="flex-1 border border-slate-200 bg-white rounded-xl shadow-sm flex flex-col relative overflow-hidden">
          
          {/* Title Bar */}
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[#2563EB]" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {hub.hubName} &bull; Select Smart Bay
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span>VACANT</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                <span>RESERVED</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span>OCCUPIED</span>
              </div>
            </div>
          </div>

          {/* Matrix grids */}
          <div className="flex-1 p-6 flex flex-col justify-center items-center overflow-y-auto">
            <div className="w-full max-w-2xl flex justify-around mb-2 px-6 font-mono text-[9px] text-slate-400 font-semibold select-none">
              <span>COL_1</span>
              <span>COL_2</span>
              <span>COL_3</span>
              <span>COL_4</span>
              <span>COL_5</span>
              <span>COL_6</span>
              <span>COL_7</span>
              <span>COL_8</span>
            </div>

            <div className="w-full max-w-2xl border border-slate-100 bg-slate-50/50 p-6 flex flex-col gap-6 relative rounded-xl shadow-inner">
              {['VIP', 'EV', 'STANDARD'].map((sect, idx) => {
                // Standardized sectors mapping
                const sectType = sect === 'VIP' ? 'EV' : sect === 'EV' ? 'REGULAR' : 'BIKE';
                const sectLabel = sect === 'VIP' ? 'EV Charging Hub' : sect === 'EV' ? 'Premium Four-Wheeler' : 'Two-Wheeler Spot';
                
                const sectSlots = slots.filter(s => {
                  if (sect === 'VIP') return s.isEvCharging;
                  if (sect === 'EV') return !s.isEvCharging && s.vehicleType === 'CAR';
                  return s.vehicleType === 'BIKE';
                });

                return (
                  <div key={sect} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {sectLabel}
                      </span>
                      {sect === 'VIP' && <span className="text-[9px] text-[#2563EB] font-bold uppercase">₹80.00/hr base</span>}
                      {sect === 'EV' && <span className="text-[9px] text-emerald-600 font-bold uppercase">₹50.00/hr base</span>}
                      {sect === 'STANDARD' && <span className="text-[9px] text-slate-500 font-bold uppercase">₹20.00/hr base</span>}
                    </div>

                    <div className="grid grid-cols-8 gap-2.5">
                      {sectSlots.slice(0, 8).map((slot) => {
                        const isSelected = selectedSlot?.id === slot.id;
                        return (
                          <button
                            key={slot.id}
                            disabled={slot.status !== 'AVAILABLE'}
                            onClick={() => handleSelectSlot(slot)}
                            className={`aspect-square w-full border font-sans text-xs flex flex-col items-center justify-center relative select-none rounded-lg transition-all duration-150 ${
                              slot.status === 'AVAILABLE'
                                ? isSelected
                                  ? 'bg-[#2563EB]/10 border-[#2563EB] text-[#2563EB] shadow-md font-bold'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-[#2563EB] hover:bg-blue-50/20'
                                : slot.status === 'RESERVED'
                                  ? 'bg-blue-50/40 border-blue-100 text-blue-300 cursor-not-allowed'
                                  : 'bg-red-50/40 border-red-100 text-red-300 cursor-not-allowed'
                            }`}
                          >
                            <span>{slot.slotNumber.slice(-3)}</span>
                            <span className={`absolute bottom-1.5 h-1 w-1 rounded-full ${
                              slot.status === 'AVAILABLE'
                                ? isSelected ? 'bg-[#2563EB]' : 'bg-emerald-500'
                                : slot.status === 'RESERVED'
                                  ? 'bg-blue-400'
                                  : 'bg-red-500'
                            }`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scrubber slider */}
          <div className="p-5 border-t border-slate-200 bg-slate-50/50">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#2563EB]" />
                Select Duration Timeframe
              </span>
              <span className="text-xs font-bold text-[#2563EB]">
                {duration} HOURS
              </span>
            </div>
            <div className="relative w-full flex items-center gap-4">
              <span className="text-[10px] text-slate-400 font-bold">01 HR</span>
              <input
                type="range"
                min="1"
                max="12"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="flex-1 accent-[#2563EB] bg-slate-200 h-1 rounded-full appearance-none cursor-pointer focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 font-bold">12 HR</span>
            </div>
          </div>

        </div>

        {/* Right checkouts pane */}
        <div className="w-full lg:w-96 flex flex-col gap-4 overflow-y-auto max-h-[400px] lg:max-h-none shrink-0">
          {selectedSlot ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
            >
              {/* Detailed Checkout Card */}
              <Card className="w-full relative shadow-md">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                  Selected Booking Spot
                </span>
                <h3 className="text-2xl font-bold text-[#0F172A] tracking-wide uppercase">
                  {selectedSlot.slotNumber}
                </h3>

                <div className="mt-4 flex items-center gap-2">
                  <Badge variant={selectedSlot.isEvCharging ? 'info' : selectedSlot.vehicleType === 'BIKE' ? 'warning' : 'success'}>
                    {selectedSlot.isEvCharging ? 'EV Charging Hub' : selectedSlot.vehicleType === 'BIKE' ? 'Two-Wheeler' : 'Standard Car'}
                  </Badge>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <Navigation className="h-3.5 w-3.5 text-[#2563EB]" />
                    <span>Floor Level {selectedSlot.floorLevel}</span>
                  </div>
                </div>

                {/* Form to enter vehicle plate number */}
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <Input
                    label="Vehicle License Number"
                    placeholder="e.g., TS09AB1234"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                    required
                  />
                </div>

                {/* Scheduling & Advance Booking Configuration */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-4">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Reservation Timeframe
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-lg text-[10px] font-bold uppercase">
                    <button
                      type="button"
                      onClick={() => setBookingMode('NOW')}
                      className={`py-2 px-3 rounded-md text-center transition-all duration-150 ${
                        bookingMode === 'NOW'
                          ? 'bg-white text-[#2563EB] shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Instant (Now)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingMode('SCHEDULED')}
                      className={`py-2 px-3 rounded-md text-center transition-all duration-150 ${
                        bookingMode === 'SCHEDULED'
                          ? 'bg-white text-[#2563EB] shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Plan Event
                    </button>
                  </div>

                  {bookingMode === 'SCHEDULED' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3 pt-2"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                            Arrival Date
                          </label>
                          <input
                            type="date"
                            value={planDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setPlanDate(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded-lg text-slate-800 focus:outline-none focus:border-[#2563EB] font-mono font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                            Arrival Time
                          </label>
                          <input
                            type="time"
                            value={planTime}
                            onChange={(e) => setPlanTime(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded-lg text-slate-800 focus:outline-none focus:border-[#2563EB] font-mono font-bold"
                          />
                        </div>
                      </div>
                      <div>
                        <Input
                          label="Plan / Event Name (Optional)"
                          placeholder="e.g., Mindspace Board Meeting, Concert"
                          value={planName}
                          onChange={(e) => setPlanName(e.target.value)}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Calculated price ledger */}
                {(() => {
                  const slotPrice = selectedSlot.currentDynamicPrice || selectedSlot.basePrice || 50.0;
                  return (
                    <div className="mt-6 space-y-3 text-xs text-slate-500 font-sans">
                      <div className="flex justify-between">
                        <span>TARIFF RATE:</span>
                        <span className="text-slate-800 font-bold">₹{slotPrice.toFixed(2)}/HR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>RESERVATION DURATION:</span>
                        <span className="text-slate-800 font-bold">{duration} HOURS</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SUB-TOTAL:</span>
                        <span className="text-slate-800 font-bold">₹{(slotPrice * duration).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SGST + CGST (18%):</span>
                        <span className="text-slate-800 font-bold">₹{(slotPrice * duration * 0.18).toFixed(2)}</span>
                      </div>
                      <div className="h-[1px] bg-slate-100 w-full" />
                      <div className="flex justify-between text-sm font-bold text-[#0F172A]">
                        <span>TOTAL ESTIMATED TARIFF:</span>
                        <span className="text-[#2563EB]">
                          ₹{(slotPrice * duration * 1.18).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })()}

                {error && (
                  <div className="mt-4 text-xs text-red-500 font-bold bg-red-50 p-2 border border-red-100 rounded-lg">
                    {error}
                  </div>
                )}

                <Button
                  variant="primary"
                  className="w-full mt-6 py-3 shadow-sm"
                  onClick={handleConfirmReservation}
                  disabled={bookingProgress}
                >
                  {bookingProgress ? 'Processing Booking...' : 'Confirm Secure Booking'}
                </Button>
              </Card>
            </motion.div>
          ) : (
            <Card className="text-center py-16 flex flex-col items-center justify-center bg-slate-50/50">
              <HelpCircle className="h-8 w-8 text-slate-400 mb-3 animate-pulse" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Selection Required
              </h4>
              <p className="text-[10px] text-slate-400 uppercase mt-1 tracking-wider leading-relaxed max-w-[200px] mx-auto">
                Tap a vacant rectangular grid slot in the matrix layout to allocate your secure parking bay.
              </p>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
};

export default SlotSelection;
