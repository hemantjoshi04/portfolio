import React, { useState, useEffect, useRef } from 'react';
import { blogService } from '../../services/blogService';

const BlogEditorModal = ({ isOpen, onClose, onSubmit, editingItem }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tags: '',
    content: '',
    coverImageUrl: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (editingItem) {
        setFormData({
          title: editingItem.title || '',
          category: editingItem.category || '',
          tags: (editingItem.tags || []).join(', '),
          content: editingItem.content || '',
          coverImageUrl: editingItem.coverImageUrl || ''
        });
        if (contentRef.current) {
          contentRef.current.innerHTML = editingItem.content || '';
        }
      } else {
        setFormData({
          title: '',
          category: '',
          tags: '',
          content: '',
          coverImageUrl: ''
        });
        if (contentRef.current) {
          contentRef.current.innerHTML = '';
        }
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentInput = () => {
    if (contentRef.current) {
      setFormData(prev => ({ ...prev, content: contentRef.current.innerHTML }));
    }
  };

  const handleAction = async (action) => {
    const payload = {
      title: formData.title,
      category: formData.category,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      content: formData.content,
      coverImageUrl: formData.coverImageUrl
    };
    
    onSubmit(payload, action);
  };

  const handleImageUploadClick = async () => {
    // Mock image upload
    setIsUploading(true);
    try {
      const res = await blogService.uploadImage(null);
      if (res.success && contentRef.current) {
        // Insert image at the end of content for mock
        const imgHtml = `<img src="${res.data.url}" alt="Uploaded content" class="my-4 max-w-full rounded" />`;
        contentRef.current.innerHTML += imgHtml;
        setFormData(prev => ({ ...prev, content: contentRef.current.innerHTML }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCoverUploadClick = async () => {
    setIsUploading(true);
    try {
      const res = await blogService.uploadImage(null);
      if (res.success) {
        setFormData(prev => ({ ...prev, coverImageUrl: res.data.url }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const execCmd = (cmd, arg = null) => {
    document.execCommand(cmd, false, arg);
    handleContentInput();
  };

  if (!isOpen) return null;

  // Calculate words for the mock word counter
  const wordCount = formData.content.replace(/<[^>]*>?/gm, '').split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="fixed inset-0 bg-surface z-[100] overflow-y-auto animate-fade-in flex flex-col">
      <header className="sticky top-0 bg-surface/90 backdrop-blur-md px-4 md:px-gutter py-4 md:py-6 flex flex-col md:flex-row justify-between items-center border-b border-outline-variant gap-4 z-10">
        <button className="flex items-center gap-2 font-label-caps text-label-caps text-primary hover:text-secondary self-start md:self-auto" onClick={onClose}>
          <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
          EXIT TO LIST
        </button>
        <div className="flex items-center gap-4 self-end md:self-auto w-full md:w-auto">
          <button 
            onClick={() => handleAction('draft')}
            className="flex-1 md:flex-none border border-secondary text-secondary font-label-caps text-label-caps py-3 px-6 hover:bg-secondary hover:text-white transition-colors"
          >
            SAVE DRAFT
          </button>
          <button 
            onClick={() => handleAction('publish')}
            className="flex-1 md:flex-none bg-[#1c1b1b] text-white font-label-caps text-label-caps py-3 px-6 hover:bg-secondary transition-colors"
          >
            PUBLISH POST
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 md:px-gutter py-12 w-full flex-grow flex flex-col">
        <div className="mb-12">
          <input 
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full font-display-lg text-[32px] md:text-[48px] border-none focus:ring-0 bg-transparent placeholder:opacity-30 uppercase text-primary outline-none px-0" 
            placeholder="POST TITLE" 
          />
          <div className="flex flex-wrap gap-4 mt-6">
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border-t-0 border-x-0 border-b border-outline-variant bg-transparent focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-[10px] uppercase transition-all outline-none"
            >
              <option value="">SELECT CATEGORY</option>
              <option value="Bridal">Bridal</option>
              <option value="Editorial">Editorial</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Beauty Tips">Beauty Tips</option>
              <option value="Business">Business</option>
            </select>
            <input 
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="border-t-0 border-x-0 border-b border-outline-variant bg-transparent focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-[10px] uppercase transition-all outline-none flex-1 min-w-[200px]" 
              placeholder="TAGS (SEPARATED BY COMMAS)" 
            />
          </div>
          
          <div className="mt-8">
            <label className="font-label-caps text-[10px] text-on-surface-variant block mb-2">COVER IMAGE</label>
            {formData.coverImageUrl ? (
               <div className="relative w-full md:w-1/2 aspect-video bg-surface-container rounded overflow-hidden group">
                  <img src={formData.coverImageUrl} className="w-full h-full object-cover" alt="Cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                     <button type="button" onClick={handleCoverUploadClick} className="bg-white text-primary px-4 py-2 font-label-caps text-[10px] rounded">CHANGE</button>
                     <button type="button" onClick={() => setFormData(prev => ({...prev, coverImageUrl: ''}))} className="bg-error text-white px-4 py-2 font-label-caps text-[10px] rounded">REMOVE</button>
                  </div>
               </div>
            ) : (
               <button type="button" onClick={handleCoverUploadClick} className="flex items-center gap-2 border border-dashed border-outline-variant px-6 py-8 w-full md:w-1/2 hover:border-secondary hover:bg-surface-container transition-colors text-outline">
                 <span className="material-symbols-outlined">add_photo_alternate</span>
                 <span className="font-label-caps text-[10px]">ADD COVER IMAGE</span>
                 {isUploading && <span className="ml-2 w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></span>}
               </button>
            )}
          </div>
        </div>

        {/* Mock Rich Text Toolbar */}
        <div className="sticky top-[73px] md:top-[81px] bg-surface/95 backdrop-blur py-3 border-y border-outline-variant mb-8 flex flex-wrap gap-4 md:gap-6 text-on-surface-variant z-10">
          <button type="button" onClick={() => execCmd('bold')} className="hover:text-secondary transition-colors"><span className="material-symbols-outlined" data-icon="format_bold">format_bold</span></button>
          <button type="button" onClick={() => execCmd('italic')} className="hover:text-secondary transition-colors"><span className="material-symbols-outlined" data-icon="format_italic">format_italic</span></button>
          <button type="button" onClick={() => execCmd('formatBlock', 'H2')} className="hover:text-secondary transition-colors"><span className="material-symbols-outlined" data-icon="format_h1">format_h1</span></button>
          <button type="button" onClick={() => execCmd('formatBlock', 'H3')} className="hover:text-secondary transition-colors"><span className="material-symbols-outlined" data-icon="format_h2">format_h2</span></button>
          <div className="w-px h-6 bg-outline-variant/50 hidden md:block"></div>
          <button type="button" onClick={() => execCmd('formatBlock', 'BLOCKQUOTE')} className="hover:text-secondary transition-colors"><span className="material-symbols-outlined" data-icon="format_quote">format_quote</span></button>
          <button type="button" onClick={() => execCmd('insertUnorderedList')} className="hover:text-secondary transition-colors"><span className="material-symbols-outlined" data-icon="format_list_bulleted">format_list_bulleted</span></button>
          <button type="button" onClick={handleImageUploadClick} className="hover:text-secondary transition-colors relative">
            <span className="material-symbols-outlined" data-icon="image">image</span>
            {isUploading && <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full animate-pulse"></span>}
          </button>
          <button type="button" onClick={() => {
            const url = prompt('Enter link URL:');
            if (url) execCmd('createLink', url);
          }} className="hover:text-secondary transition-colors"><span className="material-symbols-outlined" data-icon="link">link</span></button>
          
          <div className="ml-auto flex gap-4 self-center">
            <span className="font-label-caps text-[10px]">WORDS: {wordCount}</span>
          </div>
        </div>

        {/* Content Area */}
        <div 
          ref={contentRef}
          onInput={handleContentInput}
          className="min-h-[400px] font-body-lg text-body-lg focus:outline-none leading-relaxed flex-grow prose prose-stone max-w-none" 
          contentEditable="true"
          suppressContentEditableWarning={true}
        ></div>
      </div>
    </div>
  );
};

export default BlogEditorModal;
