import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Shield, Save, UserCircle, Car } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  
  const [name, setName] = useState(user?.name || 'Sai Teja');
  const [email, setEmail] = useState(user?.email || 'sai.teja@gmail.com');
  const [phone, setPhone] = useState(user?.phone || '9876543210');
  const [vehicleNumber, setVehicleNumber] = useState(user?.vehicleNumber || 'TS09AB1234');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage as well to persist dev-mode changes
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const updated = { ...parsed, name, email, phone, vehicleNumber };
        localStorage.setItem('user', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <span className="text-xs text-slate-500 font-semibold block mb-1.5">
          User Account Settings
        </span>
        <h1 className="text-2xl font-display font-bold text-slate-800 uppercase tracking-wider">
          User Profile Configurator
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: Summary */}
        <div className="flex flex-col gap-4">
          <Card className="w-full relative shadow-sm text-center flex flex-col items-center py-8">
            <div className="absolute top-0 right-0 font-mono text-[8px] text-slate-300 p-2 select-none">
              PROFILE_NODE
            </div>

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full border-2 border-[#2563EB] flex items-center justify-center text-white font-bold text-3xl bg-[#2563EB] mb-4 shadow-md">
              {name.charAt(0).toUpperCase()}
            </div>

            <h3 className="text-lg font-bold text-slate-800 tracking-wider uppercase mt-2">
              {name}
            </h3>
            
            <span className="text-xs text-slate-400 mt-1">
              {email}
            </span>

            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <Badge variant="success">FASTAG_ENABLED</Badge>
              <Badge variant="info">VERIFIED</Badge>
            </div>

            {/* Specs readouts */}
            <div className="mt-8 w-full border-t border-slate-100 pt-6 text-left text-xs text-slate-500 space-y-3 font-semibold">
              <div className="flex justify-between">
                <span>IDENTITY ROLE:</span>
                <span className="text-slate-800 uppercase font-bold">
                  {user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN' ? 'SECTOR_ADMIN' : 'COMMUTER'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>FASTAG SECURE ID:</span>
                <span className="text-slate-800 uppercase">SP-{(user?.id || 2).toString()}</span>
              </div>
              <div className="flex justify-between">
                <span>BARRIER GATE LINK:</span>
                <span className="text-emerald-600 font-bold">100% ONLINE</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Card: Fields */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="w-full relative shadow-sm">
            <div className="absolute top-0 right-0 font-mono text-[8px] text-slate-300 p-2 select-none">
              CONFIG_GATE
            </div>

            <div className="mb-6">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
                Edit Commuter Profile Details
              </span>
              <h3 className="text-base font-bold uppercase tracking-wider text-slate-800">
                Profile Configuration
              </h3>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name Callsign"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <Input
                  label="Commuter Email Node"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Commuter Mobile Number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <div className="relative">
                  <Input
                    label="Default Vehicle license number"
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                    required
                  />
                  <div className="absolute right-3 top-8.5 text-slate-400">
                    <Car className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {isSaved && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5 flex items-start gap-2.5 text-xs text-emerald-700 font-semibold uppercase tracking-wide"
                >
                  Commuter profile configuration updated securely!
                </motion.div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto flex items-center justify-center gap-2 mt-6 py-2.5 px-6 shadow-sm"
              >
                <Save className="h-4 w-4" /> Save Telemetry Link
              </Button>
            </form>
          </Card>
        </div>

      </div>
      
    </div>
  );
};

export default Profile;
