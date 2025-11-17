# Google Reviews Integration Guide

## 🎯 What You Need

To show Google reviews on your website and let people leave reviews, you need:

1. **Place ID** - Unique identifier for your business
2. **Review Link** - Direct link for leaving reviews
3. **Google Business Profile** - Already created ✅

---

## Step 1: Get Your Place ID

### Method A: Using Google's Place ID Finder (Easiest)

1. Go to: https://developers.google.com/maps/documentation/places/web-service/place-id
2. Scroll down to "Place ID Finder"
3. In the search box, type: **"Shorrosh Family Foundation"**
4. Click on your business when it appears
5. Copy the **Place ID** (looks like: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

### Method B: From Google Maps URL

1. Go to Google Maps: https://www.google.com/maps
2. Search for your business
3. Look at the URL - it contains your Place ID
4. Example URL: `https://www.google.com/maps/place/.../@...data=!4m2!3m1!1s0x...`
5. The Place ID is after `1s` in the URL

### Method C: From Google Business Profile

1. Go to your Google Business Profile dashboard
2. Click on your business
3. Look for "Place ID" in the business information
4. Copy it

---

## Step 2: Get Your Review Link

### Option A: Short Review Link (Recommended)

1. Go to your Google Business Profile dashboard
2. Click "Get more reviews" or "Share review form"
3. Copy the short link (looks like: `https://g.page/r/CabcdefGHIJKLMN/review`)

### Option B: Construct Review Link Manually

Use this format:
```
https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID_HERE
```

Replace `YOUR_PLACE_ID_HERE` with your actual Place ID.

**Example:**
```
https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4
```

---

## Step 3: Update Your Website Code

### Update the Review Links

Open `src/App.jsx` and find this line (around line 3695):

```javascript
href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID_HERE"
```

**Replace with your actual link:**
```javascript
href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4"
```

Or use your short link:
```javascript
href="https://g.page/r/CabcdefGHIJKLMN/review"
```

### Update the View All Reviews Link

Find this line (around line 3703):

```javascript
href="https://www.google.com/maps/search/?api=1&query=Shorrosh+Family+Foundation"
```

**Replace with your Google Maps link:**
```javascript
href="https://www.google.com/maps/place/Shorrosh+Family+Foundation/@YOUR_COORDINATES"
```

---

## Step 4: Display Real Reviews (3 Options)

### Option A: Manual Reviews (Easiest - No API Needed)

Add reviews manually to your website. I'll create a component for you:

<function_calls>
<invoke name="strReplace">
<parameter name="oldStr">            {/* Embedded Google Reviews (Manual Display) */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bold text-lg text-blue-900 mb-4 text-center">Recent Reviews</h4>
              <p className="text-gray-600 text-center text-sm mb-4">
                Reviews will appear here once you receive them on Google
              </p>
              
              {/* Instructions for embedding */}
              <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
                <p className="font-semibold mb-2">📝 To display reviews:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Get reviews on your Google Business Profile</li>
                  <li>Use Google Places API or embed widget</li>
                  <li>Or manually add testimonials here</li>
                </ol>
              </div>
            </div>