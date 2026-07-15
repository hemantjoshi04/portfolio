import React from 'react';

const TestimonialCard = ({ testimonial, onEdit, onDelete, onToggleFeatured }) => {
  const { id, clientName, clientPhoto, service, text, rating, isFeatured, createdAt } = testimonial;

  // Generate initials
  const getInitials = (name) => {
    if (!name) return 'C';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name[0].toUpperCase();
  };

  // Format date
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="group bg-surface-container-lowest border-t-2 border-secondary p-8 shadow-[0px_20px_40px_rgba(0,0,0,0.04)] flex flex-col transition-all hover:shadow-[0px_30px_60px_rgba(0,0,0,0.08)] h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-1 text-secondary">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`material-symbols-outlined ${i < rating ? 'filled-icon' : ''}`}
              style={{ fontVariationSettings: i < rating ? "'FILL' 1" : "'FILL' 0" }}
            >
              star
            </span>
          ))}
        </div>
        <div className="flex gap-2 opacity-0 lg:group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(testimonial)} className="p-1 hover:text-secondary" title="Edit Review">
            <span className="material-symbols-outlined" data-icon="edit">edit</span>
          </button>
          <button onClick={() => onDelete(id)} className="p-1 hover:text-error" title="Delete Review">
            <span className="material-symbols-outlined" data-icon="delete">delete</span>
          </button>
        </div>
      </div>
      
      <blockquote className="italic text-on-surface font-body-lg mb-8 leading-relaxed flex-grow">
        "{text}"
      </blockquote>
      
      <div className="mt-auto flex items-center gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 bg-secondary-container flex items-center justify-center text-secondary font-bold text-lg">
          {clientPhoto ? (
            <img className="w-full h-full object-cover" src={clientPhoto} alt={clientName} />
          ) : (
            getInitials(clientName)
          )}
        </div>
        <div>
          <p className="font-bold text-on-surface">{clientName}</p>
          <p className="text-xs font-label-caps text-on-surface-variant">
            {service} • {formatDate(createdAt)}
          </p>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-outline-variant flex items-center justify-between">
        <span className="font-label-caps text-[10px] tracking-widest text-on-surface-variant">FEATURE ON HOMEPAGE</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only custom-toggle" 
            checked={!!isFeatured} 
            onChange={() => onToggleFeatured(id)}
          />
          <div className={`w-11 h-6 rounded-full transition-colors relative ${isFeatured ? 'bg-secondary' : 'bg-surface-container'}`}>
            <div 
              className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform toggle-dot ${isFeatured ? 'translate-x-5 bg-white' : 'bg-outline-variant'}`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default TestimonialCard;
