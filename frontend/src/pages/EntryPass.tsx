import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ticket, Calendar, Clock, Printer, ArrowLeft, Navigation, ShieldCheck } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Booking } from '../types';
import { QRCodeSVG } from 'qrcode.react';

export const EntryPass: React.FC = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [countdown, setCountdown] = useState({ min: 14, sec: 59 });

  useEffect(() => {
    // Load current booking from localStorage
    const saved = localStorage.getItem('currentBooking');
    if (saved) {
      try {
        setBooking(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Mock fallback booking
      const mockBooking: Booking = {
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
        totalAmount: 100.00,
        status: 'ACTIVE',
        bookingToken: 'TOKEN-IN-F1-01-9988'
      };
      setBooking(mockBooking);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.sec === 0) {
          if (prev.min === 0) {
            clearInterval(timer);
            return { min: 0, sec: 0 };
          }
          return { min: prev.min - 1, sec: 59 };
        }
        return { ...prev, sec: prev.sec - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!booking) return null;

  return (
    <div className="min-h-[calc(100vh-7rem)] flex flex-col items-center justify-center p-4 relative overflow-y-auto print:bg-white print:text-black">
      
      {/* Back button */}
      <div className="w-full max-w-lg mb-4 flex justify-between items-center print:hidden">
        <button
          onClick={() => navigate('/book')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Book Another Spot
        </button>
        <Badge variant="success">GATE_PASS_ACTIVE</Badge>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative print:shadow-none"
      >
        <Card className="w-full relative overflow-hidden bg-white border border-slate-200 print:border-black p-0 shadow-lg">
          
          {/* Top colored strip */}
          <div className="h-1.5 bg-[#2563EB] w-full" />

          {/* Holographic Header */}
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center text-xs font-semibold print:border-black">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
              <span className="text-slate-800 font-bold uppercase tracking-wider">
                ENTRY GATE VALIDATION PASS
              </span>
            </div>
            <span className="text-slate-400">ID: {booking.id}</span>
          </div>

          <div className="p-6 sm:p-8 flex flex-col items-center">
            
            {/* Alarm countdown pips */}
            <div className="mb-6 bg-red-50 border border-red-200 p-3.5 rounded-xl w-full flex items-center justify-between text-xs font-semibold print:hidden">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-red-700 uppercase">RESERVATION GATE RETENTION LIMIT:</span>
              </div>
              <span className="text-red-600 font-extrabold">
                {String(countdown.min).padStart(2, '0')}:{String(countdown.sec).padStart(2, '0')}
              </span>
            </div>

            {/* Ticket Header details */}
            <div className="w-full flex flex-col items-center border-b border-dashed border-slate-200 pb-6 print:border-black">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Assigned Smart Bay
              </span>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-[#2563EB] tracking-wide uppercase">
                {booking.slotNumber}
              </h3>
              
              <span className="text-xs text-slate-800 uppercase font-bold mt-3 bg-slate-50 px-4 py-1.5 border border-slate-200 rounded-lg print:border-black print:text-black print:bg-white">
                {booking.hubName}
              </span>
            </div>

            {/* Ticket detailed specification ledger */}
            <div className="w-full grid grid-cols-2 gap-4 my-6 border-b border-dashed border-slate-200 pb-6 text-xs text-slate-500 font-semibold print:border-black">
              <div className="flex flex-col">
                <span className="text-slate-400 uppercase text-[9px]">Check-In Time</span>
                <span className="text-slate-800 font-extrabold mt-0.5">
                  {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 uppercase text-[9px]">Check-Out Time</span>
                <span className="text-slate-800 font-extrabold mt-0.5">
                  {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 uppercase text-[9px]">License Plate</span>
                <span className="text-slate-800 font-extrabold mt-0.5 tracking-wider">
                  {booking.vehicleNumber || 'TS09AB1234'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 uppercase text-[9px]">Cleared Tariff</span>
                <span className="text-emerald-600 font-extrabold mt-0.5">
                  ₹{(booking.totalAmount || 0).toFixed(2)}
                </span>
              </div>
              {booking.eventName && (
                <div className="flex flex-col col-span-2 border-t border-slate-100 pt-2 mt-1">
                  <span className="text-slate-400 uppercase text-[9px]">Scheduled Plan / Event</span>
                  <span className="text-[#2563EB] font-extrabold mt-0.5 uppercase tracking-wide">
                    🎉 {booking.eventName}
                  </span>
                </div>
              )}
            </div>

            {/* QR Scanner box */}
            <div className="bg-white p-4 border border-slate-200 rounded-xl mb-6 shadow-sm print:border-black print:shadow-none">
              <QRCodeSVG
                value={booking.bookingToken || `QR-PASS-${booking.id}`}
                size={160}
                level="M"
              />
            </div>

            {/* Barcode visual lines strip */}
            <div className="w-full max-w-[280px] h-10 flex items-center justify-center gap-[2px] opacity-80 mb-2 select-none print:text-black">
              {Array.from({ length: 48 }).map((_, idx) => {
                const width = (idx * 17 + 13) % 4 === 0 ? 'w-[4px]' : (idx * 11 + 7) % 3 === 0 ? 'w-[2px]' : 'w-[1px]';
                const space = (idx * 5 + 9) % 5 === 0;
                return (
                  <div
                    key={idx}
                    className={`h-full bg-slate-900 print:bg-black ${width}`}
                    style={{ marginRight: space ? '1.5px' : '0px' }}
                  />
                );
              })}
            </div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.25em]">
              BARRIER-CLEARANCE-ID-LOG
            </span>

          </div>

        </Card>
      </motion.div>

      {/* Action buttons */}
      <div className="w-full max-w-lg mt-6 flex gap-4 print:hidden">
        <Button
          variant="secondary"
          className="flex-1 flex justify-center items-center gap-2 py-3"
          onClick={handlePrint}
        >
          <Printer className="h-4 w-4" /> Download pass / Print
        </Button>
        <Button
          variant="primary"
          className="flex-1 flex justify-center items-center gap-2 py-3 shadow-md"
          onClick={() => {
            const lat = booking.hubLat || 17.4346;
            const lng = booking.hubLng || 78.3866;
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
          }}
        >
          <Navigation className="h-4 w-4" /> Google Maps Directions
        </Button>
      </div>

    </div>
  );
};

export default EntryPass;
