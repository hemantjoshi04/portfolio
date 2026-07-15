import React from 'react';

const BlogCard = ({ post, onEdit, onDelete }) => {
  const { id, title, status, category, updatedAt, views, comments, coverImageUrl, publishedAt } = post;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusDisplay = () => {
    switch (status) {
      case 'published':
        return <span className="font-label-caps text-[10px] letter-spacing-0.1em px-2 py-1 rounded bg-tertiary-container text-on-tertiary-container uppercase font-bold">Published</span>;
      case 'draft':
        return <span className="font-label-caps text-[10px] letter-spacing-0.1em px-2 py-1 rounded bg-surface-container-high text-on-surface-variant uppercase font-bold">Draft</span>;
      case 'scheduled':
        return <span className="font-label-caps text-[10px] letter-spacing-0.1em px-2 py-1 rounded bg-primary-container text-on-primary-container uppercase font-bold">Scheduled</span>;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    if (status === 'published') return 'bg-secondary';
    if (status === 'draft') return 'bg-outline-variant';
    if (status === 'scheduled') return 'bg-tertiary-fixed-dim';
    return 'bg-outline';
  };

  return (
    <div className="bg-surface-container-lowest luxury-shadow p-5 flex flex-col gap-3 relative overflow-hidden group transition-all hover:scale-[1.02] border border-outline-variant/20">
      <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor()}`}></div>
      
      <div className="flex justify-between items-start">
        {getStatusDisplay()}
        <div className="flex gap-2 opacity-0 lg:group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(post)} className="p-1 hover:text-secondary text-outline" title="Edit Post">
            <span className="material-symbols-outlined text-sm" data-icon="edit">edit</span>
          </button>
          <button onClick={() => onDelete(id)} className="p-1 hover:text-error text-outline" title="Delete Post">
            <span className="material-symbols-outlined text-sm" data-icon="delete">delete</span>
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="font-headline-sm text-[18px] leading-tight mb-1 group-hover:text-secondary transition-colors cursor-pointer" onClick={() => onEdit(post)}>
          {title}
        </h3>
        <p className="font-label-caps text-[10px] text-outline uppercase mt-2 block">
          {status === 'scheduled' ? `Goes live on ${formatDate(publishedAt)}` : `${status === 'published' ? 'Updated' : 'Last edited'} ${formatDate(updatedAt)}`} • {views} views
        </p>
      </div>
      
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-outline-variant/30">
        <div className="w-12 h-12 bg-surface-container-high rounded-sm overflow-hidden shrink-0 flex items-center justify-center text-outline-variant">
          {coverImageUrl ? (
            <img className="w-full h-full object-cover" src={coverImageUrl} alt={title} />
          ) : (
            <span className="material-symbols-outlined">image</span>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center">
           <div className="flex gap-4">
              <span className="font-label-caps text-[10px] border border-outline-variant px-2 py-1 rounded-full uppercase">{category}</span>
           </div>
           <div className="flex gap-3 mt-2 text-on-surface-variant">
             <span className="flex items-center gap-1 text-[10px]"><span className="material-symbols-outlined text-xs">chat_bubble</span> {comments}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
