# CareerLinks500

🚀 **Fortune 500 Career Directory** - A modern web application for searching and managing Fortune 500 company career pages.

## ✨ Features

- **🔍 Smart Search** - Search companies by name, industry, or headquarters with debounced input
- **📊 Advanced Sorting** - Sort by company name or industry (A-Z, Z-A)
- **🔐 Authentication** - Secure email/password login with Supabase Auth
- **📋 Job Tracking** - Track application status (seeking referral, applied, interviewing, etc.)
- **👤 User Management** - Personal job application dashboard
- **🔒 Protected Routes** - Add company and job tracking require authentication
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **⚡ Performance Optimized** - 10-minute localStorage caching with smart invalidation
- **📄 Pagination** - Efficient browsing of large datasets (20 companies per page)
- **✏️ Inline Editing** - Edit company details directly in the list
- **🎨 Modern UI** - Clean, professional design inspired by Y Combinator
- **♿ Accessible** - Keyboard navigation and screen reader friendly

## 🛠️ Tech Stack

- **Frontend:** Vue 3 + TypeScript + Vue Router
- **Backend:** Supabase (PostgreSQL + Auth + Real-time)
- **Styling:** CSS3 with CSS Variables
- **Build Tool:** Vite
- **Code Quality:** ESLint + Prettier

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Supabase account

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd CareerLinks500

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Add your Supabase credentials to .env

# Start development server
npm run dev
```

## 🗄️ Database Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the database to be ready

### 2. Run Database Schema
```sql
-- Copy and run the contents of database-schema.sql in Supabase SQL Editor
-- Then run job-tracking-schema.sql for job tracking functionality
```

### 3. Configure Environment
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 Database Schema

```sql
companies (
  id: bigint (Primary Key)
  name: text (Required, Unique)
  career_url: text (Required)
  industry: text (Optional)
  headquarters: text (Optional)
  created_at: timestamp
  updated_at: timestamp
)

job_applications (
  id: bigint (Primary Key)
  user_id: uuid (Foreign Key to auth.users)
  company_id: bigint (Foreign Key to companies)
  status: text (seeking_referral, applied, interviewing, offer, rejected, withdrawn)
  position: text (Optional)
  notes: text (Optional)
  applied_date: date (Optional)
  created_at: timestamp
  updated_at: timestamp
)
```

## 🎯 Usage

### Authentication
- Sign up with email/password or sign in to existing account
- Access protected features like job tracking and adding companies

### Search Companies
- Browse companies on the homepage
- Type in the search bar to find companies by name, industry, or location
- Results update automatically with 300ms debounce
- Use sorting dropdown to organize results

### Job Tracking (Authenticated Users)
- Click the eye icon on any company to start tracking
- Visit "My Jobs" to manage application status
- Update status: Seeking Referral → Applied → Interviewing → Offer/Rejected
- Add notes and position details

### Add New Company (Authenticated Users)
- Navigate to "Add Company" (requires login)
- Fill required fields: Company Name and Career URL
- Optional: Add industry and headquarters

### Edit Company Details
- Click the edit icon (✏️) next to any company
- Modify details inline and save
- Changes are cached and reflected immediately

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Manual Deployment
```bash
npm run build
# Serve dist/ folder with any static file server
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Lint code with ESLint |
| `npm run format` | Format code with Prettier |

## 🏗️ Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── SearchBar.vue   # Search input with debouncing
│   ├── CompanyList.vue # Company display with job tracking
│   └── CompanyControls.vue # Sorting and pagination
├── composables/         # Vue composition functions
│   ├── useCompanies.ts # Companies state management
│   ├── useAuth.ts      # Authentication state
│   └── useJobTracking.ts # Job tracking state
├── pages/              # Route components
│   ├── SearchPage.vue  # Main search interface (homepage)
│   ├── AddCompanyPage.vue # Add company form (auth required)
│   ├── AuthPage.vue    # Sign in/up forms
│   └── JobTrackingPage.vue # Job applications dashboard
├── services/           # API layer
│   ├── companies.ts    # Company CRUD operations
│   ├── jobTracking.ts  # Job application operations
│   └── supabaseClient.ts # Supabase configuration
├── types/              # TypeScript definitions
│   ├── company.d.ts    # Company types
│   └── jobTracking.d.ts # Job tracking types
├── theme.ts            # Centralized theme configuration
└── router/             # Vue Router with auth guards
```

## 🔧 Configuration

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Caching Configuration
- **Cache Duration:** 10 minutes
- **Storage:** localStorage
- **Auto-invalidation:** On add/update operations
- **Fallback:** Graceful degradation if localStorage unavailable

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow Vue 3 Composition API patterns
- Maintain consistent formatting with Prettier
- Write meaningful commit messages

## 📝 License

This project is licensed under the MIT License.

## 🐛 Issues & Support

If you encounter any issues or have questions:
1. Check existing issues in the repository
2. Create a new issue with detailed description
3. Include steps to reproduce and expected behavior

---

**Built with ❤️ using Vue 3 and Supabase**