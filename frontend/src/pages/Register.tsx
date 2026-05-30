import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, ArrowLeft, ShieldAlert } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import authService from '../services/authService';

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Form incomplete. Fill in all registration details.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Re-verify.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.register({
        name,
        email,
        password,
        phone
      });

      setSuccess('Registration successful! Redirecting to sign in page...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        err.response?.data || 
        'Registration failed. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#0F172A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 saas-grid opacity-60 pointer-events-none" />

      {/* Beacons */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#2563EB]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md my-8"
      >
        <Card className="w-full relative shadow-lg p-8">
          
          <div className="absolute top-0 right-0 font-mono text-[8px] text-slate-300 p-2 select-none">
            REG_CORE_NODE
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <UserPlus className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] text-center uppercase">
              Commuter Signup
            </h2>
            <p className="text-xs text-slate-500 mt-1 text-center font-medium">
              Establish your smart parking credentials
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

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5 flex items-start gap-2.5"
            >
              <span className="text-xs text-emerald-700 font-medium">
                {success}
              </span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name (Callsign)"
              type="text"
              placeholder="e.g., Sai Teja"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Secure Email Node"
              type="email"
              placeholder="e.g., sai.teja@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Mobile Number (SMS Alerts)"
              type="tel"
              placeholder="e.g., 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Account Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              variant="success"
              className="w-full mt-2 py-3 shadow-sm"
              disabled={loading}
            >
              {loading ? 'Establishing Identity...' : 'Register Smart Account'}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500 flex justify-between items-center">
            <Link to="/login" className="text-slate-400 hover:text-slate-700 flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Gate
            </Link>
            <Link to="/login" className="text-[#2563EB] hover:underline font-bold">
              Sign In
            </Link>
          </div>

        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
