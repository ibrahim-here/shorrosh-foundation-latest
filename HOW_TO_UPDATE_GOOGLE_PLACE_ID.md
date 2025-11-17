# How to Update Your Google Place ID

## ✅ What We Just Added

I've added a "Leave Us a Review on Google" button to your website footer. It's visible on every page and styled to match your brand.

**Current Status:** The button is live but uses a placeholder Place ID (`YOUR_PLACE_ID_HERE`)

---

## 📍 Step 1: Get Your Place ID (After Verification Completes)

Once Google finishes processing your verification (1-5 days), you'll need to get your Place ID.

### Method 1: From Google Business Profile (Easiest)
1. Go to https://business.google.com
2. Click on your business "shorrosh-foundation"
3. Look at the URL or business details
4. Your Place ID will look like: `ChIJN1t_tDeuEmsRUsoyG83frY4`

### Method 2: Google Place ID Finder
1. Go to: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
2. Search for "Shorrosh Family Foundation" or your business address
3. Click on your business marker
4. Copy the Place ID shown

### Method 3: From Google Maps
1. Go to Google Maps (https://maps.google.com)
2. Search for your business
3. Click on your business listing
4. The Place ID is in the URL or you can right-click and select "What's here?"

---

## 🔧 Step 2: Update the Place ID in Your Code

Once you have your Place ID, you need to update it in one place:

### Open `src/App.jsx`

Find this line (around line 4920):
```javascript
href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID_HERE"
```

Replace `YOUR_PLACE_ID_HERE` with your actual Place ID:
```javascript
href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4"
```

**Example:**
```javascript
// BEFORE
href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID_HERE"

// AFTER (with your real Place ID)
href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4"
```

---

## 🚀 Step 3: Deploy the Update

After updating the Place ID:

1. Save the file
2. Commit your changes:
   ```bash
   git add src/App.jsx
   git commit -m "Update Google Place ID for review button"
   git push
   ```
3. Your hosting platform (Netlify/Vercel) will automatically redeploy

---

## ✨ What Happens Next

Once you update the Place ID:
- ✅ The button will redirect users to leave a Google review
- ✅ Works immediately - no API needed
- ✅ Opens in a new tab
- ✅ Users can leave reviews right away

---

## 🎯 Where the Button Appears

The "Leave Us a Review on Google" button appears in the footer on **every page** of your website:
- Home
- About
- Causes
- Events
- Auction
- Donate
- Store
- Veteran Business
- Updates
- Donation Items
- Restaurants

---

## 🧪 Testing the Button

### Before Updating Place ID:
- Button will show but link won't work properly
- You'll see a Google error page

### After Updating Place ID:
1. Click the button
2. Should open Google review page in new tab
3. Users can sign in and leave a review
4. Reviews appear on your Google Business Profile

---

## 📝 Notes

- **No API key needed** for the review button - it's just a direct link
- **No verification wait** - works as soon as you have your Place ID
- **Mobile friendly** - works on all devices
- **Prominent placement** - in the footer social media section

---

## 🆘 Troubleshooting

### Button doesn't work after updating Place ID
- Double-check the Place ID is correct (starts with `ChIJ`)
- Make sure you didn't accidentally delete any quotes or characters
- Verify the link format is exactly: `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`

### Can't find my Place ID
- Wait until verification completes (Google will email you)
- Try all three methods listed above
- Contact Google Business Support if needed

### Want to test before going live
- You can test with a different business's Place ID temporarily
- Just remember to replace it with yours before final deployment

---

## 🎉 That's It!

Once you update the Place ID, your review button is fully functional. Users can start leaving reviews immediately, helping build your online reputation and social proof!

**Questions?** Just ask!
