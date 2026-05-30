import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Users, DollarSign, Activity, AlertTriangle, ShieldCheck, 
  Terminal, ShieldAlert, Layers, Loader, Calendar
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { adminService } from '../services/adminService';
import { AdminDashboardStats } from '../types';

// Mock chart databases
const hourlyOperations = [
  { time: '02:00', bookings: 12, EV: 3 },
  { time: '04:00', bookings: 8, EV: 2 },
  { time: '06:00', bookings: 25, EV: 8 },
  { time: '08:00', bookings: 85, EV: 32 },
  { time: '10:00', bookings: 110, EV: 45 },
  { time: '12:00', bookings: 95, EV: 38 },
  { time: '14:00', bookings: 130, EV: 55 },
  { time: '16:00', bookings: 145, EV: 62 },
  { time: '18:00', bookings: 165, EV: 74 },
  { time: '20:00', bookings: 120, EV: 48 },
  { time: '22:00', bookings: 75, EV: 25 },
  { time: '24:00', bookings: 40, EV: 12 },
];

const revenueSectors = [
  { sector: 'INORBIT MALL', revenue: 14200, color: '#2563EB' },
  { sector: 'GVK ONE Hills', revenue: 9800, color: '#3b82f6' },
  { sector: 'T-HUB Raidurg', revenue: 6500, color: '#10b981' },
];

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminDashboardStats>({
    totalUsers: 0,
    totalSlots: 0,
    availableSlots: 0,
    occupiedSlots: 0,
    reservedSlots: 0,
    activeBookings: 0
  });

  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [alertStatus, setAlertStatus] = useState<'NOMINAL' | 'WARNING'>('NOMINAL');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await adminService.getDashboardStats();
        if (response) {
          setStats(response);
        } else {
          setStats(getMockStats());
        }
      } catch (err) {
        console.warn('API stats fetch failed. Initializing secure developer dashboard feeds.', err);
        setStats(getMockStats());
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    const initialLogs = [
      'SYS_CORE: Mindspace, Gachibowli nodes calibrated.',
      'RFID_BARRIER: Banjara Hills Sector barrier synchronized.',
      'LEDGER: UPI clearing database backup verified successfully.',
      'SURVEILLANCE: CCTV feed Nominals.'
    ];
    setLogs(initialLogs);

    const logMessages = [
      'FASTAG_CLEAR: cleared transaction: bk-9941 at Inorbit gate.',
      'DENSITY_SCAN: Raidurg Sector peak hour traffic warnings.',
      'RFID_BARRIER: Checked out vehicle TS07XY9087.',
      'CLEARED: Cleared UPI payment of ₹250 from Sai Teja.',
      'ALERT: EV Charging load nominal in Banjara Hills bay.'
    ];

    const timer = setInterval(() => {
      const newLog = `${new Date().toLocaleTimeString()} [SYS] ${
        logMessages[Math.floor(Math.random() * logMessages.length)]
      }`;
      setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const getMockStats = (): AdminDashboardStats => {
    return {
      totalUsers: 145,
      totalSlots: 500,
      availableSlots: 312,
      occupiedSlots: 154,
      reservedSlots: 34,
      activeBookings: 188
    };
  };

  const getOccupancyPct = () => {
    if (!stats.totalSlots) return 0;
    return Math.round(((stats.totalSlots - stats.availableSlots) / stats.totalSlots) * 100);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-slate-200 bg-white p-4 text-xs text-slate-500 gap-3 rounded-xl shadow-sm">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#2563EB] animate-pulse" />
          <span className="text-slate-800 font-bold uppercase tracking-wider">
            ORBITAL PARKING MANAGEMENT &bull; SYS_CORE
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>HOST_NODE: HYD_CORE_1</span>
          <Badge variant={alertStatus === 'NOMINAL' ? 'success' : 'warning'}>
            SYS_HEALTH: {alertStatus}
          </Badge>
        </div>
      </div>

      {/* KPI dashboard grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI: Total Users */}
        <Card className="relative hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Total Customers
            </span>
            <Users className="h-4 w-4 text-[#2563EB]" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-[#0F172A] tracking-wider">{stats.totalUsers}</span>
            <span className="text-xs text-slate-400 ml-1">COMMUTERS</span>
          </div>
          <p className="text-[10px] text-emerald-600 font-bold mt-2 uppercase">
            Active Accounts Verified
          </p>
        </Card>

        {/* KPI: Total Bookings */}
        <Card className="relative hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Active Bookings
            </span>
            <Calendar className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-[#0F172A] tracking-wider">{stats.activeBookings}</span>
            <span className="text-xs text-slate-400 ml-1">COMMUTED</span>
          </div>
          <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase">
            Active parking sessions
          </p>
        </Card>

        {/* KPI: Occupancy rate */}
        <Card className="relative hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              System Saturated
            </span>
            <Activity className="h-4 w-4 text-[#2563EB]" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-[#0F172A] tracking-wider">{getOccupancyPct()}%</span>
            <span className="text-xs text-slate-400 ml-1">OCCUPIED</span>
          </div>
          <p className="text-[10px] text-[#2563EB] font-bold mt-2 uppercase">
            {stats.availableSlots} Slots Available
          </p>
        </Card>

        {/* KPI: Gross Revenue */}
        <Card className="relative hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Tariff clearing gross
            </span>
            <DollarSign className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-[#0F172A] tracking-wider">₹38,420</span>
            <span className="text-xs text-slate-400 ml-1">INR</span>
          </div>
          <p className="text-[10px] text-amber-600 font-bold mt-2 uppercase">
            Ledger Clearing Active
          </p>
        </Card>

      </div>

      {/* Recharts Analytics split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trajectory Area Chart */}
        <Card className="lg:col-span-2 relative shadow-md">
          <div className="absolute top-0 right-0 font-mono text-[8px] text-slate-300 p-2 select-none">
            PLOT_DENS_OP_V9
          </div>

          <div className="mb-6">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
              Sector Operations Density
            </span>
            <h3 className="text-base font-bold uppercase tracking-wider text-slate-800">
              Hourly Docking Activity Trajectory
            </h3>
          </div>

          <div className="h-72 w-full text-[10px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyOperations} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderColor: '#e2e8f0',
                    color: '#0F172A',
                    fontFamily: 'Inter'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#2563EB" 
                  fillOpacity={1} 
                  fill="url(#colorBookings)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Sector Yield bar chart */}
        <Card className="relative shadow-md">
          <div className="absolute top-0 right-0 font-mono text-[8px] text-slate-300 p-2 select-none">
            PLOT_SECT_TARIFF
          </div>

          <div className="mb-6">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
              Sectors Yield Allocations
            </span>
            <h3 className="text-base font-bold uppercase tracking-wider text-slate-800">
              Tariff Revenue yield per Hub
            </h3>
          </div>

          <div className="h-72 w-full text-[10px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueSectors} layout="vertical" margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="sector" type="category" stroke="#94a3b8" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderColor: '#e2e8f0',
                    color: '#0F172A',
                    fontFamily: 'Inter'
                  }} 
                />
                <Bar dataKey="revenue" fill="#2563EB" barSize={12}>
                  {revenueSectors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>

      {/* Stream Log console & Emergency operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Stream console logs */}
        <Card className="lg:col-span-2 border border-slate-200 bg-slate-50 p-0 overflow-hidden flex flex-col min-h-[200px] shadow-sm">
          <div className="p-3 border-b border-slate-200 bg-white flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[#2563EB] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Smart Parking System Core logs terminal
            </span>
          </div>

          <div className="flex-1 p-4 font-mono text-[11px] text-slate-500 space-y-1.5 overflow-y-auto">
            {logs.map((log, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-slate-400 shrink-0">&gt;&gt;</span>
                <span className={idx === 0 ? 'text-[#2563EB] font-bold' : 'text-slate-600'}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Security overrides */}
        <Card className="flex flex-col justify-between shadow-sm bg-white border border-slate-200">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
              Sector overrides
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Emergency operations
            </h3>
          </div>

          <div className="p-5 space-y-3">
            <Button
              variant="danger"
              className="w-full flex justify-center items-center gap-2 py-3"
              onClick={() => {
                setAlertStatus('WARNING');
                const newLog = `${new Date().toLocaleTimeString()} [SYS_ALARM] EMERGENCY LOCKOUT OVERRIDE INITIATED!`;
                setLogs((prev) => [newLog, ...prev]);
              }}
            >
              <ShieldAlert className="h-4 w-4" /> Trigger Emergency Lockout
            </Button>

            <Button
              variant="ghost"
              className="w-full border-slate-200 text-slate-600 py-2.5 text-xs hover:bg-slate-50"
              onClick={() => {
                setAlertStatus('NOMINAL');
                const newLog = `${new Date().toLocaleTimeString()} [SYS] emergency overrides cleared nominals.`;
                setLogs((prev) => [newLog, ...prev]);
              }}
            >
              Reset Overrides to Nominal
            </Button>
          </div>
        </Card>

      </div>

    </div>
  );
};

export default AdminDashboard;
