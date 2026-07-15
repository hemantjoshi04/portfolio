import React, { useEffect, useState } from 'react';

const BookingDetailSheet = ({ isOpen, booking, onClose, onConfirm, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Small delay to allow DOM to render before adding visible classes for transition
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Wait for transition to finish before unmounting
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered || !booking) return null;

  // Format Date and Time
  const dateObj = new Date(booking.date);
  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div 
      className={`fixed inset-0 z-[60] bg-on-background/40 backdrop-blur-sm transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className={`absolute bottom-0 left-0 w-full bg-surface rounded-t-[2rem] p-8 pb-12 transition-transform duration-300 luxury-gradient ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div 
          className="w-12 h-1 bg-outline-variant rounded-full mx-auto mb-8 cursor-pointer" 
          onClick={onClose}
        ></div>
        
        <div className="mb-6">
          <h4 className="font-label-caps text-label-caps text-secondary mb-2 uppercase">Booking Request</h4>
          <h3 className="font-headline-md text-headline-md text-primary mb-1">{booking.clientName}</h3>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">{booking.type}</p>
          
          <div className="grid grid-cols-2 gap-6 p-6 bg-surface-container-low rounded-xl border border-outline-variant/30 mb-8">
            <div>
              <p className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase">Date</p>
              <p className="font-body-md font-semibold">{dateStr}</p>
            </div>
            <div>
              <p className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase">Time</p>
              <p className="font-body-md font-semibold">{timeStr}</p>
            </div>
            <div className="col-span-2">
              <p className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase">Notes</p>
              <p className="font-body-md text-sm italic">"{booking.notes || 'No additional notes provided.'}"</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button 
            className="flex-1 py-4 border border-secondary text-secondary font-label-caps text-label-caps uppercase tracking-widest rounded-lg hover:bg-secondary-fixed transition-colors active:scale-95" 
            onClick={() => onDecline(booking.id)}
            disabled={booking.status === 'cancelled'}
          >
            Decline
          </button>
          <button 
            className="flex-1 py-4 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest rounded-lg hover:bg-secondary transition-colors active:scale-95 shadow-lg" 
            onClick={() => onConfirm(booking.id)}
            disabled={booking.status === 'confirmed'}
          >
            Confirm
          </button>
        </div>
        
        <style>{`
          .luxury-gradient {
              background: linear-gradient(135deg, #fcf9f8 0%, #f5f2ed 100%);
          }
        `}</style>
      </div>
    </div>
  );
};

export default BookingDetailSheet;
