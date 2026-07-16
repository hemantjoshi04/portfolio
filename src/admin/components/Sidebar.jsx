import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { settingsService } from '../../services/settingsService';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const [settings, setSettings] = useState(settingsService.getSettingsSync());

  useEffect(() => {
    // Subscribe to settings changes
    const unsubscribe = settingsService.subscribe((newSettings) => {
      setSettings(newSettings);
    });
    // Fetch initial to be sure
    settingsService.getSettings().then(res => {
      if (res.success) setSettings(res.data);
    });
    return unsubscribe;
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { name: 'Portfolio', path: '/admin/portfolio', icon: 'auto_awesome' },
    { name: 'Blog', path: '/admin/blog', icon: 'edit_note' },
    { name: 'Clients', path: '/admin/testimonials', icon: 'group' },
    { name: 'Bookings', path: '/admin/bookings', icon: 'calendar_month' },
    { name: 'Site Settings', path: '/admin/settings', icon: 'settings' }
  ];

  const bottomNavItems = [];

  const getLinkClasses = (path) => {
    const isActive = location.pathname.startsWith(path);
    if (isActive) {
      return 'flex items-center gap-3 px-6 py-4 cursor-pointer transition-all text-secondary bg-primary-container font-bold relative before:content-[""] before:absolute before:right-0 before:top-1/4 before:h-1/2 before:w-[2px] before:bg-secondary';
    }
    return 'flex items-center gap-3 px-6 py-4 cursor-pointer transition-all text-on-surface-variant hover:text-primary hover:bg-surface-bright';
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-surface-container-low border-r border-outline-variant flex flex-col py-8 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}
      >
        <div className="px-6 mb-10 flex justify-between items-start">
          <div>
            <p className="font-headline-sm text-[16px] text-secondary">{settings.brandName?.split(' ')[0] || 'Abhilasha'}</p>
            <p className="font-label-caps text-[10px] text-on-surface-variant">{settings.professionalTitle}</p>
          </div>
          {/* Mobile Close Button */}
          <button onClick={onClose} className="lg:hidden text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link to={item.path} onClick={onClose} className={getLinkClasses(item.path)}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                    {item.icon}
                  </span>
                  <span className="font-label-caps text-label-caps">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-6 mb-8 mt-4">
          <button className="w-full bg-[#1c1b1b] text-white py-3 px-4 rounded font-label-caps text-[10px] hover:bg-secondary transition-colors duration-300 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            NEW APPOINTMENT
          </button>
        </div>

        <div className="border-t border-outline-variant pt-6">
          <ul className="space-y-1">
            {bottomNavItems.map((item) => (
              <li key={item.name}>
                <Link to={item.path} onClick={onClose} className="flex items-center gap-3 px-6 py-3 cursor-pointer transition-all text-on-surface-variant hover:text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                    {item.icon}
                  </span>
                  <span className="font-label-caps text-label-caps">{item.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <button onClick={logout} className="w-full flex items-center gap-3 px-6 py-3 cursor-pointer transition-all text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>logout</span>
                <span className="font-label-caps text-label-caps">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
