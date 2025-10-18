# CareerLinks500

🚀 **Fortune 500 Career Directory** - A modern web application for searching Fortune 500 companies and tracking job applications.

## ✨ Features

- **🔍 Smart Search** - Find companies by name, industry, or location
- **📋 Job Tracking** - Track applications with status updates and Excel export
- **🔐 Authentication** - Secure login with personal dashboard
- **✏️ Company Management** - Add and edit company information
- **📱 Responsive Design** - Works on all devices
- **⚡ Fast Performance** - Optimized with caching and pagination

## 🛠️ Tech Stack

- **Frontend:** Vue 3 + TypeScript
- **Backend:** Supabase (PostgreSQL + Auth)
- **Build:** Vite
- **Export:** XLSX for Excel functionality

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Add your Supabase URL and key

# Start development
npm run dev
```

## 🗄️ Database Setup

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Run `database-schema.sql` and `job-tracking-schema.sql` in SQL Editor
3. Add credentials to `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎯 Key Features

### Job Tracking
- Track application status from referral to offer
- Add notes, positions, and referrer information
- Export all data to Excel with one click
- Archive old applications automatically

### Company Management
- Search 500+ Fortune companies
- Add new companies with career URLs
- Edit company details inline
- Fast search with real-time results



## 🚀 Deployment

```bash
npm run build
# Deploy dist/ folder to Vercel, Netlify, or any static host
```

## 📜 Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build





---

**Built with Vue 3 + Supabase**