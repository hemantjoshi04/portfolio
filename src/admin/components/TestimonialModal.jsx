import React, { useState, useEffect } from 'react';

const TestimonialModal = ({ isOpen, onClose, onSubmit, editingItem }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    service: '',
    rating: 5,
    text: ''
  });

  useEffect(() => {
    if (isOpen && editingItem) {
      setFormData({
        clientName: editingItem.clientName || '',
        service: editingItem.service || '',
        rating: editingItem.rating || 5,
        text: editingItem.text || ''
      });
    } else if (isOpen) {
      setFormData({
        clientName: '',
        service: '',
        rating: 5,
        text: ''
      });
    }
  }, [isOpen, editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'rating' ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1c1b1b]/80 z-50 flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-lg shadow-[0px_20px_40px_rgba(0,0,0,0.2)] animate-fade-in flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h2 className="font-headline-sm text-headline-sm text-primary">
            {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
          </h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-error transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Client Name</label>
              <input 
                type="text" 
                name="clientName"
                required 
                value={formData.clientName}
                onChange={handleChange}
                className="w-full bg-surface-container-highest border border-outline-variant p-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all font-body-md"
                placeholder="e.g. Sophia Henderson"
              />
            </div>

            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Service Type</label>
              <input 
                type="text" 
                name="service"
                required 
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-surface-container-highest border border-outline-variant p-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all font-body-md"
                placeholder="e.g. Bridal Client"
              />
            </div>

            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Rating</label>
              <select 
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full bg-surface-container-highest border border-outline-variant p-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all font-body-md"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>

            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Review Text</label>
              <textarea 
                name="text"
                required 
                rows="4"
                value={formData.text}
                onChange={handleChange}
                className="w-full bg-surface-container-highest border border-outline-variant p-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all font-body-md resize-none"
                placeholder="Client's review..."
              ></textarea>
            </div>
            
          </form>
        </div>
        
        <div className="p-6 border-t border-outline-variant bg-surface-container-lowest flex gap-4 justify-end">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-3 font-label-caps text-label-caps text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="testimonial-form"
            className="px-6 py-3 font-label-caps text-label-caps bg-primary text-on-primary hover:bg-secondary transition-colors shadow-md"
          >
            {editingItem ? 'Save Changes' : 'Add Testimonial'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialModal;
