import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, MapPin, Calendar, CreditCard, Sparkles, Navigation, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-[#0F172A] flex flex-col relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 saas-grid opacity-60 pointer-events-none" />

      {/* Decorative colored blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="h-16 px-6 max-w-7xl mx-auto w-full flex items-center justify-between z-10 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-extrabold tracking-wider text-sm uppercase">
            Smart Parking<span className="text-[#2563EB]">System</span>
          </span>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')} data-cursor-text="SIGNIN">
            Sign In
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/register')} data-cursor-text="JOIN">
            Register
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row items-center justify-center gap-12 py-16 z-10">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <Badge variant="info" className="px-4 py-1 text-xs">
            🌍 GLOBAL COVERAGE & GEOLOCATION ACTIVE
          </Badge>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
            Frictionless Parking at Your Fingertips.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Instantly locate, reserve, and navigate to secure parking slots anywhere in the world. Automatically detects your physical location and shows nearby parking hubs in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/login')}
              data-cursor-text="BOOK"
              className="px-8 shadow-md"
            >
              Book Parking Slot Now <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/register')}
              data-cursor-text="REGISTER"
              className="px-8"
            >
              Sign Up as Commuter
            </Button>
          </div>
        </div>

        {/* Feature Highlights Mockup Side */}
        <div className="flex-1 w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-8 relative">
          {/* Top colored highlight */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#2563EB] to-emerald-500 rounded-t-2xl" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-blue-50 text-[#2563EB]">
              <Sparkles className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-base text-[#0F172A]">Smart City Ecosystem</h4>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 h-10 w-10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-[#2563EB]" />
              </div>
              <div>
                <h5 className="font-semibold text-sm text-[#0F172A]">Locate Nearby Hubs</h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Real-time GPS mapping displaying live occupancy, tariffs, and direct distances relative to your current location globally.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 h-10 w-10 flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <h5 className="font-semibold text-sm text-[#0F172A]">Pre-Book & Scheduled Events</h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Avoid hunting for spots. Pre-select a standard car bay, EV charging terminal, or two-wheeler spot for today or plan ahead for scheduled events.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 h-10 w-10 flex items-center justify-center shrink-0">
                <CreditCard className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h5 className="font-semibold text-sm text-[#0F172A]">UPI & Fastag Wallet</h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Recharge your Fastag wallet instantly via UPI QR codes (GPay, PhonePe, Paytm) for hassle-free automated check-in and check-out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-slate-200 bg-white/40 font-mono text-[10px] text-slate-500 text-center z-10 uppercase tracking-wider">
        Smart Parking System Hub Ecosystem &bull; Geolocation Active &bull; Global Smart City Network
      </footer>
    </div>
  );
};

// Compact internal Badge implementation to prevent circular imports
const Badge: React.FC<{ variant?: string; className?: string; children: React.ReactNode }> = ({
  variant = 'success',
  className,
  children
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none bg-blue-50 text-[#2563EB] border border-blue-200 ${className}`}
    >
      {children}
    </span>
  );
};

export default Landing;
