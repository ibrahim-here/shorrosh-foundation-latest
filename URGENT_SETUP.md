# 🚨 URGENT: Supabase Setup Required

## The Problem
Your forms are failing because Supabase environment variables are not configured!

## ✅ IMMEDIATE FIX NEEDED:

### Step 1: Create Environment File
Create a file named `.env` in your project root (same folder as `package.json`) with this content:

```
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Step 2: Get Your Supabase Credentials
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL** → Replace `your_supabase_project_url_here`
   - **anon public** key → Replace `your_supabase_anon_key_here`

### Step 3: Example .env File
```
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDU2Nzg5MCwiZXhwIjoxOTUwMTQzODkwfQ.example_signature_here
```

### Step 4: Restart Your Development Server
After creating the `.env` file:
```bash
npm run dev
```

## 🔧 Database Tables Required

Make sure these tables exist in your Supabase database:

### 1. `restaurants` table:
```sql
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  website TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. `partner-table` table:
```sql
CREATE TABLE "partner-table" (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Other tables (if not already created):
- `events`
- `auctions` 
- `sponsors`
- `donations`

## 🎯 Partner Page Navigation Fixed

I've also fixed the partner page navigation issue:
- ✅ Added smooth scroll to top when clicking "Become Our Partner"
- ✅ Added scroll to top when the partner page loads
- ✅ Improved scroll behavior with delays to ensure it works

## 🧪 Testing Steps

1. **Create the `.env` file** with your Supabase credentials
2. **Restart your development server**
3. **Open browser console** (F12) and look for:
   - "Supabase connection successful" ✅
   - "❌ Supabase environment variables not set!" ❌ (if still failing)
4. **Test restaurant addition** in admin panel
5. **Test partner form** submission

## 🚨 If Still Not Working

Check browser console for these specific errors:
- "Supabase connection failed:" - Wrong credentials
- "relation does not exist" - Missing tables
- "permission denied" - RLS policies blocking access

## 📞 Need Help?

If you're still having issues, share:
1. The exact error message from browser console
2. Your Supabase project URL (you can share this safely)
3. Whether the tables exist in your Supabase dashboard
