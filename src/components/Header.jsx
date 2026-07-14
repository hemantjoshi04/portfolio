import { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-surface dark:bg-surface-dim shadow-sm border-b border-secondary/20 top-0 transition-transform duration-300" id="main-nav">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-20">
        <Link to="/" className="font-headline-md text-[20px] md:text-headline-md text-secondary tracking-widest uppercase scale-95 duration-200 hover:opacity-80 truncate mr-4">
          {siteConfig.businessName}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-label-caps text-label-caps text-secondary font-bold border-b-2 border-secondary pb-1 scale-95 duration-200">Home</Link>
          <Link to="/about" className="font-label-caps text-label-caps text-on-surface-variant font-medium hover:text-secondary transition-colors duration-300 scale-95 duration-200">About</Link>
          <Link to="/services" className="font-label-caps text-label-caps text-on-surface-variant font-medium hover:text-secondary transition-colors duration-300 scale-95 duration-200">Services</Link>
          <Link to="/portfolio" className="font-label-caps text-label-caps text-on-surface-variant font-medium hover:text-secondary transition-colors duration-300 scale-95 duration-200">Portfolio</Link>
          <Link to="/blog" className="font-label-caps text-label-caps text-on-surface-variant font-medium hover:text-secondary transition-colors duration-300 scale-95 duration-200">Blog</Link>
          <Link to="/booking" className="font-label-caps text-label-caps text-on-surface-variant font-medium hover:text-secondary transition-colors duration-300 scale-95 duration-200">Booking</Link>
        </nav>

        {/* Trailing Action */}
        <div className="hidden md:block">
          <Link to="/booking" className="inline-flex items-center justify-center bg-onyx text-on-primary font-label-caps text-label-caps px-6 py-3 rounded hover:bg-gold hover:shadow-[inset_0_0_0_2px_#d4af37] transition-all duration-300 scale-95">
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-secondary p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className="material-symbols-outlined text-3xl select-none">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full bg-surface dark:bg-surface-dim border-b border-secondary/20 shadow-lg transition-all duration-300 ease-in-out origin-top overflow-hidden z-40 ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col py-4 px-margin-mobile">
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="py-4 font-label-caps text-label-caps text-secondary font-bold border-b border-outline-variant/20">Home</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/about" className="py-4 font-label-caps text-label-caps text-on-surface-variant font-medium border-b border-outline-variant/20">About</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/services" className="py-4 font-label-caps text-label-caps text-on-surface-variant font-medium border-b border-outline-variant/20">Services</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/portfolio" className="py-4 font-label-caps text-label-caps text-on-surface-variant font-medium border-b border-outline-variant/20">Portfolio</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/blog" className="py-4 font-label-caps text-label-caps text-on-surface-variant font-medium border-b border-outline-variant/20">Blog</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/booking" className="py-4 font-label-caps text-label-caps text-on-surface-variant font-medium">Booking</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/booking" className="mt-4 inline-flex items-center justify-center bg-onyx text-on-primary font-label-caps text-label-caps px-6 py-3 rounded">
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
