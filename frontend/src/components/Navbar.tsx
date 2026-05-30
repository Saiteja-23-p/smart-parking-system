import React from 'react';
import { Bell, MapPin, Menu, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export interface NavbarProps {
  onMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-6 shadow-sm shrink-0"
    >
      {/* Left section: Mobile Menu trigger */}
      <div className="flex items-center md:hidden gap-3">
        <button
          onClick={onMenuToggle}
          className="text-slate-600 hover:text-slate-900 border border-slate-200 p-1.5 rounded-lg bg-slate-50"
        >
          <Menu className="h-4 w-4" />
        </button>
        <span className="font-extrabold tracking-wider text-xs uppercase">
          Smart Parking<span className="text-[#2563EB]">System</span>
        </span>
      </div>

      {/* Middle section: High-tech System Log / Status readout */}
      <div className="hidden md:flex items-center gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-2 border border-slate-100 bg-slate-50 px-3 py-1.5 rounded-lg">
          <MapPin className="h-4 w-4 text-[#2563EB]" />
          <span className="font-semibold text-slate-700">Hyderabad, Telangana</span>
        </div>
        <div className="flex items-center gap-2 border border-slate-100 bg-slate-50 px-3 py-1.5 rounded-lg">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-slate-600">Fastag Node: Connected</span>
        </div>
      </div>

      {/* Right section: System alerts & profile */}
      <div className="flex items-center space-x-3">
        <button className="relative p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-all duration-200 border border-transparent">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 block h-1.5 w-1.5 rounded-full bg-[#2563EB]"></span>
        </button>

        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

        <div className="hidden sm:flex items-center gap-3 border border-slate-100 px-3.5 py-1.5 bg-slate-50 rounded-lg text-xs font-semibold">
          <User className="h-3.5 w-3.5 text-slate-500" />
          <span className="text-slate-700">{user?.name}</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
