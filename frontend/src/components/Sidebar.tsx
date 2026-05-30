import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, CalendarRange, Wallet, Navigation, History, UserCircle, ShieldAlert, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN';

  const clientItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Live Map', icon: Map, path: '/map' },
    { name: 'Slot Booking', icon: CalendarRange, path: '/book' },
    { name: 'Fastag Wallet', icon: Wallet, path: '/wallet' },
    { name: 'Booking History', icon: History, path: '/history' },
    { name: 'User Profile', icon: UserCircle, path: '/profile' },
  ];

  const adminItems = [
    { name: 'Admin Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Live Map', icon: Map, path: '/map' },
    { name: 'Slot Configurator', icon: CalendarRange, path: '/book' },
    { name: 'Booking Ledger', icon: History, path: '/history' },
    { name: 'Admin Profile', icon: UserCircle, path: '/profile' },
  ];

  const itemsToRender = isAdmin ? adminItems : clientItems;

  return (
    <motion.aside
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-64 bg-[#0F172A] border-r border-slate-800 h-screen hidden md:flex flex-col text-white z-20 shrink-0"
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800 bg-black/10">
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <h1 className="text-sm font-extrabold tracking-wider text-white uppercase">
          Smart Parking<span className="text-[#2563EB] font-medium ml-1">System</span>
        </h1>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-4 px-3">
            Main Console
          </span>
          <nav className="space-y-1">
            {itemsToRender.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  data-cursor-text="GO"
                  className={`group flex items-center px-4 py-2.5 text-xs font-semibold rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'bg-[#2563EB] text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`mr-3 h-4 w-4 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Profile & Logout Section */}
      <div className="p-4 border-t border-slate-800 bg-black/10">
        <div className="flex items-center mb-4 px-2 py-1.5 rounded-lg border border-slate-800 bg-black/20">
          <div className="w-8 h-8 rounded-full border border-[#2563EB]/40 flex items-center justify-center text-white font-bold text-xs bg-[#2563EB]">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="ml-3 overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider truncate">
              {isAdmin ? 'ADMINISTRATOR' : 'COMMUTER'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          data-cursor-text="EXIT"
          className="flex items-center w-full px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-white border border-transparent hover:border-red-950/20 hover:bg-red-950/15 rounded-lg transition-all duration-200"
        >
          <LogOut className="mr-3 h-4 w-4 text-red-400" />
          Sign Out
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
