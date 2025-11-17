# Database Setup Guide

## Step 1: Access Supabase SQL Editor

1. Go to https://supabase.com/dashboard
2. Select your project: **kgpzucxkbsaftoyybhqw**
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**

## Step 2: Run the SQL Script

1. Open the file `supabase-setup.sql` in this project
2. Copy all the SQL code
3. Paste it into the Supabase SQL Editor
4. Click **Run** button (or press Ctrl+Enter)

## Step 3: Verify Tables Were Created

After running the script, you should see:
- ✅ "Database tables created successfully!" message
- ✅ List of 3 tables: `email_subscribers`, `veteran_businesses`, `donation_items`

## Step 4: Check Tables in Table Editor

1. Go to **Table Editor** in Supabase dashboard
2. You should see these new tables:
   - `email_subscribers` - For email collection modal
   - `veteran_businesses` - For veteran business submissions
   - `donation_items` - For auction item donations

## What Was Created

### 1. email_subscribers Table
- Stores emails collected from the modal
- Tracks subscription source (modal, merchandise, etc.)
- Has active/inactive status

### 2. veteran_businesses Table
- Stores veteran-owned business submissions
- Includes business details and contact info
- Has status field (pending, approved, rejected)

### 3. donation_items Table
- Stores auction item donation requests
- Includes donor contact and item details
- Has status tracking

## Security (RLS Policies)

All tables have Row Level Security enabled with policies that:
- ✅ Allow public to INSERT (submit forms)
- ✅ Allow public to READ their own data
- ✅ Restrict admin operations to authenticated users

## Troubleshooting

### If you get "relation already exists" error:
This means the tables are already created. You can skip this step or drop the tables first:
```sql
DROP TABLE IF EXISTS email_subscribers CASCADE;
DROP TABLE IF EXISTS veteran_businesses CASCADE;
DROP TABLE IF EXISTS donation_items CASCADE;
```
Then run the setup script again.

### If you get permission errors:
Make sure you're logged in as the project owner in Supabase dashboard.

## Next Steps

After database setup is complete, the application will be able to:
1. ✅ Save emails from the collection modal
2. ✅ Store veteran business submissions
3. ✅ Record donation item requests
4. ✅ Display this data in the admin dashboard

---

**Status**: Run the SQL script in Supabase to complete database setup.
