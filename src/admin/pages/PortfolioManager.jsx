import { useState, useEffect } from 'react';
import { portfolioService } from '../../services/portfolioService';
import PortfolioCard from '../components/PortfolioCard';
import UploadModal from '../components/UploadModal';

const FILTERS = ['All Works', 'Bridal', 'Editorial', 'Celebrity', 'Commercial', 'Avant-Garde'];
const MOBILE_FILTERS = ['All', 'Bridal', 'Editorial', 'Runway', 'Glamour'];

const PortfolioManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Works');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  const loadPortfolio = async () => {
    setLoading(true);
    const res = await portfolioService.getAll();
    if (res.success) {
      setItems(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await portfolioService.delete(id);
      loadPortfolio();
    }
  };

  const handleSave = async (data) => {
    if (editingItem) {
      await portfolioService.update(editingItem.id, data);
    } else {
      await portfolioService.create(data);
    }
    setIsModalOpen(false);
    loadPortfolio();
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    // Needed for Firefox
    if(e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.parentNode);
    }
  };

  const handleDragOver = (e, targetItem) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetItem) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetItem.id) return;
    
    // Simple swap logic for sortOrder
    const newItems = [...items];
    const draggedIdx = newItems.findIndex(i => i.id === draggedItem.id);
    const targetIdx = newItems.findIndex(i => i.id === targetItem.id);
    
    const tempOrder = newItems[draggedIdx].sortOrder;
    newItems[draggedIdx].sortOrder = newItems[targetIdx].sortOrder;
    newItems[targetIdx].sortOrder = tempOrder;

    // Optimistic update
    setItems(newItems.sort((a, b) => a.sortOrder - b.sortOrder));
    
    // Persist
    await portfolioService.reorder(newItems.map(i => ({ id: i.id, sortOrder: i.sortOrder })));
    setDraggedItem(null);
  };

  const displayFilters = typeof window !== 'undefined' && window.innerWidth < 1024 ? MOBILE_FILTERS : FILTERS;
  const currentItems = items.filter(i => activeFilter === 'All Works' || activeFilter === 'All' || i.category === activeFilter);

  return (
    <div className="max-w-container-max mx-auto px-gutter py-8 lg:py-12">
      {/* Header Section (Desktop) */}
      <div className="hidden lg:flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-4">Curated Portfolio</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Organize your creative masterpieces. Use the drag-and-drop feature to redefine the narrative of your artistry for prospective clients.
          </p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-primary text-white flex items-center justify-center gap-2 px-8 py-4 rounded-none font-label-caps text-label-caps h-fit group hover:bg-secondary transition-all"
        >
          <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add</span>
          Upload New Image
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex overflow-x-auto gap-3 mb-10 pb-2 hide-scrollbar lg:flex-wrap">
        {displayFilters.map(filter => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-shrink-0 px-6 py-2.5 rounded-full border font-label-caps text-label-caps transition-all ${
              activeFilter === filter 
                ? 'bg-secondary text-white border-secondary' 
                : 'bg-white text-on-surface-variant border-outline-variant hover:border-secondary hover:text-secondary'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Shared Loading / Empty State — renders exactly once */}
      {loading && (
        <p className="text-on-surface-variant">Loading gallery...</p>
      )}
      {!loading && currentItems.length === 0 && (
        <p className="text-on-surface-variant">No portfolio items found.</p>
      )}

      {/* Grid Container (Desktop Only) — cards only */}
      {!loading && currentItems.length > 0 && (
        <div className="hidden lg:grid masonry-grid">
          {currentItems.map((item, idx) => (
            <PortfolioCard 
              key={item.id} 
              item={item} 
              index={idx}
              variant="desktop"
              onEdit={() => handleOpenEdit(item)}
              onDelete={() => handleDelete(item.id)}
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={(e) => handleDragOver(e, item)}
              onDrop={(e) => handleDrop(e, item)}
            />
          ))}
        </div>
      )}

      {/* Mobile Vertical List Container — cards only */}
      {!loading && currentItems.length > 0 && (
        <div className="lg:hidden space-y-8 pb-24">
          {currentItems.map((item, idx) => (
            <PortfolioCard 
              key={item.id} 
              item={item} 
              index={idx}
              variant="mobile"
              onEdit={() => handleOpenEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      )}

      {/* Mobile FAB */}
      <button 
        onClick={handleOpenAdd}
        className="lg:hidden fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center luxury-shadow active:scale-95 transition-transform hover:bg-secondary z-50"
      >
        <span className="material-symbols-outlined text-[32px]">add</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <UploadModal 
          isOpen={isModalOpen}
          initialData={editingItem}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Shared styles */}
      <style>{`
        .masonry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-auto-rows: 10px;
            gap: 24px;
        }
        .masonry-item { grid-row-end: span 30; }
        .masonry-item.tall { grid-row-end: span 45; }
        .masonry-item.short { grid-row-end: span 25; }
        .custom-shadow { box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.04); }
        .luxury-shadow { box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.04); }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PortfolioManager;
