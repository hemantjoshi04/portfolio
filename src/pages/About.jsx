import { aboutImages, brandingImages } from '../data/images';
import { siteConfig } from '../data/siteConfig';
import { useSettings } from '../hooks/useSettings';
import SEO from '../components/SEO';

export default function About() {
  const settings = useSettings();
  return (
    <main className="flex-grow pt-20">
      <SEO title="About the Artist" url="/about" />
      {/* Hero / The Artist Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="md:col-span-5 md:col-start-2 relative">
          <div className="border border-secondary p-1">
            <div 
              className="bg-cover bg-center w-full aspect-[4/5] object-cover" 
              style={{ backgroundImage: `url('${aboutImages.hero}')` }}
              title="A refined, professional portrait of a female makeup artist"
            ></div>
          </div>
        </div>
        
        <div className="md:col-span-5 md:col-start-8 flex flex-col justify-center mt-12 md:mt-0">
          <h2 className="font-headline-sm text-headline-sm text-secondary mb-4 uppercase tracking-widest">The Artist</h2>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-8 leading-tight">
            Crafting Quiet <br/> Luxury.
          </h1>
          {settings.brandBio ? (
            <div className="font-body-lg text-body-lg text-on-surface-variant mb-10 space-y-6 whitespace-pre-wrap">
              {settings.brandBio}
            </div>
          ) : (
            <>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
                With over a decade of experience in high-fashion editorial and luxury bridal makeup, I believe in a philosophy of restraint. True beauty artistry isn't about masking features; it's about revealing them through refined techniques and premium formulations.
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
                My approach marries the precision of an atelier with the warmth of a personal consultation, ensuring every client leaves feeling like the most sophisticated version of themselves.
              </p>
            </>
          )}
          <div className="flex justify-center md:justify-start">
            <img 
              className="h-16 w-auto mix-blend-multiply opacity-90 dark:opacity-70 dark:invert mb-8" 
              alt={`${settings.brandName || siteConfig.businessName} signature`} 
              src={brandingImages.signature}
            />
          </div>
        </div>
      </section>

      {/* Expertise & Training */}
      <section className="bg-surface-container-low py-section-gap">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-headline-md text-on-background mb-4">Expertise &amp; Pedigree</h2>
            <div className="w-12 h-0.5 bg-secondary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-surface p-8 ambient-shadow gold-border-top flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6" style={{ fontVariationSettings: "'FILL' 0" }}>school</span>
              <h3 className="font-headline-sm text-headline-sm text-on-background mb-3">Master Certification</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Graduated with honors from the prestigious Val Garland School of Make-Up in London, specializing in advanced editorial techniques.
              </p>
            </div>
            
            <div className="bg-surface p-8 ambient-shadow gold-border-top flex flex-col items-center text-center mt-8 md:mt-0">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6" style={{ fontVariationSettings: "'FILL' 0" }}>diamond</span>
              <h3 className="font-headline-sm text-headline-sm text-on-background mb-3">Luxury Bridal</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Renowned for creating flawless, enduring looks for discerning brides, ensuring impeccable presentation from morning preparation to the final dance.
              </p>
            </div>
            
            <div className="bg-surface p-8 ambient-shadow gold-border-top flex flex-col items-center text-center mt-8 md:mt-0">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6" style={{ fontVariationSettings: "'FILL' 0" }}>brush</span>
              <h3 className="font-headline-sm text-headline-sm text-on-background mb-3">Editorial Artistry</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Regular contributor to high-fashion publications, adapting avant-garde concepts into wearable, sophisticated editorial beauty stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* My Kit Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-background mb-4">The Atelier Kit</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              I curate my kit with only the most exceptional products from legacy luxury houses, prioritizing performance, finish, and skin health.
            </p>
          </div>
          <div className="hidden md:block w-32 h-[1px] bg-outline-variant mb-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {/* Main Feature Image */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: `url('${aboutImages.kit1}')` }}
              title="Makeup flatlay"
            ></div>
            <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20"></div>
            <div className="absolute bottom-6 left-6">
              <span className="inline-block bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-caps text-label-caps px-3 py-1 mb-2 uppercase tracking-widest">Complexion</span>
              <h3 className="font-headline-sm text-headline-sm text-white drop-shadow-md">Flawless Foundations</h3>
            </div>
          </div>
          
          {/* Secondary Images */}
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden bg-surface-container">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: `url('${aboutImages.kit2}')` }}
            ></div>
            <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20"></div>
          </div>
          
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden bg-tertiary-container flex items-center justify-center p-6 text-center">
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-tertiary-container mb-2">Curated Brands</h4>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest leading-loose">
                Chanel<br/>Dior<br/>Tom Ford<br/>Charlotte Tilbury<br/>Cle de Peau
              </p>
            </div>
          </div>
          
          <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: `url('${aboutImages.kit3}')` }}
            ></div>
            <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
