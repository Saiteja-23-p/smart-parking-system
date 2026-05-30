import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export const Layout: React.FC = () => {
  const { user } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden selection:bg-[#2563EB]/10 selection:text-[#2563EB] relative">
      {/* SaaS Grid Background */}
      <div className="absolute inset-0 saas-grid opacity-50 pointer-events-none" />

      {/* Static Sidebar for Desktop */}
      <Sidebar />

      {/* Mobile Drawer Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#0F172A]">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Navbar onMenuToggle={() => setMobileSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
