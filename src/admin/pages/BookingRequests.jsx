import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/bookingService';
import BookingDetailSheet from '../components/BookingDetailSheet';

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Mobile sheet state
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  
  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await bookingService.getAll();
      if (response.success) {
        setBookings(response.data);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await bookingService.updateStatus(id, newStatus);
      if (response.success) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
        
        // Show toast
        setToastMessage(`Booking ${newStatus} successfully.`);
        setTimeout(() => setToastMessage(''), 3000);
        
        // Close sheet if open
        if (selectedBookingId === id) {
          setSelectedBookingId(null);
        }
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  // Helper to compute initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Status Chip formatting (Desktop)
  const renderStatusChip = (status) => {
    if (status === 'confirmed') {
      return <span className="status-chip bg-primary text-white">Confirmed</span>;
    } else if (status === 'cancelled') {
      return <span className="status-chip bg-error-container text-on-error-container">Cancelled</span>;
    }
    return <span className="status-chip bg-secondary-container text-on-secondary-container">Pending</span>;
  };

  // Status Badge formatting (Mobile)
  const renderStatusBadge = (status) => {
    if (status === 'confirmed') {
      return <span className="px-3 py-1 bg-surface-variant text-on-surface-variant font-label-caps text-[10px] rounded-full uppercase tracking-widest">Confirmed</span>;
    } else if (status === 'cancelled') {
      return <span className="px-3 py-1 bg-error-container text-on-error-container font-label-caps text-[10px] rounded-full uppercase tracking-widest">Cancelled</span>;
    }
    return <span className="px-3 py-1 bg-secondary-container text-on-secondary-container font-label-caps text-[10px] rounded-full uppercase tracking-widest">Pending</span>;
  };

  // Avatar colors
  const avatarColors = [
    'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    'bg-primary-fixed-dim text-on-primary-fixed',
    'bg-secondary-fixed text-on-secondary-fixed',
    'bg-surface-dim text-on-surface-variant',
    'bg-on-tertiary-fixed-variant text-tertiary-fixed'
  ];

  // Stats calculation
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

  return (
    <div className="relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-8 bg-on-background text-surface px-6 py-3 rounded-sm shadow-xl z-[100] transition-opacity duration-300 flex items-center gap-3">
          <span className="material-symbols-outlined">info</span>
          {toastMessage}
        </div>
      )}

      {/* Main Content Area (Matches Layout spacing) */}
      <div className="lg:px-gutter py-8 mb-24 lg:mb-12">
        {/* --- DESKTOP VIEW --- */}
        <div className="hidden lg:block max-w-container-max mx-auto">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h3 className="font-label-caps text-label-caps text-secondary mb-2 uppercase">Management Portal</h3>
              <p className="text-on-surface-variant max-w-xl">Review and manage incoming booking requests from your elite clientele. Confirm sessions to update your calendar or decline with personalized messages.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-2 border border-secondary text-secondary rounded-sm font-label-caps text-label-caps hover:bg-secondary-container transition-all">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export to CSV
              </button>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-surface-container-lowest luxury-shadow rounded-sm overflow-hidden border-t-2 border-secondary">
            {loading ? (
              <div className="p-8 text-center text-on-surface-variant">Loading bookings...</div>
            ) : error ? (
              <div className="p-8 text-center text-error">{error}</div>
            ) : (
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant">
                      <th className="px-6 py-5 font-label-caps text-label-caps text-on-surface-variant uppercase">Client Name</th>
                      <th className="px-6 py-5 font-label-caps text-label-caps text-on-surface-variant uppercase">Contact</th>
                      <th className="px-6 py-5 font-label-caps text-label-caps text-on-surface-variant uppercase">Service</th>
                      <th className="px-6 py-5 font-label-caps text-label-caps text-on-surface-variant uppercase">Preferred Date</th>
                      <th className="px-6 py-5 font-label-caps text-label-caps text-on-surface-variant uppercase text-center">Status</th>
                      <th className="px-6 py-5 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {bookings.map((booking, idx) => {
                      const dateObj = new Date(booking.date);
                      const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
                      const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                      const colorClass = avatarColors[idx % avatarColors.length];
                      const isCancelled = booking.status === 'cancelled';
                      
                      return (
                        <tr key={booking.id} className={`hover:bg-surface-container transition-colors duration-150 group ${isCancelled ? 'opacity-60' : ''}`}>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${colorClass}`}>
                                {getInitials(booking.clientName)}
                              </div>
                              <div>
                                <p className="font-medium">{booking.clientName}</p>
                                <p className="text-xs text-on-surface-variant">{booking.clientEmail}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm">{booking.clientPhone || 'N/A'}</td>
                          <td className="px-6 py-5">
                            <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-sm text-xs font-semibold">{booking.type}</span>
                          </td>
                          <td className="px-6 py-5 text-sm">
                            <p>{dateStr}</p>
                            <p className="text-xs text-on-surface-variant">{timeStr}</p>
                          </td>
                          <td className="px-6 py-5 text-center">
                            {renderStatusChip(booking.status)}
                          </td>
                          <td className="px-6 py-5 text-right">
                            {booking.status === 'pending' ? (
                              <div className="flex justify-end gap-2">
                                <button 
                                  className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-bright text-secondary border border-secondary hover:bg-secondary hover:text-white transition-all" 
                                  onClick={() => handleStatusChange(booking.id, 'confirmed')} 
                                  title="Confirm"
                                >
                                  <span className="material-symbols-outlined text-[20px]">check</span>
                                </button>
                                <button 
                                  className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-bright text-error border border-error hover:bg-error hover:text-white transition-all" 
                                  onClick={() => handleStatusChange(booking.id, 'cancelled')} 
                                  title="Decline"
                                >
                                  <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                              </div>
                            ) : booking.status === 'confirmed' ? (
                              <button className="material-symbols-outlined text-outline hover:text-primary transition-colors">more_vert</button>
                            ) : (
                              <button className="material-symbols-outlined text-outline hover:text-primary transition-colors">history</button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Pagination Footer */}
            <div className="px-6 py-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-low">
              <p className="text-xs text-on-surface-variant font-label-caps uppercase">Showing 1-{bookings.length} of {bookings.length} requests</p>
              <div className="flex gap-2">
                <button className="px-4 py-1 text-sm border border-outline-variant rounded hover:bg-surface transition-colors">Prev</button>
                <button className="px-4 py-1 text-sm bg-secondary text-white rounded hover:bg-on-secondary-container transition-colors">1</button>
                <button className="px-4 py-1 text-sm border border-outline-variant rounded hover:bg-surface transition-colors">Next</button>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-12">
            <div className="bg-surface-container-lowest p-6 luxury-shadow border-l-4 border-secondary">
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Total Pending</p>
              <h4 className="text-display-lg-mobile md:text-headline-md font-headline-md">{pendingCount}</h4>
              <div className="mt-4 flex items-center gap-2 text-xs text-secondary">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>+3 from yesterday</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 luxury-shadow border-l-4 border-primary">
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Confirmed Month</p>
              <h4 className="text-display-lg-mobile md:text-headline-md font-headline-md">{confirmedCount}</h4>
              <div className="mt-4 flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>Next booking: In 2 hours</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 luxury-shadow border-l-4 border-error">
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Cancelled (30d)</p>
              <h4 className="text-display-lg-mobile md:text-headline-md font-headline-md">{cancelledCount}</h4>
              <div className="mt-4 flex items-center gap-2 text-xs text-error">
                <span className="material-symbols-outlined text-sm">info</span>
                <span>2.1% Cancellation rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="lg:hidden px-margin-mobile">
          {/* Header Section */}
          <section className="mb-8">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-2">Booking Requests</h2>
            <p className="font-body-md text-on-surface-variant text-sm">Review and manage your upcoming client appointments.</p>
          </section>

          {/* Booking List */}
          <div className="flex flex-col gap-6">
            {loading ? (
              <div className="text-center text-on-surface-variant py-8">Loading bookings...</div>
            ) : error ? (
              <div className="text-center text-error py-8">{error}</div>
            ) : bookings.length === 0 ? (
              <div className="text-center text-on-surface-variant py-8">No booking requests found.</div>
            ) : (
              bookings.map((booking, idx) => {
                const dateObj = new Date(booking.date);
                const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
                const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                const colorClass = avatarColors[idx % avatarColors.length];
                const isCancelled = booking.status === 'cancelled';
                
                return (
                  <div 
                    key={booking.id}
                    className={`group relative bg-surface-container-lowest p-6 rounded-xl booking-card-shadow transition-all active:scale-[0.98] cursor-pointer 
                      ${isCancelled ? 'border-t-2 border-outline-variant opacity-80 grayscale-[0.5]' : 'border-t-2 border-secondary'}`}
                    onClick={() => setSelectedBookingId(booking.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4 items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-outline-variant overflow-hidden ${!booking.clientAvatar ? colorClass : 'bg-primary-container'}`}>
                          {booking.clientAvatar ? (
                            <img className="w-full h-full object-cover" src={booking.clientAvatar} alt={booking.clientName} />
                          ) : (
                            <span className="font-bold text-lg">{getInitials(booking.clientName)}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-body-md font-semibold text-primary">{booking.clientName}</h3>
                          <p className="font-label-caps text-label-caps text-on-surface-variant">{booking.type}</p>
                        </div>
                      </div>
                      {renderStatusBadge(booking.status)}
                    </div>
                    <div className="flex items-center gap-6 text-on-surface-variant">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                        <span className="text-sm font-body-md">{dateStr}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span className="text-sm font-body-md">{timeStr}</span>
                      </div>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Mobile Detail Sheet */}
      <BookingDetailSheet 
        isOpen={!!selectedBookingId}
        booking={bookings.find(b => b.id === selectedBookingId)}
        onClose={() => setSelectedBookingId(null)}
        onConfirm={(id) => handleStatusChange(id, 'confirmed')}
        onDecline={(id) => handleStatusChange(id, 'cancelled')}
      />

      {/* Shared Styles */}
      <style>{`
        .luxury-shadow {
            box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.04);
        }
        .booking-card-shadow {
            box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.04);
        }
        .status-chip {
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default BookingRequests;
