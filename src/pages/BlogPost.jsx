import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { blogService } from '../services/blogService';
import { blogImages } from '../data/images';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await blogService.getAll();
        if (res.success) {
          const published = res.data.filter(p => p.status === 'published');
          const found = published.find(p => p.slug === slug);
          if (found) {
            setPost(found);
            const related = published
              .filter(p => p.id !== found.id && p.category === found.category)
              .slice(0, 3);
            setRelatedPosts(related);
          } else {
            setError('Article not found');
          }
        } else {
          setError('Failed to load article.');
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <main className="pt-20 bg-surface min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="pt-20 bg-surface min-h-screen flex flex-col items-center justify-center px-margin-mobile md:px-gutter">
        <span className="material-symbols-outlined text-6xl text-error mb-4 opacity-80">error_outline</span>
        <h1 className="font-display-md text-on-background mb-4 text-center">{error || 'Article not found'}</h1>
        <Link to="/blog" className="font-label-caps text-label-caps text-on-primary bg-secondary px-8 py-3 uppercase tracking-widest hover:bg-on-background transition-colors duration-300 inline-block mt-4">
          Back to Blog
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-20 bg-surface">
      <SEO title={`${post.title} | Blog`} description={post.excerpt} url={`/blog/${post.slug}`} />
      
      <section className="py-section-gap px-margin-mobile md:px-gutter text-center max-w-4xl mx-auto">
        <span className="inline-block px-3 py-1 bg-tertiary-container text-on-tertiary-container font-label-caps text-label-caps mb-6 uppercase tracking-widest border border-tertiary-container/50">
          {post.category || 'Uncategorized'}
        </span>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-6">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-on-surface-variant">
          <span className="font-label-caps text-label-caps uppercase tracking-widest">{formatDate(post.publishedAt || post.updatedAt)}</span>
          <span className="w-1 h-1 bg-secondary rounded-full"></span>
          <span className="font-label-caps text-label-caps uppercase tracking-widest">{post.readingTime || 1} MIN READ</span>
        </div>
      </section>

      <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-16">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
          <img 
            src={post.coverImageUrl || blogImages.featured} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="px-margin-mobile md:px-gutter max-w-3xl mx-auto mb-section-gap">
        <div 
          className="font-body-lg text-on-surface-variant leading-relaxed [&>p]:mb-6 [&>h2]:font-headline-md [&>h2]:text-on-background [&>h2]:mb-4 [&>h2]:mt-12 [&>h3]:font-headline-sm [&>h3]:text-on-background [&>h3]:mb-4 [&>h3]:mt-8 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-6 [&>a]:text-secondary hover:[&>a]:text-on-background [&>a]:transition-colors"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-outline-variant/20">
            <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-on-background mb-4">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 border border-outline-variant rounded-full font-body-sm text-on-surface-variant">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {relatedPosts.length > 0 && (
        <section className="bg-surface-container-low py-24 px-margin-mobile md:px-gutter border-t border-outline-variant/20">
          <div className="max-w-container-max mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-headline-md text-headline-md text-on-background">Related Articles</h2>
              <Link to="/blog" className="font-label-caps text-label-caps text-secondary border-b border-secondary pb-1 hover:text-on-background hover:border-on-background transition-colors duration-300 uppercase tracking-widest hidden md:block">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {relatedPosts.map((rp, i) => (
                <article key={rp.id} className="flex flex-col group">
                  <Link to={`/blog/${rp.slug}`} className="block relative aspect-[4/5] overflow-hidden mb-6">
                    <img 
                      alt={rp.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      src={rp.coverImageUrl || Object.values(blogImages)[(i + 1) % Object.values(blogImages).length]} 
                    />
                  </Link>
                  <div className="flex-grow flex flex-col">
                    <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest">
                      {rp.category || 'Uncategorized'}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-background mb-3 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                      <Link to={`/blog/${rp.slug}`}>{rp.title}</Link>
                    </h3>
                  </div>
                  <div className="mt-auto border-t border-outline-variant/30 pt-4 flex justify-between items-center">
                    <span className="font-label-caps text-label-caps text-outline uppercase">
                      {formatDate(rp.publishedAt || rp.updatedAt)} • {rp.readingTime || 1} MIN
                    </span>
                    <Link to={`/blog/${rp.slug}`} className="font-label-caps text-label-caps text-on-background uppercase tracking-widest group-hover:text-secondary transition-colors duration-300">
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
