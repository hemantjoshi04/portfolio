import { useState, useEffect } from 'react';
import { portfolioImages } from '../data/images';
import { portfolioService } from '../services/portfolioService';
import SEO from '../components/SEO';

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [portfolioData, setPortfolioData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['All', 'Bridal', 'Editorial', 'Fashion', 'Glamour'];

  useEffect(() => {
    const fetchPortfolio = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await portfolioService.getAll();
        if (res.success) {
          setPortfolioData(res.data.filter(item => item.visible));
        } else {
          setError('Unable to load portfolio images at this time.');
        }
      } catch (err) {
        setError('Unable to load portfolio images at this time.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolio();
  }, []);
  
  const filteredData = filter === 'All' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === filter);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % filteredData.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredData.length - 1 : prev - 1));
  };

  return (
    <main className="min-h-screen pt-20">
      <SEO title="Portfolio Gallery" url="/portfolio" />
      <section className="py-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto text-center">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-6">Portfolio Gallery</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Explore a curated collection of our finest work, showcasing the transformative power of professional artistry across diverse styles and occasions.</p>
      </section>

      <section className="pb-12 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, i) => (
            <button 
              key={i} 
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 border font-label-caps text-label-caps uppercase tracking-widest transition-colors duration-300 ${filter === cat ? 'bg-secondary text-on-secondary border-secondary' : 'border-secondary/30 text-on-surface-variant hover:border-secondary hover:text-secondary'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto pb-section-gap">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="font-body-lg text-on-surface-variant">Loading portfolio gallery...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="font-body-lg text-on-surface-variant text-red-500">{error}</p>
          </div>
        ) : (
          <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredData.map((item, index) => (
                <div 
                  key={item.id} 
                  onClick={() => openLightbox(index)}
                  className="relative group overflow-hidden bg-surface-container-low cursor-pointer break-inside-avoid"
                >
                  <img className="w-full h-auto object-cover border border-transparent group-hover:border-secondary/20 transition-all duration-300 transform group-hover:scale-105" alt={item.altText} src={item.imageUrl} />
                  <div className="absolute inset-0 bg-on-background/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary text-4xl font-light">zoom_in</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-on-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-surface-container-high text-on-surface px-3 py-1 font-label-caps text-[10px] uppercase tracking-widest">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <p className="font-body-lg text-on-surface-variant">No images found for this category.</p>
              </div>
            )}
          </>
        )}
      </section>

      <section className="bg-surface-container-low py-section-gap">
        <div className="px-margin-mobile md:px-gutter max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-headline-md text-on-background mb-4">The Art of Transformation</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">Witness the subtle yet powerful impact of professional artistry. We enhance natural beauty while maintaining an authentic, refined aesthetic.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-surface p-8 shadow-sm border-t-2 border-secondary/20">
            <div className="relative">
              <img className="w-full h-auto object-cover grayscale" alt="Before" src={portfolioImages.before} />
              <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur-sm px-4 py-2 border border-secondary/20">
                <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest">Before</span>
              </div>
            </div>
            <div className="relative">
              <img className="w-full h-auto object-cover" alt="After" src={portfolioImages.after} />
              <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm px-4 py-2">
                <span className="font-label-caps text-label-caps text-on-secondary uppercase tracking-widest">After</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-secondary transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          
          <button 
            className="absolute left-4 md:left-12 text-white hover:text-secondary transition-colors p-2"
            onClick={prevImage}
            aria-label="Previous"
          >
            <span className="material-symbols-outlined text-5xl">chevron_left</span>
          </button>
          
          <div className="max-w-[90vw] max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={filteredData[lightboxIndex].imageUrl} 
              alt={filteredData[lightboxIndex].altText} 
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white font-label-caps text-sm uppercase tracking-widest">{filteredData[lightboxIndex].category}</p>
            </div>
          </div>
          
          <button 
            className="absolute right-4 md:right-12 text-white hover:text-secondary transition-colors p-2"
            onClick={nextImage}
            aria-label="Next"
          >
            <span className="material-symbols-outlined text-5xl">chevron_right</span>
          </button>
        </div>
      )}
    </main>
  );
}
