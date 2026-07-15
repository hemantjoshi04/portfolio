const PortfolioCard = ({ item, index, variant, onEdit, onDelete, onDragStart, onDragOver, onDrop }) => {
  // Determine height class for desktop masonry
  // Following Stitch pattern: tall, short, standard
  let sizeClass = '';
  if (index % 3 === 0) sizeClass = 'tall';
  else if (index % 3 === 2) sizeClass = 'short';

  if (variant === 'desktop') {
    return (
      <div 
        className={`masonry-item ${sizeClass} relative group overflow-hidden custom-shadow border-t-2 border-secondary bg-white`}
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="h-[calc(100%-80px)] overflow-hidden cursor-grab active:cursor-grabbing relative">
          <img 
            src={item.imageUrl} 
            alt={item.altText || item.title} 
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${!item.visible ? 'opacity-50 grayscale' : ''}`} 
          />
           {!item.visible && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                 <span className="material-symbols-outlined text-white text-4xl shadow-sm">visibility_off</span>
              </div>
           )}
        </div>
        <div className="p-4 flex justify-between items-center bg-white h-[80px]">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="block font-label-caps text-[10px] text-secondary tracking-widest uppercase">{item.category}</span>
               {item.featured && <span className="material-symbols-outlined text-secondary text-[12px]">star</span>}
            </div>
            <p className="font-body-md text-sm font-semibold truncate max-w-[150px]">{item.title}</p>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={onEdit} className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors" title="Edit">
              <span className="material-symbols-outlined text-lg">edit</span>
            </button>
            <button onClick={onDelete} className="p-2 hover:bg-error-container hover:text-error rounded-full text-on-surface-variant transition-colors" title="Delete">
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        </div>
        <div className="absolute top-4 left-4 p-1 bg-white/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity cursor-move pointer-events-none">
          <span className="material-symbols-outlined text-sm">drag_indicator</span>
        </div>
      </div>
    );
  }

  // variant === 'mobile'
  return (
    <div className="group relative overflow-hidden bg-white luxury-shadow rounded-lg border-t-2 border-secondary">
      <div className="aspect-[3/4] w-full overflow-hidden relative">
        <img 
          src={item.imageUrl} 
          alt={item.altText || item.title} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${!item.visible ? 'opacity-50 grayscale' : ''}`}
        />
         {!item.visible && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
               <span className="material-symbols-outlined text-white text-4xl shadow-sm">visibility_off</span>
            </div>
         )}
      </div>
      <div className="p-4 flex justify-between items-center bg-white">
        <div>
          <h3 className="font-headline-sm text-[18px] text-on-surface flex items-center gap-2">
             {item.title}
             {item.featured && <span className="material-symbols-outlined text-secondary text-[16px]">star</span>}
          </h3>
          <p className="font-label-caps text-[10px] text-secondary mt-1">{item.category}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onEdit} className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-primary active:scale-90">
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button onClick={onDelete} className="p-2 rounded-full hover:bg-error-container hover:text-error transition-colors text-primary active:scale-90">
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
