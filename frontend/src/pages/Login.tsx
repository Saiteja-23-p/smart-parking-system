import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide email and password.');
      return;
    }

    setLoading(true);
    setError('');

    const res = await login({ email, password });
    setLoading(false);

    if (res.success) {
      // Check role to route correctly
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.role === 'ROLE_ADMIN' || parsed.role === 'ADMIN') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        } catch (err) {
          navigate('/dashboard');
        }
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(res.message || 'Incorrect email or password. Verify your credentials.');
    }
  };

  const handleDeveloperBypass = () => {
    const developerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.devmocktoken';
    const devUser = {
      id: 2,
      name: 'Sai Teja',
      email: 'sai.teja@gmail.com',
      role: 'ROLE_USER',
      token: developerToken,
      phone: '9876543210',
      vehicleNumber: 'TS09AB1234'
    };
    
    localStorage.setItem('token', developerToken);
    localStorage.setItem('user', JSON.stringify(devUser));
    
    navigate('/dashboard');
  };

  const handleAdminBypass = () => {
    const developerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.adminmocktoken';
    const devUser = {
      id: 1,
      name: 'Sector Administrator',
      email: 'admin@smartparking.com',
      role: 'ROLE_ADMIN',
      token: developerToken,
      phone: '1234567890'
    };
    
    localStorage.setItem('token', developerToken);
    localStorage.setItem('user', JSON.stringify(devUser));
    
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#0F172A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 saas-grid opacity-60 pointer-events-none" />

      {/* Beacons */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#2563EB]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="w-full relative shadow-lg p-8">
          
          <div className="flex flex-col items-center mb-8">
            <div className="h-12 w-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-3">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] text-center uppercase">
              Secure Sign In
            </h2>
            <p className="text-xs text-slate-500 mt-1 text-center font-medium">
              Enter your credential logs to manage parking
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 flex items-start gap-2.5"
            >
              <ShieldAlert className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <span className="text-xs text-red-700 font-medium">
                {error}
              </span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Registered Email"
              type="email"
              placeholder="e.g., sai.teja@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                label="Account Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-9.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

             <Button
               type="submit"
               variant="primary"
               className="w-full mt-2 py-3 shadow-sm"
               disabled={loading}
               data-cursor-text="LOGIN"
             >
               {loading ? 'Verifying Credentials...' : 'Access Dashboard'}
             </Button>
           </form>
 
           {/* Quick links */}
           <div className="mt-6 text-center text-xs text-slate-500">
             <span>New Commuter? </span>
             <Link to="/register" className="text-[#2563EB] hover:underline font-bold" data-cursor-text="JOIN">
               Establish Account
             </Link>
           </div>
 
           {/* Developer Bypass Sandbox controls */}
           <div className="mt-8 border-t border-slate-100 pt-6">
             <span className="text-[10px] text-slate-400 block mb-3 text-center uppercase tracking-widest font-semibold">
               Bypass Sandbox Terminal [Dev Mode]
             </span>
             <div className="flex gap-2">
               <button
                 type="button"
                 onClick={handleDeveloperBypass}
                 data-cursor-text="PILOT"
                 className="flex-1 bg-slate-50 text-slate-700 border border-slate-200 hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#2563EB]/5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200"
               >
                 Pilot Bypass
               </button>
               <button
                 type="button"
                 onClick={handleAdminBypass}
                 data-cursor-text="ADMIN"
                 className="flex-1 bg-slate-50 text-slate-700 border border-slate-200 hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#2563EB]/5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200"
               >
                 Admin Bypass
               </button>
             </div>
           </div>

        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
