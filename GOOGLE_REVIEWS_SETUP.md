# Google Reviews Setup Guide

## Overview

The website now has a Google Reviews section on the homepage. Currently, it shows a placeholder with a "Coming Soon" message. Follow this guide to set up Google Business Profile and enable real reviews.

## Step 1: Create Google Business Profile

1. Go to https://business.google.com
2. Click "Manage now" or "Add your business"
3. Enter your business information:
   - **Business name**: Shorrosh Family Foundation
   - **Business category**: Non-profit organization / Charity
   - **Location**: Add your foundation's address
   - **Contact**: Add phone number and website

4. Verify your business (Google will send a verification code)

## Step 2: Get Your Place ID

Once your business is verified:

1. Go to https://developers.google.com/maps/documentation/places/web-service/place-id
2. Use the Place ID Finder tool
3. Search for "Shorrosh Family Foundation"
4. Copy your Place ID (it looks like: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

## Step 3: Set Up Google Places API (Optional - for automatic reviews)

If you want to automatically fetch and display reviews:

1. Go to https://console.cloud.google.com
2. Create a new project or select existing one
3. Enable "Places API"
4. Create API credentials (API Key)
5. Restrict the API key to your website domain

## Step 4: Update the Website Code

### Option A: Keep Placeholder (Recommended for now)
The current placeholder is fine until you have reviews. It encourages people to find you on Google.

### Option B: Add Manual Reviews
You can manually add testimonials to the website:

```javascript
const reviews = [
  {
    id: 1,
    author: "John Doe",
    rating: 5,
    text: "Amazing foundation doing great work!",
    date: "2025-01-15"
  }
];
```

### Option C: Integrate Google Places API
Once you have your API key and Place ID, update the code:

```javascript
// Add to .env file
VITE_GOOGLE_PLACES_API_KEY=your_api_key_here
VITE_GOOGLE_PLACE_ID=your_place_id_here

// The code is already structured to support this
// Just uncomment the API integration section
```

## Step 5: Encourage Reviews

Once your Google Business Profile is live:

1. Share your Google Business Profile link with supporters
2. Add "Leave a Review" buttons throughout the website
3. Send follow-up emails to partners asking for reviews
4. Display QR codes at events linking to your review page

## Current Implementation

The website currently shows:
- ⭐ Star icon
- "Reviews Coming Soon!" message
- Link to find you on Google
- Call-to-action to become a partner
- Note to check back later

## Benefits of Google Reviews

- **Trust Building**: Show social proof to potential donors
- **SEO**: Improve search engine rankings
- **Engagement**: Encourage community interaction
- **Feedback**: Learn what supporters value most

## Next Steps

1. ✅ Create Google Business Profile
2. ✅ Verify your business
3. ✅ Get your Place ID
4. ⏳ Collect initial reviews from partners
5. ⏳ Update website with real reviews (optional)

## Support

If you need help setting up Google Business Profile:
- Google Business Profile Help: https://support.google.com/business
- Contact: support@google.com

---

**Note**: The placeholder design is professional and encourages engagement. You can keep it until you have 5-10 reviews to display.
