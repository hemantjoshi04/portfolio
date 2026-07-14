import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { homeImages, brandingImages } from '../data/images';
import { siteConfig } from '../data/siteConfig';
import { testimonialsData } from '../data/testimonials';
import { instagramPosts } from '../data/instagram';
import SEO from '../components/SEO';

export default function Home() {
  useEffect(() => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <main className="pt-20">
      <SEO title="Luxury Makeup Artistry" url="/" />
      <section className="relative w-full flex items-center justify-center overflow-hidden h-[70vh] md:h-[921px]">
        <div className="absolute inset-0 z-0">
          <div 
            className="bg-cover bg-no-repeat w-full h-full object-cover bg-[center_top] md:bg-center" 
            style={{ backgroundImage: `url('${homeImages.hero}')` }}
            title="A stunning high-fashion portrait of a woman with flawless, glowing makeup"
          ></div>
          <div className="absolute inset-0 bg-surface/30"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 md:grid-cols-12 gap-gutter text-center md:text-left">
          <div className="col-span-1 md:col-span-8 lg:col-span-6 flex flex-col items-center md:items-start fade-in-up">
            <span className="font-label-caps text-label-caps text-secondary mb-4 tracking-widest uppercase block">Refined Beauty</span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-onyx mb-6">
              Elevating Elegance <br/>Through Artistry
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-md mx-auto md:mx-0">
              Experience bespoke makeup artistry tailored for the modern romantic. Quiet luxury, flawless execution.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/booking" className="inline-flex items-center justify-center bg-onyx text-on-primary font-label-caps text-label-caps px-8 py-4 rounded hover:bg-gold hover:shadow-[inset_0_0_0_2px_#d4af37] transition-all duration-300">
                Book Now
              </Link>
              <Link to="/portfolio" className="inline-flex items-center justify-center bg-transparent text-onyx font-label-caps text-label-caps px-8 py-4 rounded gold-border-1px hover:bg-surface-variant transition-all duration-300">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-gap bg-soft-blush relative">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center text-center md:text-left">
            <div className="col-span-1 md:col-span-5 fade-in-up mb-10 md:mb-0">
              <div className="relative w-full aspect-[4/5] rounded overflow-hidden ambient-shadow">
                <img 
                  className="w-full h-full object-cover" 
                  alt="A candid, professional portrait of a chic female makeup artist" 
                  src={homeImages.artistPortrait}
                />
                <div className="absolute inset-0 border border-gold/30 m-4 rounded pointer-events-none"></div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-6 md:col-start-7 fade-in-up" style={{ transitionDelay: '0.2s' }}>
              <span className="font-label-caps text-label-caps text-secondary mb-4 tracking-widest uppercase block">The Artist</span>
              <h2 className="font-headline-md text-headline-md text-onyx mb-6">
                A Vision of <br/><i className="font-headline-md text-headline-md text-secondary">Quiet Luxury</i>
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-left">
                With over a decade of experience in high-fashion editorial and luxury bridal, I believe makeup should not mask, but reveal. My approach is rooted in enhancing natural architecture, utilizing a refined palette and meticulous technique.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 text-left">
                Every brushstroke is intentional, designed to create a timeless, ethereal glow that translates flawlessly from the naked eye to the camera lens.
              </p>
              <div className="flex justify-center md:justify-start">
                <img 
                  className="h-12 w-auto opacity-80 mix-blend-multiply" 
                  alt={`${siteConfig.businessName} signature`} 
                  src={brandingImages.signature}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-gap bg-surface-container-low relative">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16 fade-in-up">
            <span className="font-label-caps text-label-caps text-secondary mb-4 tracking-widest uppercase block">Client Love</span>
            <h2 className="font-headline-md text-headline-md text-onyx">Kind Words</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {testimonialsData.map((testimonial, i) => (
              <div key={testimonial.id} className="bg-surface p-8 ambient-shadow rounded-sm border-t-2 border-secondary/30 fade-in-up" style={{ transitionDelay: `${i * 0.2}s` }}>
                <div className="flex text-secondary mb-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <span key={index} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-onyx text-sm">{testimonial.clientName}</h4>
                  <span className="font-label-caps text-label-caps text-secondary/70 text-xs tracking-widest uppercase">{testimonial.service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16 fade-in-up">
            <span className="font-label-caps text-label-caps text-secondary mb-4 tracking-widest uppercase block">Expertise</span>
            <h2 className="font-headline-md text-headline-md text-onyx">Curated Services</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Service 1 */}
            <div className="bg-surface-container-lowest ambient-shadow rounded gold-border-top p-8 flex flex-col h-full fade-in-up group text-left">
              <div className="mb-6 overflow-hidden rounded aspect-[4/3]">
                <img 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  alt="Bridal Artistry" 
                  src={homeImages.bridalService}
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-onyx mb-3">Bridal Artistry</h3>
              <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-6">
                Bespoke bridal makeup tailored to withstand tears, time, and high-definition photography, ensuring you look effortlessly radiant.
              </p>
              <Link to="/services" className="font-label-caps text-label-caps text-secondary inline-flex items-center hover:opacity-70 transition-opacity uppercase tracking-widest">
                Explore <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </Link>
            </div>
            
            {/* Service 2 */}
            <div className="bg-surface-container-lowest ambient-shadow rounded gold-border-top p-8 flex flex-col h-full fade-in-up group text-left" style={{ transitionDelay: '0.2s' }}>
              <div className="mb-6 overflow-hidden rounded aspect-[4/3]">
                <img 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  alt="Editorial & Fashion" 
                  src={homeImages.editorialService}
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-onyx mb-3">Editorial &amp; Fashion</h3>
              <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-6">
                Avant-garde and precision makeup for print, runway, and commercial campaigns, executing the creative director's vision flawlessly.
              </p>
              <Link to="/services" className="font-label-caps text-label-caps text-secondary inline-flex items-center hover:opacity-70 transition-opacity uppercase tracking-widest">
                Explore <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </Link>
            </div>
            
            {/* Service 3 */}
            <div className="bg-surface-container-lowest ambient-shadow rounded gold-border-top p-8 flex flex-col h-full fade-in-up group text-left" style={{ transitionDelay: '0.4s' }}>
              <div className="mb-6 overflow-hidden rounded aspect-[4/3]">
                <img 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  alt="Special Occasion" 
                  src={homeImages.specialOccasionService}
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-onyx mb-3">Special Occasion</h3>
              <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-6">
                Elevated glamour for galas, red carpets, or private events. A sophisticated application designed to turn heads and last all night.
              </p>
              <Link to="/services" className="font-label-caps text-label-caps text-secondary inline-flex items-center hover:opacity-70 transition-opacity uppercase tracking-widest">
                Explore <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {siteConfig.social.instagram && (
        <section className="py-section-gap bg-surface-container-low border-t border-secondary/10">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <span className="font-label-caps text-label-caps text-secondary mb-2 tracking-widest uppercase block">Follow Along</span>
                <h2 className="font-headline-md text-headline-md text-onyx">@abhilasha_joshi_artistry</h2>
              </div>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="mt-6 md:mt-0 font-label-caps text-label-caps text-secondary flex items-center hover:opacity-70 transition-opacity">
                Follow on Instagram <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </a>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
              {instagramPosts.map((post, i) => (
                post.url ? (
                  <a 
                    key={i} 
                    href={post.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`block relative aspect-square overflow-hidden group ${i > 3 ? 'hidden lg:block' : ''}`}
                  >
                    <img src={post.image} alt="Instagram post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white">♥</span>
                    </div>
                  </a>
                ) : (
                  <div 
                    key={i} 
                    className={`block relative aspect-square overflow-hidden group ${i > 3 ? 'hidden lg:block' : ''}`}
                  >
                    <img src={post.image} alt="Instagram post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
