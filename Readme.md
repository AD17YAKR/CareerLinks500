# CareerLinks500

🚀 **Fortune 500 Career Directory** - A modern web application for searching and managing Fortune 500 company career pages.

## ✨ Features

- **🔍 Smart Search** - Search companies by name, industry, or headquarters with debounced input
- **📊 Advanced Sorting** - Sort by company name or industry (A-Z, Z-A)
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **⚡ Performance Optimized** - 10-minute localStorage caching with smart invalidation
- **📄 Pagination** - Efficient browsing of large datasets (20 companies per page)
- **✏️ Inline Editing** - Edit company details directly in the list
- **🎨 Modern UI** - Glass morphism design with smooth animations
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
```

## 🎯 Usage

### Search Companies
- Type in the search bar to find companies by name, industry, or location
- Results update automatically with 300ms debounce
- Use sorting dropdown to organize results

### Add New Company
- Click "Add Company" in navigation
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
│   ├── CompanyList.vue # Company display with editing
│   └── CompanyControls.vue # Sorting and pagination
├── composables/         # Vue composition functions
│   └── useCompanies.ts # Companies state management
├── pages/              # Route components
│   ├── SearchPage.vue  # Main search interface
│   └── AddCompanyPage.vue # Add company form
├── services/           # API layer
│   ├── companies.ts    # Company CRUD operations
│   └── supabaseClient.ts # Supabase configuration
├── types/              # TypeScript definitions
└── router/             # Vue Router configuration
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