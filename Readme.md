# CareerLinks500

Fortune 500 career page directory. Search companies and add career links.

**Tech Stack:** Vue 3 + TypeScript + Supabase

## Setup

```bash
npm install
cp .env.example .env  # Add your Supabase credentials
npm run dev
```

## Supabase Setup

1. Create a new Supabase project
2. Run the SQL from `database-schema.sql` in Supabase SQL editor
3. Add your credentials to `.env`

## Database Schema

The enhanced schema includes:
- Company name, career URL (required)
- Industry, headquarters (optional)
- Timestamps and unique constraints
- Sample Fortune 500 data

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build locally
- `npm run lint` - Lint code
- `npm run format` - Format code