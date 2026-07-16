# Luxe Beauty Portfolio

A premium, highly-performant luxury makeup artistry portfolio and content management system (CMS) built for Abhilasha Singh.

## 🚀 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Backend & Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Asset Storage**: Supabase Storage Buckets
- **Email Notifications**: Web3Forms API
- **SEO**: React Helmet Async

## ✨ Key Features

- **Dynamic Public Site**: Fully responsive portfolio, service listings, about page, and contact forms.
- **Integrated Blog**: Fully functional blogging engine with rich text rendering.
- **Admin CMS Portal**: Secure, authenticated admin dashboard to manage:
  - Portfolio Image Galleries (Uploads, Ordering, Visibility)
  - Blog Posts (Drafts, Scheduled, Published states)
  - Booking Inquiries (Status tracking, notes)
  - Client Testimonials
  - Global Site Settings (Contact info, hero copy, social links)
- **Enterprise-grade Security**: Supabase Row Level Security (RLS) ensures that only the authenticated admin can create, update, or delete data.
- **SEO Optimized**: Dynamic metadata, Open Graph, and Twitter card injection via React Helmet.

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- A Supabase Project
- A Web3Forms Access Key

### Environment Variables
Create a `.env` file in the root directory and add the following keys:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_WEB3FORMS_KEY=your_web3forms_access_key
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hemantjoshi04/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔒 Supabase Architecture
This project relies on Supabase for data persistence. The database schema includes tables for:
- `portfolio_items`
- `blog_posts`
- `bookings`
- `testimonials`
- `site_settings`

**Row Level Security (RLS)** is strictly enforced across all tables and storage buckets (`portfolio-images`, `blog-assets`), allowing `SELECT` queries for the public (where applicable) and locking all mutating operations to authenticated admin sessions.

## 📝 License
Proprietary software. All rights reserved.
