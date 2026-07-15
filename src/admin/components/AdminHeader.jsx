import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { settingsService } from '../../services/settingsService';

const AdminHeader = () => {
  const location = useLocation();
  const [settings, setSettings] = useState(settingsService.getSettingsSync());

  useEffect(() => {
    const unsubscribe = settingsService.subscribe((newSettings) => {
      setSettings(newSettings);
    });
    settingsService.getSettings().then(res => {
      if (res.success) setSettings(res.data);
    });
    return unsubscribe;
  }, []);
  
  // Quick map to show dynamic title on desktop based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Overview';
    if (path.includes('bookings')) return 'Booking Requests';
    if (path.includes('portfolio')) return 'Portfolio Manager';
    if (path.includes('blog')) return 'Blog Manager';
    if (path.includes('testimonials')) return 'Testimonial Manager';
    if (path.includes('settings')) return 'Site Settings';
    return 'Admin Portal';
  };

  return (
    <header className="sticky top-0 z-40 flex justify-between items-center px-gutter py-4 w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant">
      
      {/* Desktop Title */}
      <div className="hidden lg:block">
        <h2 className="font-headline-sm text-headline-sm text-primary tracking-tight">
          {getPageTitle()}
        </h2>
      </div>

      {/* Mobile Title */}
      <div className="lg:hidden">
        <h1 className="font-headline-md text-headline-md text-primary tracking-tight">
          {settings.brandName || 'Artistry By Abhilasha'}
        </h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Desktop View Site Link */}
        <a 
          href="/" 
          target="_blank" 
          rel="noreferrer"
          className="hidden lg:flex items-center gap-2 text-secondary font-label-caps text-label-caps hover:opacity-70 transition-opacity"
        >
          <span className="material-symbols-outlined text-lg">open_in_new</span>
          VIEW SITE
        </a>

        {/* Icons & Profile */}
        <div className="flex items-center gap-4 lg:border-l lg:border-outline-variant lg:pl-6">
          <button className="text-primary lg:text-on-surface-variant hover:text-secondary transition-colors active:opacity-70">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>notifications</span>
          </button>
          <button className="text-primary lg:text-on-surface-variant hover:text-secondary transition-colors active:opacity-70">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>settings</span>
          </button>
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border border-outline-variant cursor-pointer hover:opacity-90 transition-opacity">
            <img 
              className="w-full h-full object-cover" 
              alt="Admin Profile" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHb-zvkotYvYxLDQfqiPzLY56DU2HOStJgnSJqeF1P4jfPLn-Vxo6twGZSMw5VNlimz80ypXOAOVENWuhxoKUy23ZXiBkEymkyIGOmcyl94LZoNscIMPIN_DZtCHwA0B97Xs-9JKz4z_R2SLv-3qIjOxYo5tpZN4hf9KracGvJKAXSD_BEKfI5hjc1fDp5F5nIybxgRzE9d_XKygTOyte6Q_gMGr0aIbwauYCwpFYU8MyjfTXuIAnV6v-TmA5AXWvGe0AFnfW2R1JZ"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
