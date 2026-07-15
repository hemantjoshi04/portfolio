import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getMobileNavClasses = (path) => {
    const isActive = location.pathname.startsWith(path);
    if (isActive) {
      return 'flex-1 py-3 transition-transform active:scale-95 flex flex-col items-center text-secondary font-bold border-t-2 border-t-secondary';
    }
    return 'flex-1 py-3 transition-transform active:scale-95 flex flex-col items-center text-on-surface-variant border-t-2 border-transparent';
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen lg:pb-0">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <div className="lg:ml-64 flex flex-col min-h-screen pb-20 lg:pb-0">
        <AdminHeader />
        
        {/* Main Content Area */}
        <main className="flex-1 w-full relative">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Hidden on Settings page) */}
      {location.pathname !== '/admin/settings' && (
        <nav className="lg:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center bg-surface px-margin-mobile pb-safe shadow-[0px_-4px_20px_rgba(0,0,0,0.04)] h-16 border-t border-outline-variant">
          <Link to="/admin/dashboard" className={getMobileNavClasses('/admin/dashboard')}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('dashboard') ? "'FILL' 1" : "'FILL' 0" }}>home</span>
            <span className="font-label-caps text-label-caps mt-1 text-[9px]">HOME</span>
          </Link>
          <Link to="/admin/bookings" className={getMobileNavClasses('/admin/bookings')}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('bookings') ? "'FILL' 1" : "'FILL' 0" }}>event_note</span>
            <span className="font-label-caps text-label-caps mt-1 text-[9px]">BOOKINGS</span>
          </Link>
          <Link to="/admin/testimonials" className={getMobileNavClasses('/admin/testimonials')}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('testimonials') ? "'FILL' 1" : "'FILL' 0" }}>face</span>
            <span className="font-label-caps text-label-caps mt-1 text-[9px]">CLIENTS</span>
          </Link>
          <button 
            className="flex-1 py-3 flex flex-col items-center text-on-surface-variant active:bg-surface-container-high transition-transform active:scale-95"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isMobileMenuOpen ? "'FILL' 1" : "'FILL' 0" }}>menu</span>
            <span className="font-label-caps text-label-caps mt-1 text-[9px]">MENU</span>
          </button>
        </nav>
      )}

      {/* Mobile Sidebar Overlay/Drawer */}
    </div>
  );
};

export default AdminLayout;
