import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Booking from './pages/Booking';

import { siteConfig } from './data/siteConfig';
import ErrorBoundary from './components/ErrorBoundary';

// Admin Imports
import { AuthProvider } from './admin/auth/AuthContext';
import ProtectedRoute from './admin/auth/ProtectedRoute';
import AuthLayout from './admin/layouts/AuthLayout';
import AdminLayout from './admin/layouts/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import Dashboard from './admin/pages/Dashboard';
import PortfolioManager from './admin/pages/PortfolioManager';
import BookingRequests from './admin/pages/BookingRequests';
import SiteSettings from './admin/pages/SiteSettings';
import TestimonialManager from './admin/pages/TestimonialManager';
import BlogManager from './admin/pages/BlogManager';
const PublicLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <Outlet />
    <FloatingWhatsApp />
    <Footer />
  </div>
);

function App() {
  useEffect(() => {
    document.title = `${siteConfig.businessName} | ${siteConfig.tagline}`;
  }, []);
  
  return (
    <ErrorBoundary>
      <Router>
      <AuthProvider>
        <Routes>
          {/* Public Website */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/booking" element={<Booking />} />
          </Route>

          {/* Admin Portal */}
          <Route path="/admin" element={<AuthLayout><AdminLogin /></AuthLayout>} />
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/portfolio" element={<PortfolioManager />} />
            <Route path="/admin/blog" element={<BlogManager />} />
            <Route path="/admin/bookings" element={<BookingRequests />} />
            <Route path="/admin/settings" element={<SiteSettings />} />
            <Route path="/admin/testimonials" element={<TestimonialManager />} />
            {/* Catch unknown admin routes */}
            <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
