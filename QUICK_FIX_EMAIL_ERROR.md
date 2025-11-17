# Quick Fix: Email Subscription Error

## Problem

You're seeing this error in the email modal:
```
Failed to subscribe. Please try again later.
```

## Root Cause

The `email_subscribers` table doesn't exist in your Supabase database yet. The SQL setup script hasn't been run.

---

## Solution: Run Database Setup

### Step 1: Open Supabase

1. Go to https://supabase.com/dashboard
2. Log in to your account
3. Select your project: **kgpzucxkbsaftoyybhqw**

### Step 2: Open SQL Editor

1. Click on **SQL Editor** in the left sidebar
2. Click **New Query** button

### Step 3: Run the Setup Script

1. Open the file `supabase-setup.sql` in your project
2. Copy ALL the SQL code (Ctrl+A, then Ctrl+C)
3. Paste it into the Supabase SQL Editor
4. Click the **Run** button (or press Ctrl+Enter)

### Step 4: Verify Success

You should see:
- ✅ "Database tables created successfully!" message
- ✅ A list showing 3 tables created

### Step 5: Verify Tables Exist

1. Go to **Table Editor** in Supabase (left sidebar)
2. You should now see these tables:
   - `email_subscribers`
   - `veteran_businesses`
   - `donation_items`

### Step 6: Test Again

1. Clear your browser's localStorage:
   - Open browser console (F12)
   - Type: `localStorage.clear()`
   - Press Enter
2. Refresh the website
3. The email modal should appear
4. Try subscribing again - it should work now!

---

## Alternative: Temporary Workaround

If you can't run the SQL script right now, you can temporarily disable the email modal:

### Option 1: Disable Modal Temporarily

In `src/App.jsx`, find this line (around line 1880):
```javascript
setShowEmailModal(true);
```

Change it to:
```javascript
setShowEmailModal(false);
```

This will prevent the modal from showing until the database is set up.

### Option 2: Skip Database Save (Testing Only)

You can modify the `handleEmailSubmit` function to skip the database save for testing:

```javascript
const handleEmailSubmit = async (email) => {
  try {
    console.log('Email submitted:', email);
    // Skip database save for now
    localStorage.setItem('emailModalShown', 'true');
    return Promise.resolve();
  } catch (err) {
    console.error('Error:', err);
    throw new Error('Failed to subscribe.');
  }
};
```

**Note**: This is only for testing. You'll lose the email data!

---

## Better Error Messages

I've updated the code to show more helpful error messages:

- ⚠️ "Database not ready. Please run supabase-setup.sql first."
- ⚠️ "Database permissions issue. Check RLS policies."
- ⚠️ "Database not configured. Please contact the administrator."

These will help you identify the exact issue.

---

## Troubleshooting

### Error: "relation does not exist"
**Solution**: The table hasn't been created. Run the SQL setup script.

### Error: "row-level security policy"
**Solution**: RLS policies aren't configured. The SQL script includes these - run it.

### Error: "permission denied"
**Solution**: Check that you're logged in as the project owner in Supabase.

### Modal doesn't appear at all
**Solution**: 
1. Clear localStorage: `localStorage.clear()`
2. Refresh the page
3. Wait 2 seconds for the modal to appear

---

## Quick Checklist

- [ ] Supabase account created
- [ ] Project exists (kgpzucxkbsaftoyybhqw)
- [ ] SQL Editor opened
- [ ] `supabase-setup.sql` script run
- [ ] Tables verified in Table Editor
- [ ] Browser localStorage cleared
- [ ] Website refreshed
- [ ] Email modal tested

---

## Need More Help?

1. Check browser console (F12) for detailed error messages
2. Verify your `.env` file has correct Supabase credentials
3. Make sure Supabase URL and key are correct
4. Check that you're using the correct project

---

## Expected Behavior After Fix

1. ✅ Modal appears 2 seconds after page load
2. ✅ Email can be entered
3. ✅ Submit button works
4. ✅ Success message shows
5. ✅ Facebook and Instagram links appear
6. ✅ Email is saved to Supabase
7. ✅ Modal doesn't appear again on refresh

---

**The fix is simple: Just run the SQL setup script in Supabase!**

See `DATABASE_SETUP_GUIDE.md` for detailed instructions.
