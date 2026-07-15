import { useState, useEffect } from 'react';
import { portfolioService } from '../../services/portfolioService';

const UploadModal = ({ isOpen, initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Bridal',
    altText: '',
    featured: false,
    visible: true,
    imageUrl: ''
  });
  
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const res = await portfolioService.uploadImage(file);
      if (res.success) {
        setFormData(prev => ({ ...prev, imageUrl: res.data.url }));
      } else {
        alert('Upload failed');
      }
      setIsUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.imageUrl) {
      alert("Title and Image are required");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-[90%] max-w-lg bg-surface custom-shadow p-6 lg:p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm text-primary">
            {initialData ? 'Edit Masterpiece' : 'Upload Masterpiece'}
          </h3>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-secondary" onClick={onClose}>
            close
          </button>
        </div>

        {/* Image Dropzone */}
        <div className="relative border-2 border-dashed border-outline-variant p-8 lg:p-12 text-center flex flex-col items-center justify-center gap-4 hover:border-secondary hover:bg-primary-container transition-all overflow-hidden group">
           {formData.imageUrl ? (
              <img src={formData.imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
           ) : null}
          <input 
            type="file" 
            accept="image/jpeg, image/png"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={handleFileChange}
          />
          <div className="relative z-0 pointer-events-none">
             {isUploading ? (
                <span className="material-symbols-outlined text-4xl text-secondary animate-spin">sync</span>
             ) : (
                <span className="material-symbols-outlined text-4xl text-secondary">cloud_upload</span>
             )}
             <p className="font-body-md">{isUploading ? 'Uploading...' : (formData.imageUrl ? 'Replace Image' : 'Drag and drop high-res image here')}</p>
             <p className="font-label-caps text-[10px] text-on-surface-variant mt-2">JPG, PNG up to 20MB</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-b border-outline-variant focus-within:border-secondary transition-all py-2">
            <label className="block font-label-caps text-[10px] font-bold text-on-surface-variant mb-1">IMAGE TITLE</label>
            <input 
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-on-surface placeholder:opacity-30" 
              placeholder="e.g. Silk & Stone" 
              type="text"
            />
          </div>

          <div className="border-b border-outline-variant focus-within:border-secondary transition-all py-2">
            <label className="block font-label-caps text-[10px] font-bold text-on-surface-variant mb-1">CATEGORY</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-on-surface appearance-none cursor-pointer"
            >
              <option>Bridal</option>
              <option>Editorial</option>
              <option>Celebrity</option>
              <option>Commercial</option>
              <option>Avant-Garde</option>
              <option>Runway</option>
              <option>Glamour</option>
            </select>
          </div>
          
          <div className="border-b border-outline-variant focus-within:border-secondary transition-all py-2">
            <label className="block font-label-caps text-[10px] font-bold text-on-surface-variant mb-1">ALT TEXT (SEO)</label>
            <input 
              name="altText"
              value={formData.altText}
              onChange={handleChange}
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-on-surface placeholder:opacity-30" 
              placeholder="Description for accessibility..." 
              type="text"
            />
          </div>

          <div className="flex gap-6 pt-4">
             <label className="flex items-center gap-2 cursor-pointer">
                <input 
                   type="checkbox" 
                   name="featured" 
                   checked={formData.featured} 
                   onChange={handleChange}
                   className="text-secondary border-outline-variant focus:ring-secondary rounded"
                />
                <span className="font-label-caps text-[10px] font-bold text-on-surface-variant">FEATURED</span>
             </label>

             <label className="flex items-center gap-2 cursor-pointer">
                <input 
                   type="checkbox" 
                   name="visible" 
                   checked={formData.visible} 
                   onChange={handleChange}
                   className="text-secondary border-outline-variant focus:ring-secondary rounded"
                />
                <span className="font-label-caps text-[10px] font-bold text-on-surface-variant">VISIBLE</span>
             </label>
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={isUploading}
          className={`bg-primary text-white w-full py-4 font-label-caps text-label-caps transition-colors ${isUploading ? 'opacity-50' : 'hover:bg-secondary'}`}
        >
          {isUploading ? 'WAITING...' : 'CONFIRM'}
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
