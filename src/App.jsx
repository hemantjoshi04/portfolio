import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Booking from './pages/Booking';

import { siteConfig } from './data/siteConfig';

function App() {
  useEffect(() => {
    document.title = `${siteConfig.businessName} | ${siteConfig.tagline}`;
  }, []);
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
        <FloatingWhatsApp />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
