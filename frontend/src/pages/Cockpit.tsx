import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Radio, Cpu, ArrowUpRight, ShieldCheck, Navigation } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const Cockpit: React.FC = () => {
  const [velocity, setVelocity] = useState(25); // km/h
  const [distance, setDistance] = useState(320); // meters
  const [eta, setEta] = useState('2 Min');
  const [navigationCompleted, setNavigationCompleted] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 17.4346, lng: 78.3866 });
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    'Turn right at Mindspace Junction.',
    'Keep straight towards Inorbit Mall Entry.',
    'Approaching Automated RFID Barrier.',
    'Arrived! Proceed to Slot IN-F1-01.'
  ];

  useEffect(() => {
    if (navigationCompleted) return;

    const timer = setInterval(() => {
      setDistance((prev) => {
        if (prev <= 10) {
          clearInterval(timer);
          setVelocity(0);
          setNavigationCompleted(true);
          setEta('ARRIVED');
          setActiveStep(3);
          return 0;
        }

        // Slow down as we approach
        if (prev < 100) {
          setVelocity(8);
          setEta('1 Min');
          setActiveStep(2);
        } else if (prev < 200) {
          setVelocity(18);
          setEta('1 Min');
          setActiveStep(1);
        } else {
          setVelocity((v) => Math.max(20, v + (Math.random() > 0.5 ? 1 : -1)));
          setEta('2 Min');
          setActiveStep(0);
        }

        // Shift coordinates slightly
        setCoordinates((c) => ({
          lat: c.lat + 0.00001,
          lng: c.lng - 0.000008
        }));

        return prev - 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [navigationCompleted]);

  return (
    <div className="space-y-6 overflow-hidden">
      
      {/* Top HUD Banner */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center border border-slate-200 bg-white p-4 text-xs text-slate-500 gap-3 rounded-xl shadow-sm">
        <div className="flex items-center gap-2">
          <Navigation className="h-4 w-4 text-[#2563EB] animate-pulse" />
          <span className="text-[#0F172A] font-bold uppercase tracking-wider">
            GPS Navigation Cockpit &bull; Live Telemetry
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-600 font-semibold">
          <span>Lat: {coordinates.lat.toFixed(5)}</span>
          <span>Lng: {coordinates.lng.toFixed(5)}</span>
          <Badge variant={navigationCompleted ? 'success' : 'info'}>
            {navigationCompleted ? 'DOCK_COMPLETE' : 'ACTIVE_GUIDANCE'}
          </Badge>
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Telemetry Column */}
        <div className="flex flex-col gap-4">
          <Card className="flex-1 flex flex-col justify-between p-6 relative">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
                Telemetry Diagnostics
              </span>
              <h3 className="text-lg font-bold uppercase text-[#0F172A] tracking-wider">
                Approach Velocity
              </h3>
            </div>

            {/* Circular Speed Gauge */}
            <div className="flex justify-center items-center my-6 relative">
              <svg className="w-44 h-44 transform -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="70"
                  className="stroke-slate-100 fill-transparent"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="88"
                  cy="88"
                  r="70"
                  className="stroke-[#2563EB] fill-transparent"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={2 * Math.PI * 70 * (1 - velocity / 60)}
                  transition={{ duration: 0.3 }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-[#0F172A] tracking-wider">{velocity}</span>
                <span className="text-[9px] text-[#2563EB] font-bold tracking-widest uppercase">KM/H</span>
              </div>
            </div>

            {/* Specs readouts */}
            <div className="space-y-3 font-sans text-xs border-t border-slate-100 pt-4 text-slate-500">
              <div className="flex justify-between">
                <span>ESTIMATED TRAVEL TIME:</span>
                <span className="text-slate-800 font-bold">{eta}</span>
              </div>
              <div className="flex justify-between">
                <span>TARGET BAY COORDINATE:</span>
                <span className="text-slate-800 font-bold">SLOT IN-F1-01</span>
              </div>
              <div className="flex justify-between">
                <span>RFID SIGNAL SECURITY:</span>
                <span className="text-emerald-600 font-bold">100% NOMINAL</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Radar column */}
        <div className="lg:col-span-2 flex flex-col gap-4 min-h-[350px]">
          
          <Card className="flex-1 flex flex-col relative bg-slate-50 border-slate-200 p-0 shadow-md">
            <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Live GPS Trajectory Path
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase">
                HYDERABAD_SECTOR_09
              </span>
            </div>

            {/* Visual Vector GPS path */}
            <div className="flex-1 w-full bg-[#fafbfe] relative flex items-center justify-center p-6 min-h-[280px]">
              
              {/* Dynamic steps navigation indicator box */}
              <div className="absolute top-4 left-4 max-w-sm bg-white border border-slate-200 p-4 rounded-xl shadow-sm z-10">
                <span className="text-[9px] text-slate-400 font-bold uppercase block mb-1">
                  Active Routing Instruction
                </span>
                <p className="text-xs font-bold text-[#0F172A] leading-relaxed">
                  {steps[activeStep]}
                </p>
              </div>

              {/* Vector SVG Trajectory */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 300">
                <motion.path
                  d="M 50 250 Q 180 80, 300 220 T 450 120"
                  fill="none"
                  className="stroke-[#2563EB] stroke-[3px]"
                  strokeDasharray="6, 6"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                />

                {!navigationCompleted && (
                  <motion.circle
                    cx="0"
                    cy="0"
                    r="6"
                    fill="#22C55E"
                    initial={{ offset: 0 }}
                    animate={{ 
                      cx: [50, 120, 200, 300, 380, 450], 
                      cy: [250, 170, 110, 220, 160, 120] 
                    }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  />
                )}

                {/* Destination dot marker */}
                <g transform="translate(450, 120)">
                  <circle cx="0" cy="0" r="14" fill="none" stroke="#22C55E" strokeWidth="2" />
                  <circle cx="0" cy="0" r="4" fill="#22C55E" />
                  {navigationCompleted && (
                    <circle cx="0" cy="0" r="20" fill="none" stroke="#22C55E" strokeWidth="2" className="animate-ping-slow" />
                  )}
                </g>
              </svg>

              {/* Proximity widget */}
              <div className="absolute bottom-4 right-4 bg-white border border-slate-200 p-3 rounded-xl shadow-sm flex flex-col font-sans">
                <span className="text-[9px] text-slate-400 font-bold uppercase">RANGE_TO_BAY</span>
                <span className="text-lg font-extrabold text-[#0F172A] mt-1">
                  {distance > 0 ? `${distance} METERS` : 'ARRIVED'}
                </span>
              </div>
            </div>

            {/* Status alerts strip */}
            <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold">SYSTEM LOG:</span>
                <span className="text-slate-800 font-semibold uppercase">
                  {navigationCompleted ? 'Auto-Dock completed successfully' : 'Live Trajectory lock-on verified'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold">SYS_LINK: ACTIVE</span>
            </div>

          </Card>
        </div>

      </div>

    </div>
  );
};

export default Cockpit;
