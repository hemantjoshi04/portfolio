import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { blogImages } from '../data/images';
import SEO from '../components/SEO';
import { blogService } from '../services/blogService';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await blogService.getAll();
        if (res.success) {
          setPosts(res.data.filter(p => p.status === 'published'));
        } else {
          setError('Failed to load articles. Please try again later.');
        }
      } catch (err) {
        setError('An unexpected error occurred while loading articles.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Reset to page 1 if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const filteredPosts = useMemo(() => {
    let result = posts;
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => {
        return (p.title && p.title.toLowerCase().includes(q)) ||
               (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
               (p.category && p.category.toLowerCase().includes(q)) ||
               (p.tags && p.tags.some(t => t.toLowerCase().includes(q)));
      });
    }
    
    return result.sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt);
      const dateB = new Date(b.updatedAt || b.createdAt);
      return dateB - dateA;
    });
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const remainingPosts = filteredPosts.slice(1);
  
  const totalPages = Math.max(1, Math.ceil(remainingPosts.length / postsPerPage));
  const currentListPosts = remainingPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const categories = ['All', 'Bridal', 'Editorial', 'Tutorial'];

  return (
    <main className="pt-20 bg-surface">
      <SEO title="Beauty Blog & News" url="/blog" />
      <section className="py-section-gap px-margin-mobile md:px-gutter text-center max-w-container-max mx-auto">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-4">Editorial Insights</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Elevating beauty through professional artistry, expert guides, and behind-the-scenes glimpses.</p>
      </section>

      {error ? (
        <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap py-20 text-center border border-error/20 bg-error/5">
          <p className="text-error font-body-lg">{error}</p>
        </section>
      ) : loading ? (
        <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap py-20 flex justify-center items-center">
          <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
        </section>
      ) : posts.length === 0 ? (
        <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap py-24 text-center border-y border-outline-variant/20">
          <span className="material-symbols-outlined text-4xl mb-4 opacity-50 block">article</span>
          <p className="font-body-lg text-on-surface-variant">No published articles yet.</p>
        </section>
      ) : (
        <>
          <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center border-y border-outline-variant/20 py-6">
              <div className="w-full md:w-64 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-lg">search</span>
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border border-outline-variant/50 rounded-full pl-10 pr-4 py-2 font-body-sm text-on-background focus:outline-none focus:border-secondary transition-colors"
                />
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`font-label-caps text-label-caps px-4 py-2 uppercase tracking-widest transition-colors duration-300 ${activeCategory === cat ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-secondary'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {filteredPosts.length === 0 ? (
            <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap py-12 text-center">
              <p className="font-body-lg text-on-surface-variant">No articles found matching your criteria.</p>
            </section>
          ) : (
            <>
              {featuredPost && (
                <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
                    <div className="md:col-span-8 relative aspect-[16/9] md:aspect-auto md:h-[600px] overflow-hidden group">
                      <img 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        src={featuredPost.coverImageUrl || blogImages.featured}
                      />
                      <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                    <div className="md:col-span-4 bg-surface p-8 md:p-12 md:-ml-16 relative z-10 border border-outline-variant/30 ambient-shadow">
                      <span className="inline-block px-3 py-1 bg-tertiary-container text-on-tertiary-container font-label-caps text-label-caps mb-4 uppercase tracking-widest border border-tertiary-container/50">
                        {featuredPost.category || 'Uncategorized'}
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-background mb-4 leading-tight">{featuredPost.title}</h2>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-label-caps text-label-caps text-outline uppercase">
                          {formatDate(featuredPost.publishedAt || featuredPost.updatedAt)} • {featuredPost.readingTime || 1} MIN READ
                        </span>
                        <Link to={`/blog/${featuredPost.slug}`} className="font-label-caps text-label-caps text-secondary uppercase tracking-widest border-b border-secondary pb-1 hover:text-on-background hover:border-on-background transition-colors duration-300">
                          Read Article
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {currentListPosts.length > 0 && (
                <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                    {currentListPosts.map((post, i) => (
                      <article key={post.id} className="flex flex-col group">
                        <Link to={`/blog/${post.slug}`} className="block relative aspect-[4/5] overflow-hidden mb-6">
                          <img 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            src={post.coverImageUrl || Object.values(blogImages)[(i + 1) % Object.values(blogImages).length]} 
                          />
                        </Link>
                        <div className="flex-grow flex flex-col">
                          <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest">
                            {post.category || 'Uncategorized'}
                          </span>
                          <h3 className="font-headline-sm text-headline-sm text-on-background mb-3 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>
                          <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-3 flex-grow">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="mt-auto border-t border-outline-variant/30 pt-4 flex justify-between items-center">
                          <span className="font-label-caps text-label-caps text-outline uppercase">
                            {formatDate(post.publishedAt || post.updatedAt)} • {post.readingTime || 1} MIN
                          </span>
                          <Link to={`/blog/${post.slug}`} className="font-label-caps text-label-caps text-on-background uppercase tracking-widest group-hover:text-secondary transition-colors duration-300">
                            Read More
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-16 flex justify-center items-center space-x-4">
                      <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors duration-300 disabled:opacity-50 disabled:hover:border-outline-variant disabled:hover:text-on-surface-variant cursor-pointer disabled:cursor-not-allowed">
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                        <button 
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`font-label-caps text-label-caps transition-colors duration-300 ${currentPage === pageNum ? 'text-on-background' : 'text-on-surface-variant hover:text-secondary'}`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors duration-300 disabled:opacity-50 disabled:hover:border-outline-variant disabled:hover:text-on-surface-variant cursor-pointer disabled:cursor-not-allowed">
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>
                  )}
                </section>
              )}
            </>
          )}
        </>
      )}

      <section className="bg-surface-container-low py-24 px-margin-mobile md:px-gutter border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-headline-md text-headline-md text-on-background mb-4">Join The Atelier</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">Subscribe to receive curated beauty insights, exclusive service updates, and editorial inspiration directly to your inbox.</p>
          <form className="flex flex-col md:flex-row gap-4 justify-center max-w-xl mx-auto">
            <div className="relative flex-grow">
              <input className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-3 font-body-md text-on-background placeholder-on-surface-variant/50 focus:ring-0 focus:border-secondary transition-colors duration-300 outline-none" id="email" placeholder="Your Email Address" type="email" />
            </div>
            <button className="bg-on-background text-on-primary font-label-caps text-label-caps px-8 py-3 uppercase tracking-widest hover:bg-secondary border border-transparent hover:border-secondary transition-all duration-300 whitespace-nowrap" type="button">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
