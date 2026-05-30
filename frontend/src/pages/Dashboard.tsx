import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, Clock, Wallet, Activity, ArrowRight, MapPin, Plus, Navigation, Ticket
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Booking, Wallet as WalletType } from '../types';
import { bookingService } from '../services/bookingService';
import { walletService } from '../services/walletService';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [wallet, setWallet] = useState<WalletType>({ balance: 0.0 });
  const [stats, setStats] = useState({
    active: 0,
    total: 0,
    spent: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        // Load bookings
        const bookings = await bookingService.getUserBookings();
        if (bookings && bookings.length > 0) {
          const active = bookings.find(b => b.status === 'ACTIVE');
          if (active) setActiveBooking(active);
          
          const totalSpent = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
          setStats({
            active: bookings.filter(b => b.status === 'ACTIVE').length,
            total: bookings.length,
            spent: totalSpent
          });
          setRecentBookings(bookings.slice(0, 5));
        } else {
          loadMockDashboardData();
        }

        // Load wallet balance
        const walletData = await walletService.getWallet();
        if (walletData) {
          setWallet(walletData);
        }
      } catch (err) {
        console.warn('API connection failed. Loading offline secure dashboard data.', err);
        loadMockDashboardData();
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const loadMockDashboardData = () => {
    const mockBookings: Booking[] = [
      {
        id: 'bk-9941',
        hubId: 1,
        hubName: 'Inorbit Mall Smart Hub',
        hubAddress: 'Mindspace, Madhapur, Hyderabad',
        slotId: 1,
        slotNumber: 'IN-F1-01',
        floorLevel: 1,
        vehicleNumber: 'TS09AB1234',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
        totalAmount: 100.0,
        status: 'ACTIVE',
        bookingToken: 'TOKEN-IN-F1-01-9988'
      },
      {
        id: 'bk-9842',
        hubId: 3,
        hubName: 'T-Hub Innovation Parking',
        hubAddress: 'Raidurg, Gachibowli, Hyderabad',
        slotId: 8,
        slotNumber: 'TH-01',
        floorLevel: 1,
        vehicleNumber: 'TS09AB1234',
        startTime: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        endTime: new Date(Date.now() - 22 * 3600 * 1000).toISOString(),
        totalAmount: 80.0,
        status: 'COMPLETED',
        bookingToken: 'TOKEN-TH-01-9942'
      }
    ];

    setActiveBooking(mockBookings[0]);
    setRecentBookings(mockBookings);
    setWallet({ balance: 350.0 });
    setStats({
      active: 1,
      total: 2,
      spent: 180.0
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Greetings bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs text-slate-500 font-semibold block mb-1">
            Hyderabad Smart Commuter Node
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Commuter Command Center
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="primary"
            className="text-xs"
            onClick={() => navigate('/map')}
          >
            <MapPin className="h-4 w-4" /> Locate Nearby Hubs
          </Button>
        </div>
      </div>

      {/* Row 1: KPI Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI: Active spot */}
        <Card className="relative hover:border-[#2563EB]/20 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Bookings</span>
            <Activity className="h-5 w-5 text-[#2563EB]" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-[#0F172A] tracking-wider">{stats.active}</h3>
            <p className="text-[11px] text-[#2563EB] font-bold mt-2">Active Navigation Link</p>
          </div>
        </Card>

        {/* KPI: Completed trips */}
        <Card className="relative hover:border-[#2563EB]/20 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Sessions</span>
            <Car className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-[#0F172A] tracking-wider">{stats.total}</h3>
            <p className="text-[11px] text-emerald-600 font-bold mt-2">Completed Indian dock sessions</p>
          </div>
        </Card>

        {/* KPI: Wallet balance */}
        <Card className="relative hover:border-[#2563EB]/20 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Fastag wallet balance</span>
            <Wallet className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-[#0F172A] tracking-wider">₹{wallet.balance.toFixed(2)}</h3>
            <p className="text-[11px] text-amber-600 font-bold mt-2">Tariff clearing ready</p>
          </div>
        </Card>

      </div>

      {/* Row 2: Active Ticket and recent history */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Active Booking Pass or Quick Action */}
        <div className="flex flex-col gap-4">
          {activeBooking ? (
            <Card className="border-[#2563EB]/30 bg-blue-50/5 relative shadow-md">
              <div className="absolute top-0 right-0 p-3">
                <Badge variant="info">ACTIVE</Badge>
              </div>

              <span className="text-[10px] text-slate-400 font-bold block mb-1">
                ACTIVE GATE RESERVATION
              </span>
              <h4 className="text-lg font-bold text-[#0F172A] tracking-wide uppercase">
                {activeBooking.slotNumber}
              </h4>
              <p className="text-xs text-slate-500 mt-1 uppercase">
                {activeBooking.hubName}
              </p>

              <div className="mt-6 border-t border-slate-100 pt-4 font-mono text-xs space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>VEHICLE:</span>
                  <span className="font-bold text-slate-800">{activeBooking.vehicleNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>DOCK_TIME:</span>
                  <span className="text-slate-800">
                    {new Date(activeBooking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  variant="primary"
                  className="flex-1 text-xs"
                  onClick={() => {
                    localStorage.setItem('currentBooking', JSON.stringify(activeBooking));
                    navigate('/pass');
                  }}
                >
                  <Ticket className="h-4 w-4" /> View QR Pass
                </Button>
                <Button
                  variant="secondary"
                  className="text-xs"
                  onClick={() => navigate('/cockpit')}
                >
                  <Navigation className="h-4 w-4" /> GPS GPS
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="flex flex-col justify-between h-full bg-slate-50 p-5">
              <div>
                <span className="text-[9px] text-slate-400 font-semibold block mb-1">
                  NO ACTIVE RESERVATION
                </span>
                <h4 className="font-bold text-[#0F172A] text-base">
                  Quick Actions Protocol
                </h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Reserve a parking spot instantly in Madhapur or Banjara Hills. Save fuel and locate vacant slots.
                </p>
              </div>

              <div className="space-y-2 mt-8">
                <Button
                  variant="primary"
                  className="w-full flex justify-between items-center text-xs"
                  onClick={() => navigate('/book')}
                >
                  <span>Book Smart Bay Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  className="w-full flex justify-between items-center text-xs"
                  onClick={() => navigate('/wallet')}
                >
                  <span>Top-Up Fastag Wallet</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Right: Recent ledger logs */}
        <div className="lg:col-span-2 flex flex-col">
          <Card className="flex-1 p-0 overflow-hidden shadow-md">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs font-bold text-[#0F172A]">
                Recent Parking History Logs
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                SECURE_LEDGER
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase font-semibold">
                    <th className="p-4">Slot Bay</th>
                    <th className="p-4">Hyderabad Hub</th>
                    <th className="p-4">Duration interval</th>
                    <th className="p-4">Gate Status</th>
                    <th className="p-4 text-right">Cleared Tariff</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentBookings.length > 0 ? (
                    recentBookings.map((b) => (
                      <tr 
                        key={b.id} 
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                        onClick={() => {
                          if (b.status === 'ACTIVE') {
                            localStorage.setItem('currentBooking', JSON.stringify(b));
                            navigate('/pass');
                          }
                        }}
                      >
                        <td className="p-4 font-bold text-[#0F172A]">{b.slotNumber}</td>
                        <td className="p-4 text-slate-600">{b.hubName}</td>
                        <td className="p-4 text-slate-500 font-mono">
                          {new Date(b.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                          {new Date(b.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-4">
                          <Badge variant={b.status === 'ACTIVE' ? 'success' : b.status === 'COMPLETED' ? 'info' : 'error'}>
                            {b.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right text-slate-800 font-bold">
                          ₹{(b.totalAmount || 0).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400 uppercase tracking-widest text-[10px]">
                        No recent active booking logs recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
