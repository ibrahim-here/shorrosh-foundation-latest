# Supabase Connection Debug Guide

## Issues Fixed:

### 1. **Restaurant Addition Issues** ✅
- Added comprehensive error handling and logging
- Added Supabase connection checks
- Added detailed error messages to help identify the issue

### 2. **Partner Form Issues** ✅
- Added comprehensive error handling and logging
- Added Supabase connection checks
- Added detailed error messages to help identify the issue

### 3. **Partner Page Navigation** ✅
- Added scroll to top functionality when clicking "Become Our Partner" button
- Added scroll to top when the partner page loads

## Debugging Steps:

### Step 1: Check Environment Variables
Make sure you have a `.env` file in your project root with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 2: Check Browser Console
1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Look for these messages:
   - "Testing Supabase connection..."
   - "Supabase connection successful" (if working)
   - "Supabase connection failed:" (if not working)

### Step 3: Test Restaurant Addition
1. Go to Admin Dashboard
2. Try to add a restaurant
3. Check console for:
   - "Adding restaurant:" (shows form data)
   - "Inserting payload:" (shows data being sent)
   - "Restaurant added successfully:" (if successful)
   - "Supabase error:" (if failed)

### Step 4: Test Partner Form
1. Go to "Become Our Partner" page
2. Fill out the form and submit
3. Check console for:
   - "Submitting partner form:" (shows form data)
   - "Inserting partner data:" (shows data being sent)
   - "Partner application submitted successfully:" (if successful)
   - "Supabase error:" (if failed)

## Common Issues:

### 1. **Environment Variables Not Set**
- Error: "Supabase connection not available"
- Solution: Create `.env` file with correct values

### 2. **Wrong Table Names**
- Error: "relation does not exist"
- Solution: Check table names in Supabase dashboard
- Current expected tables: `restaurants`, `partner-table`, `events`, `auctions`, `sponsors`

### 3. **Permission Issues**
- Error: "permission denied"
- Solution: Check RLS (Row Level Security) policies in Supabase

### 4. **Network Issues**
- Error: "Failed to fetch"
- Solution: Check internet connection and Supabase URL

## Table Structure Expected:

### `restaurants` table:
- `id` (auto-generated)
- `name` (text)
- `description` (text)
- `image` (text, nullable)
- `website` (text)
- `created_at` (timestamp)

### `partner-table` table:
- `id` (auto-generated)
- `first_name` (text)
- `last_name` (text)
- `email` (text)
- `created_at` (timestamp)

## Next Steps:
1. Check browser console for error messages
2. Verify environment variables are set correctly
3. Check Supabase dashboard for table existence
4. Test the forms and report any specific error messages
