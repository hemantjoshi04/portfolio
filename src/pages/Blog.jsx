import { blogImages } from '../data/images';
import SEO from '../components/SEO';

export default function Blog() {
  const posts = [
    {
      title: "Curating the Perfect Minimalist Vanity",
      category: "Product Reviews",
      excerpt: "Essential luxury products that deliver maximum impact with minimal effort.",
      date: "Sep 28, 2024",
      image: blogImages.post1
    },
    {
      title: "Preparing for Paris Fashion Week",
      category: "Behind the Scenes",
      excerpt: "A diary of the chaotic beauty and precision required for international editorial shows.",
      date: "Sep 15, 2024",
      image: blogImages.post2
    },
    {
      title: "The Secret to 'No Makeup' Makeup",
      category: "Beauty Tips",
      excerpt: "Mastering the art of undetectable enhancement for an effortless, everyday elegance.",
      date: "Sep 02, 2024",
      image: blogImages.post3
    },
    {
      title: "Selecting Your Bridal Palette",
      category: "Bridal Guide",
      excerpt: "Harmonizing your makeup tones with your gown, venue, and personal style.",
      date: "Aug 20, 2024",
      image: blogImages.post4
    }
  ];

  return (
    <main className="pt-20 bg-surface">
      <SEO title="Beauty Blog & News" url="/blog" />
      <section className="py-section-gap px-margin-mobile md:px-gutter text-center max-w-container-max mx-auto">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-4">Editorial Insights</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Elevating beauty through professional artistry, expert guides, and behind-the-scenes glimpses.</p>
      </section>

      <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-8 relative aspect-[16/9] md:aspect-auto md:h-[600px] overflow-hidden group">
            <img 
              alt="Featured post" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src={blogImages.featured}
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
          <div className="md:col-span-4 bg-surface p-8 md:p-12 md:-ml-16 relative z-10 border border-outline-variant/30 ambient-shadow">
            <span className="inline-block px-3 py-1 bg-tertiary-container text-on-tertiary-container font-label-caps text-label-caps mb-4 uppercase tracking-widest border border-tertiary-container/50">Bridal Guide</span>
            <h2 className="font-headline-md text-headline-md text-on-background mb-4 leading-tight">The Timeless Bridal Glow: A Comprehensive Guide</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">Discover the essential steps to achieving a flawless, enduring bridal look that translates beautifully both in person and on camera, focusing on skin preparation and minimalist techniques.</p>
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-outline uppercase">Oct 12, 2024</span>
              <a className="font-label-caps text-label-caps text-secondary uppercase tracking-widest border-b border-secondary pb-1 hover:text-on-background hover:border-on-background transition-colors duration-300" href="#">Read Article</a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-16">
        <div className="flex flex-wrap gap-4 justify-center border-y border-outline-variant/20 py-6">
          <button className="font-label-caps text-label-caps px-4 py-2 text-secondary border-b-2 border-secondary uppercase tracking-widest transition-colors duration-300">All</button>
          <button className="font-label-caps text-label-caps px-4 py-2 text-on-surface-variant hover:text-secondary uppercase tracking-widest transition-colors duration-300">Beauty Tips</button>
          <button className="font-label-caps text-label-caps px-4 py-2 text-on-surface-variant hover:text-secondary uppercase tracking-widest transition-colors duration-300">Bridal Guide</button>
          <button className="font-label-caps text-label-caps px-4 py-2 text-on-surface-variant hover:text-secondary uppercase tracking-widest transition-colors duration-300">Behind the Scenes</button>
          <button className="font-label-caps text-label-caps px-4 py-2 text-on-surface-variant hover:text-secondary uppercase tracking-widest transition-colors duration-300">Product Reviews</button>
        </div>
      </section>

      <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {posts.map((post, i) => (
            <article key={i} className="flex flex-col group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <img alt={`Blog post ${i+1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={post.image} />
              </div>
              <div className="flex-grow">
                <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest">{post.category}</span>
                <h3 className="font-headline-sm text-headline-sm text-on-background mb-3 group-hover:text-secondary transition-colors duration-300">{post.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">{post.excerpt}</p>
              </div>
              <div className="mt-auto border-t border-outline-variant/30 pt-4 flex justify-between items-center">
                <span className="font-label-caps text-label-caps text-outline uppercase">{post.date}</span>
                <span className="font-label-caps text-label-caps text-on-background uppercase tracking-widest group-hover:text-secondary transition-colors duration-300">Read More</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center items-center space-x-4">
          <button className="w-10 h-10 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors duration-300">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <span className="font-label-caps text-label-caps text-on-background">1</span>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary transition-colors duration-300" href="#">2</a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary transition-colors duration-300" href="#">3</a>
          <button className="w-10 h-10 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors duration-300">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </section>

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
