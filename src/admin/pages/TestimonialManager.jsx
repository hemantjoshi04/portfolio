import React, { useState, useEffect } from 'react';
import { testimonialService } from '../../services/testimonialService';
import TestimonialCard from '../components/TestimonialCard';
import TestimonialModal from '../components/TestimonialModal';

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await testimonialService.getAll();
      if (res.success) {
        setTestimonials(res.data);
      }
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleToggleFeatured = async (id) => {
    try {
      const res = await testimonialService.toggleFeatured(id);
      if (res.success) {
        setTestimonials(prev => prev.map(t => t.id === id ? res.data : t));
      }
    } catch (err) {
      console.error('Failed to toggle featured state:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const res = await testimonialService.delete(id);
        if (res.success) {
          setTestimonials(prev => prev.filter(t => t.id !== id));
        }
      } catch (err) {
        console.error('Failed to delete testimonial:', err);
      }
    }
  };

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        const res = await testimonialService.update(editingItem.id, formData);
        if (res.success) {
          setTestimonials(prev => prev.map(t => t.id === editingItem.id ? res.data : t));
        }
      } else {
        const res = await testimonialService.create({ ...formData, createdAt: new Date().toISOString() });
        if (res.success) {
          setTestimonials(prev => [...prev, res.data]);
        }
      }
      handleCloseModal();
    } catch (err) {
      console.error('Failed to save testimonial:', err);
    }
  };

  // Compute stats
  const totalReviews = testimonials.length;
  const averageRating = totalReviews > 0 ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviews).toFixed(1) : '0.0';
  const featuredCount = testimonials.filter(t => t.isFeatured).length;

  return (
    <div className="max-w-[1280px] mx-auto pb-32 lg:pb-12">
      {/* Page Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <span className="font-label-caps text-label-caps text-secondary mb-2 block">Client Experience</span>
          <h1 className="font-headline-md text-headline-md text-primary mb-2">Manage Testimonials</h1>
          <p className="text-on-surface-variant max-w-xl">Curate your best client stories to showcase your artistry on the homepage and build trust with new visitors.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 flex items-center gap-2 hover:bg-secondary transition-all active:scale-95"
        >
          <span className="material-symbols-outlined" data-icon="add">add</span>
          Add Manual Review
        </button>
      </div>

      {/* Stats Overview Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-surface-container-lowest p-6 border-t-2 border-secondary shadow-[0px_20px_40px_rgba(0,0,0,0.04)]">
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">Average Rating</p>
          <div className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md text-primary">{averageRating}</span>
            <div className="flex text-secondary">
              <span className="material-symbols-outlined filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-6 border-t-2 border-secondary shadow-[0px_20px_40px_rgba(0,0,0,0.04)]">
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">Total Reviews</p>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-md text-headline-md text-primary">{totalReviews}</span>
            <span className="text-on-surface-variant text-sm">active</span>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-6 border-t-2 border-secondary shadow-[0px_20px_40px_rgba(0,0,0,0.04)]">
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">Featured Reviews</p>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-md text-headline-md text-primary">{featuredCount}</span>
            <span className="text-on-surface-variant text-sm">/ 12 slot capacity</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <div key={testimonial.id}>
              <TestimonialCard 
                testimonial={testimonial}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
                onToggleFeatured={handleToggleFeatured}
              />
            </div>
          ))}
          
          {/* Add New Placeholder */}
          <div 
            onClick={() => handleOpenModal()}
            className="border-2 border-dashed border-outline-variant p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-primary-container transition-all h-full min-h-[320px]"
          >
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl text-outline">add_circle</span>
            </div>
            <p className="font-bold text-on-surface-variant mb-1">Add Manual Review</p>
            <p className="text-xs font-label-caps text-outline">Direct entry</p>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-12 flex justify-center items-center gap-4">
        <button className="p-2 border border-outline-variant hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
        </button>
        <span className="font-label-caps text-label-caps">Page 1 of 1</span>
        <button className="p-2 border border-outline-variant hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
        </button>
      </div>

      <TestimonialModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmit} 
        editingItem={editingItem} 
      />
    </div>
  );
};

export default TestimonialManager;
