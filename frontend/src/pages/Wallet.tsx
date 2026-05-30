import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownLeft, Cpu, RefreshCw, QrCode } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Wallet as WalletType, Transaction } from '../types';
import { walletService } from '../services/walletService';
import { QRCodeSVG } from 'qrcode.react';

export const Wallet: React.FC = () => {
  const [wallet, setWallet] = useState<WalletType>({ balance: 0.0 });
  const [topUpAmount, setTopUpAmount] = useState('200');
  const [rechargeProgress, setRechargeProgress] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadWalletDetails = async () => {
      setLoading(true);
      try {
        const data = await walletService.getWallet();
        if (data) {
          setWallet(data);
        }
      } catch (err) {
        console.warn('API wallet fetch failed. Seeding local balance.', err);
        setWallet({ balance: 350.0 });
      } finally {
        setLoading(false);
      }
    };

    loadWalletDetails();

    // Mock recent transactions customized to India Rupees
    const mockTx: Transaction[] = [
      {
        id: 'tx-4899',
        amount: -50.00,
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        type: 'BOOKING_PAYMENT',
        description: 'Inorbit Mall Slot IN-F1-01 check-in fee'
      },
      {
        id: 'tx-4872',
        amount: 300.00,
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        type: 'DEPOSIT',
        description: 'Instant UPI wallet top-up clearance'
      },
      {
        id: 'tx-4811',
        amount: -40.00,
        timestamp: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
        type: 'BOOKING_PAYMENT',
        description: 'T-Hub Gachibowli Slot TH-01 session tariff'
      }
    ];
    setTransactions(mockTx);
  }, []);

  const handleDepositClick = () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) return;
    setShowQrModal(true);
  };

  const handleSimulatePayment = async () => {
    setRechargeProgress(true);
    setShowQrModal(false);

    const amount = parseFloat(topUpAmount) || 0;

    try {
      // Connect to Spring Boot Top-Up API
      const updatedWallet = await walletService.topUpWallet(amount, 'UPI');
      setWallet(updatedWallet);

      const newTx: Transaction = {
        id: `tx-${Math.floor(4000 + Math.random() * 999)}`,
        amount: amount,
        timestamp: new Date().toISOString(),
        type: 'DEPOSIT',
        description: `Instant UPI Wallet Recharge of ₹${amount.toFixed(2)}`
      };

      setTransactions((prev) => [newTx, ...prev]);
    } catch (e) {
      console.warn('API topup fail. Processing fallback sandbox top-up.', e);
      setWallet((prev) => ({
        ...prev,
        balance: prev.balance + amount
      }));

      const newTx: Transaction = {
        id: `tx-${Math.floor(4000 + Math.random() * 999)}`,
        amount: amount,
        timestamp: new Date().toISOString(),
        type: 'DEPOSIT',
        description: `Offline UPI Top-Up Recharge of ₹${amount.toFixed(2)}`
      };

      setTransactions((prev) => [newTx, ...prev]);
    } finally {
      setRechargeProgress(false);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col lg:flex-row gap-6 relative overflow-hidden bg-slate-50">
      
      {/* Left Exchanger Panel */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        
        {/* Balance Card */}
        <Card className="w-full relative shadow-md">
          <div className="absolute top-0 right-0 font-mono text-[8px] text-slate-300 p-2">
            WALLET_SECURE_VAL
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs text-slate-400 font-bold block mb-1.5">
                Digital Payment Ledger
              </span>
              <h2 className="text-base font-bold text-[#0F172A] uppercase tracking-wider">
                Smart Wallet & Fastag Link
              </h2>
            </div>
            <Badge variant="success">UPI_INTEGRATED</Badge>
          </div>

          <div className="mt-8 border border-slate-100 bg-slate-50/50 p-6 rounded-xl flex flex-col relative max-w-sm">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Fastag balance</span>
            <span className="text-4xl font-extrabold text-[#0F172A] tracking-wider mt-3">
              ₹{wallet.balance.toFixed(2)}
            </span>
            <span className="text-[10px] text-slate-400 mt-2 uppercase font-medium">Clearance node: Active</span>
          </div>
        </Card>

        {/* UPI Exchanger panel */}
        <Card className="w-full relative shadow-md">
          <div className="absolute top-0 right-0 font-mono text-[8px] text-slate-300 p-2">
            EXCHANGE_GATE
          </div>

          <div className="mb-4">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
              Live Wallet Recharge Gateway
            </span>
            <h3 className="text-lg font-bold uppercase tracking-widest text-[#0F172A]">
              Recharge Wallet
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-end mt-6">
            <div className="flex-1 w-full">
              <Input
                label="Enter Recharge Value (₹)"
                type="number"
                min="10"
                placeholder="200"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
              />
            </div>
            
            <div className="h-10 flex items-center justify-center p-2 text-slate-400">
              <RefreshCw className="h-4 w-4 animate-spin-slow" />
            </div>

            <div className="flex-1 w-full">
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Clearing Currency
              </label>
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-3.5 py-2.5 text-sm font-extrabold rounded-lg h-[46px] flex items-center justify-between">
                <span>INR (Indian Rupee)</span>
                <span className="text-[9px] text-slate-400 font-bold">₹1 = ₹1</span>
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full mt-6 py-3 shadow-md"
            onClick={handleDepositClick}
            disabled={rechargeProgress}
          >
            {rechargeProgress ? 'Processing deposit...' : 'Recharge Wallet via UPI QR'}
          </Button>
        </Card>

      </div>

      {/* Right ledger list */}
      <div className="w-full lg:w-96 flex flex-col gap-4 overflow-hidden relative shrink-0">
        <Card className="flex-1 flex flex-col h-full overflow-hidden p-0 border border-slate-200 shadow-md">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Debit & Credit Logs
            </span>
            <span className="text-[8px] px-1.5 py-0.5 border border-slate-200 text-slate-400 rounded-lg uppercase">
              UPI_LOGS
            </span>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="border border-slate-100 bg-white p-3.5 rounded-xl text-xs flex justify-between gap-3 hover:border-slate-200 shadow-sm"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {tx.amount > 0 ? (
                      <ArrowDownLeft className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-[#2563EB] shrink-0" />
                    )}
                    <span className="font-extrabold text-slate-800 uppercase tracking-wider truncate">
                      {tx.type}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
                    {tx.description}
                  </p>
                  <span className="text-[9px] text-slate-400 font-medium">
                    {new Date(tx.timestamp).toLocaleString()}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span className={`font-extrabold text-sm ${
                    tx.amount > 0 ? 'text-emerald-600' : 'text-slate-800'
                  }`}>
                    {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toFixed(2)}
                  </span>
                  <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase">
                    ID: {tx.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* QR code recharge Modal */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowQrModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-sm z-10"
            >
              <Card className="w-full relative p-8 text-center flex flex-col items-center">
                <QrCode className="h-8 w-8 text-[#2563EB] mb-3 animate-pulse" />
                <h4 className="text-base font-bold uppercase tracking-wider text-[#0F172A]">
                  Scan to Pay UPI
                </h4>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1 mb-6">
                  Scan via GPay, PhonePe, Paytm, or BHIM
                </p>

                {/* QR renderer */}
                <div className="bg-white p-4 border border-slate-200 rounded-xl inline-block mb-6 shadow-md">
                  <QRCodeSVG
                    value={`upi://pay?pa=smartparking@paytm&pn=SmartParkingSystem&am=${topUpAmount}&cu=INR`}
                    size={160}
                    level="H"
                  />
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 w-full text-xs text-left text-slate-500 space-y-2 mb-6 font-semibold">
                  <div className="flex justify-between">
                    <span>RECHARGE AMOUNT:</span>
                    <span className="text-slate-800 font-extrabold">₹{parseFloat(topUpAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CLEARANCE CHARGE:</span>
                    <span className="text-emerald-600 font-bold">₹0.00</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={handleSimulatePayment}
                  >
                    Confirm Payment
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 border-slate-200"
                    onClick={() => setShowQrModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Wallet;
