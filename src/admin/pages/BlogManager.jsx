import React, { useState, useEffect, useMemo } from 'react';
import { blogService } from '../../services/blogService';
import BlogCard from '../components/BlogCard';
import BlogEditorModal from '../components/BlogEditorModal';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'published', 'draft', 'scheduled'
  const [sort, setSort] = useState('newest'); // 'newest', 'oldest', 'alpha'
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await blogService.getAll();
      if (res.success) {
        setPosts(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch posts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenEditor = (item = null) => {
    setEditingItem(item);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (formData, action) => {
    try {
      const isPublish = action === 'publish';
      const status = isPublish ? 'published' : 'draft';
      const payload = { ...formData, status };

      if (editingItem) {
        if (isPublish) {
           await blogService.publish(editingItem.id);
        } else if (editingItem.status === 'published' && !isPublish) {
           await blogService.unpublish(editingItem.id);
        }
        const res = await blogService.update(editingItem.id, formData);
        if (res.success) {
          setPosts(prev => prev.map(p => p.id === editingItem.id ? { ...res.data, status } : p));
        }
      } else {
        const res = await blogService.create(payload);
        if (res.success) {
          if (isPublish) {
            const pubRes = await blogService.publish(res.data.id);
            if (pubRes.success) {
               setPosts(prev => [pubRes.data, ...prev]);
            }
          } else {
            setPosts(prev => [res.data, ...prev]);
          }
        }
      }
      handleCloseEditor();
    } catch (err) {
      console.error('Failed to save post', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const res = await blogService.delete(id);
        if (res.success) {
          setPosts(prev => prev.filter(p => p.id !== id));
        }
      } catch (err) {
        console.error('Failed to delete post', err);
      }
    }
  };

  // Derived state for filtering and sorting
  const filteredPosts = useMemo(() => {
    let result = [...posts];
    if (filter !== 'all') {
      result = result.filter(p => p.status === filter);
    }
    
    result.sort((a, b) => {
      if (sort === 'alpha') {
        return a.title.localeCompare(b.title);
      }
      const dateA = new Date(a.updatedAt || a.createdAt);
      const dateB = new Date(b.updatedAt || b.createdAt);
      if (sort === 'oldest') {
        return dateA - dateB;
      }
      return dateB - dateA;
    });
    
    return result;
  }, [posts, filter, sort]);

  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;
  const scheduledCount = posts.filter(p => p.status === 'scheduled').length;

  const featuredPost = useMemo(() => {
    const pub = posts.filter(p => p.status === 'published');
    if (!pub.length) return null;
    return pub.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))[0];
  }, [posts]);

  // Remove featured post from the general list if we show it separately (optional, but let's keep it in the list if filter is applied, or exclude if showing all)
  const listPosts = filter === 'all' && featuredPost ? filteredPosts.filter(p => p.id !== featuredPost.id) : filteredPosts;

  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-container-max mx-auto pb-32 lg:pb-12 px-margin-mobile md:px-gutter mt-8">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-section-gap gap-6">
        <div>
          <p className="font-label-caps text-label-caps text-secondary mb-2 uppercase">Editorial Management</p>
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary">Content Suite</h1>
        </div>
        <button 
          onClick={() => handleOpenEditor()}
          className="bg-[#1c1b1b] text-white font-label-caps text-label-caps py-4 px-8 transition-all duration-300 hover:bg-secondary flex items-center justify-center gap-3 active:scale-95 whitespace-nowrap"
        >
          <span className="material-symbols-outlined" data-icon="add">add</span>
          CREATE NEW POST
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-8 border-b border-outline-variant pb-4">
        <button 
          onClick={() => setFilter('all')}
          className={`font-label-caps text-label-caps pb-4 px-2 whitespace-nowrap transition-colors ${filter === 'all' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-primary'}`}
        >
          ALL POSTS ({posts.length})
        </button>
        <button 
          onClick={() => setFilter('published')}
          className={`font-label-caps text-label-caps pb-4 px-2 whitespace-nowrap transition-colors ${filter === 'published' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-primary'}`}
        >
          PUBLISHED ({publishedCount})
        </button>
        <button 
          onClick={() => setFilter('draft')}
          className={`font-label-caps text-label-caps pb-4 px-2 whitespace-nowrap transition-colors ${filter === 'draft' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-primary'}`}
        >
          DRAFTS ({draftCount})
        </button>
        <button 
          onClick={() => setFilter('scheduled')}
          className={`font-label-caps text-label-caps pb-4 px-2 whitespace-nowrap transition-colors ${filter === 'scheduled' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-primary'}`}
        >
          SCHEDULED ({scheduledCount})
        </button>
        
        <div className="ml-auto flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0 justify-end">
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border-none bg-transparent font-label-caps text-[10px] uppercase cursor-pointer text-on-surface-variant focus:ring-0 px-2"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="alpha">Sort: Alphabetical</option>
          </select>
          <span className="material-symbols-outlined text-on-surface-variant hidden md:block" data-icon="filter_list">filter_list</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          
          {/* Desktop/Tablet Featured/Stats Bento (Only show if all posts are visible) */}
          {filter === 'all' && featuredPost && (
             <>
                <div className="md:col-span-8 bg-surface-container-lowest shadow-[0px_20px_40px_rgba(0,0,0,0.04)] border-t-2 border-secondary/20 p-6 md:p-8 group relative overflow-hidden flex flex-col justify-between hidden md:flex cursor-pointer transition-transform hover:scale-[1.01]" onClick={() => handleOpenEditor(featuredPost)}>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <span className="bg-secondary-container/30 text-secondary font-label-caps text-[10px] px-3 py-1 rounded-full mb-4 inline-block tracking-widest uppercase">PUBLISHED</span>
                      <h3 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors line-clamp-2">{featuredPost.title}</h3>
                      <p className="text-on-surface-variant font-body-lg mt-2 max-w-md line-clamp-2">{featuredPost.excerpt || 'No excerpt available'}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); handleOpenEditor(featuredPost); }} className="p-2 hover:bg-surface-container transition-colors rounded-full text-outline"><span className="material-symbols-outlined text-sm">edit</span></button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(featuredPost.id); }} className="p-2 hover:bg-surface-container transition-colors rounded-full text-outline"><span className="material-symbols-outlined text-sm">delete</span></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-outline-variant/30 pt-6 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden flex items-center justify-center text-white">
                        {featuredPost.coverImageUrl ? (
                          <img src={featuredPost.coverImageUrl} className="w-full h-full object-cover" alt="Author" />
                        ) : (
                          <span className="font-label-caps">AS</span>
                        )}
                      </div>
                      <div>
                        <p className="font-label-caps text-[11px] uppercase text-primary">{featuredPost.author}</p>
                        <p className="text-[10px] text-on-surface-variant uppercase">{formatDate(featuredPost.publishedAt || featuredPost.updatedAt)} • {featuredPost.readingTime} MIN READ</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-on-surface-variant">
                      <span className="flex items-center gap-1 text-[10px]"><span className="material-symbols-outlined text-sm">visibility</span> {featuredPost.views}</span>
                      <span className="flex items-center gap-1 text-[10px]"><span className="material-symbols-outlined text-sm">comment</span> {featuredPost.comments}</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 bg-[#1c1b1b] text-white p-8 flex flex-col justify-between hidden md:flex shadow-[0px_20px_40px_rgba(0,0,0,0.2)]">
                  <div>
                    <p className="font-label-caps text-label-caps text-secondary mb-8">QUARTERLY OVERVIEW</p>
                    <div className="space-y-6">
                      <div>
                        <p className="text-4xl font-display-lg text-secondary">85%</p>
                        <p className="text-[10px] font-label-caps tracking-[0.2em] opacity-60 mt-1">ENGAGEMENT GROWTH</p>
                      </div>
                      <div>
                        <p className="text-4xl font-display-lg">{draftCount}</p>
                        <p className="text-[10px] font-label-caps tracking-[0.2em] opacity-60 mt-1">ACTIVE DRAFTS</p>
                      </div>
                    </div>
                  </div>
                  <button className="border-b border-secondary text-secondary font-label-caps text-label-caps py-2 w-max hover:opacity-70 transition-opacity mt-8">VIEW ANALYTICS</button>
                </div>
             </>
          )}

          {/* List Rows */}
          <div className="col-span-1 md:col-span-12 space-y-4 mt-4 md:mt-8">
            {listPosts.length === 0 ? (
               <div className="py-12 text-center border-2 border-dashed border-outline-variant text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-4 opacity-50">article</span>
                  <p className="font-body-lg">No posts found.</p>
               </div>
            ) : (
               listPosts.map(post => (
                 <BlogCard 
                   key={post.id} 
                   post={post} 
                   onEdit={handleOpenEditor} 
                   onDelete={handleDelete} 
                 />
               ))
            )}
          </div>
        </div>
      )}

      <BlogEditorModal 
        isOpen={isEditorOpen} 
        onClose={handleCloseEditor} 
        onSubmit={handleSubmit} 
        editingItem={editingItem} 
      />
    </div>
  );
};

export default BlogManager;
