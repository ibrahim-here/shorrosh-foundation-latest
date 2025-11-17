# Google Reviews Implementation Guide

## Overview
This guide covers implementing both the "Leave a Review" redirect button and the reviews fetching/display functionality for the Shorrosh Family Foundation website.

## Current Status
✅ Google Business Profile verification in progress (up to 5 days)
✅ Can implement redirect button NOW (works immediately)
✅ Can implement reviews fetching NOW (will work once verification completes)

---

## Part 1: "Leave a Review" Button (Works Immediately)

### Step 1: Get Your Place ID

Once your Google Business Profile is verified, you'll need your Place ID:

**Method 1: From Google Business Profile**
1. Go to https://business.google.com
2. Select your business
3. Look in the URL or business details for the Place ID

**Method 2: Place ID Finder**
1. Go to https://developers.google.com/maps/documentation/places/web-service/place-id
2. Search for "Shorrosh Family Foundation"
3. Copy the Place ID

**Method 3: From Google Maps**
1. Search for your business on Google Maps
2. Right-click on your business marker
3. The Place ID will be in the details

### Step 2: Create the Review Link

The direct review link format is:
```
https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
```

Example:
```
https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4
```

### Step 3: Add to Your Website

```jsx
const GOOGLE_PLACE_ID = "YOUR_PLACE_ID_HERE";
const REVIEW_LINK = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

<a 
  href={REVIEW_LINK}
  target="_blank"
  rel="noopener noreferrer"
  className="btn-primary"
>
  Leave Us a Review on Google ⭐
</a>
```

**This works immediately** - no API needed, no verification wait!

---

## Part 2: Fetch & Display Reviews (Works After Verification)

### Step 1: Enable Google Places API

1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Enable "Places API"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Restrict the API key:
   - Application restrictions: HTTP referrers
   - Add your website domain
   - API restrictions: Places API only

### Step 2: Set Up Environment Variables

Create `.env` file:
```env
REACT_APP_GOOGLE_PLACE_ID=your_place_id_here
REACT_APP_GOOGLE_API_KEY=your_api_key_here
```

### Step 3: Create Backend API Endpoint

**Why Backend?** Direct browser calls to Google Places API are blocked by CORS.

**Option A: Netlify Function** (if using Netlify)

Create `netlify/functions/google-reviews.js`:
```javascript
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const API_KEY = process.env.GOOGLE_API_KEY;
  
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK') {
      return {
        statusCode: 200,
        body: JSON.stringify({
          reviews: data.result.reviews || [],
          rating: data.result.rating,
          totalRatings: data.result.user_ratings_total
        })
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: data.status })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

**Option B: Vercel Function** (if using Vercel)

Create `api/google-reviews.js`:
```javascript
export default async function handler(req, res) {
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const API_KEY = process.env.GOOGLE_API_KEY;
  
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK') {
      res.status(200).json({
        reviews: data.result.reviews || [],
        rating: data.result.rating,
        totalRatings: data.result.user_ratings_total
      });
    } else {
      res.status(500).json({ error: data.status });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### Step 4: Create React Component

```jsx
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const GoogleReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const PLACE_ID = process.env.REACT_APP_GOOGLE_PLACE_ID;
  const REVIEW_LINK = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;
  const VIEW_ALL_LINK = `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;
  
  useEffect(() => {
    fetchReviews();
  }, []);
  
  const fetchReviews = async () => {
    try {
      // Check cache first (24 hour cache)
      const cached = localStorage.getItem('google_reviews');
      const cacheTime = localStorage.getItem('google_reviews_time');
      
      if (cached && cacheTime) {
        const age = Date.now() - parseInt(cacheTime);
        if (age < 24 * 60 * 60 * 1000) { // 24 hours
          const data = JSON.parse(cached);
          setReviews(data.reviews);
          setRating(data.rating);
          setTotalRatings(data.totalRatings);
          setLoading(false);
          return;
        }
      }
      
      // Fetch from API
      const response = await fetch('/.netlify/functions/google-reviews'); // or '/api/google-reviews' for Vercel
      const data = await response.json();
      
      if (response.ok) {
        setReviews(data.reviews);
        setRating(data.rating);
        setTotalRatings(data.totalRatings);
        
        // Cache the results
        localStorage.setItem('google_reviews', JSON.stringify(data));
        localStorage.setItem('google_reviews_time', Date.now().toString());
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={20}
        fill={i < Math.floor(rating) ? '#FFD700' : 'none'}
        stroke={i < Math.floor(rating) ? '#FFD700' : '#ccc'}
      />
    ));
  };
  
  return (
    <section className="google-reviews-section">
      <div className="container">
        <h2>What Our Community Says</h2>
        
        {/* Overall Rating */}
        {rating > 0 && (
          <div className="overall-rating">
            <div className="stars">{renderStars(rating)}</div>
            <p>{rating.toFixed(1)} out of 5 stars ({totalRatings} reviews)</p>
          </div>
        )}
        
        {/* Leave a Review Button - Always visible */}
        <div className="review-cta">
          <a 
            href={REVIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Leave Us a Review on Google ⭐
          </a>
        </div>
        
        {/* Reviews Display */}
        {loading ? (
          <div className="loading">Loading reviews...</div>
        ) : error ? (
          <div className="error">
            <p>Unable to load reviews at this time.</p>
            <a href={VIEW_ALL_LINK} target="_blank" rel="noopener noreferrer">
              View our reviews on Google
            </a>
          </div>
        ) : reviews.length > 0 ? (
          <div className="reviews-grid">
            {reviews.slice(0, 6).map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <img 
                    src={review.profile_photo_url} 
                    alt={review.author_name}
                    className="reviewer-photo"
                  />
                  <div>
                    <h4>{review.author_name}</h4>
                    <div className="stars">{renderStars(review.rating)}</div>
                    <p className="review-date">
                      {new Date(review.time * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="review-text">
                  {review.text.length > 150 
                    ? `${review.text.substring(0, 150)}...` 
                    : review.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-reviews">
            <p>Be the first to review us on Google!</p>
            <p>We're building our presence and would love your feedback.</p>
          </div>
        )}
        
        {/* View All Link */}
        {reviews.length > 0 && (
          <div className="view-all">
            <a href={VIEW_ALL_LINK} target="_blank" rel="noopener noreferrer">
              View All Reviews on Google →
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
```

### Step 5: Add Styling

```css
.google-reviews-section {
  padding: 60px 0;
  background: #f8f9fa;
}

.google-reviews-section h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
}

.overall-rating {
  text-align: center;
  margin-bottom: 30px;
}

.overall-rating .stars {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 10px;
}

.review-cta {
  text-align: center;
  margin: 40px 0;
}

.review-cta .btn-primary {
  display: inline-block;
  padding: 15px 40px;
  background: #dc3545;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background 0.3s;
}

.review-cta .btn-primary:hover {
  background: #c82333;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 40px 0;
}

.review-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.review-header {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.reviewer-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.review-header h4 {
  margin: 0 0 5px 0;
  font-size: 1rem;
}

.review-date {
  font-size: 0.85rem;
  color: #666;
  margin: 5px 0 0 0;
}

.review-text {
  color: #333;
  line-height: 1.6;
}

.no-reviews {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
}

.view-all {
  text-align: center;
  margin-top: 30px;
}

.view-all a {
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
}

.view-all a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Implementation Timeline

### NOW (While Waiting for Verification)
1. ✅ Set up component structure
2. ✅ Add "Leave a Review" button with placeholder Place ID
3. ✅ Add "View All Reviews" link
4. ✅ Create backend API endpoint
5. ✅ Implement reviews fetching logic
6. ✅ Add placeholder UI for when no reviews exist

### AFTER Verification (1-5 days)
1. ✅ Get your Place ID from Google Business Profile
2. ✅ Update environment variables with real Place ID
3. ✅ Enable Google Places API in Cloud Console
4. ✅ Get API key and add to environment variables
5. ✅ Test reviews fetching
6. ✅ Reviews will automatically display once available

---

## Testing Checklist

- [ ] "Leave a Review" button opens correct Google page
- [ ] Button opens in new tab
- [ ] "View All Reviews" link works
- [ ] Reviews fetch from API successfully
- [ ] Reviews display correctly with stars, names, dates
- [ ] Caching works (check localStorage)
- [ ] Placeholder shows when no reviews exist
- [ ] Error handling works if API fails
- [ ] Mobile responsive design
- [ ] Loading state displays properly

---

## Troubleshooting

### "Leave a Review" button doesn't work
- Check that Place ID is correct
- Verify Google Business Profile is verified
- Try the link directly in browser

### Reviews not fetching
- Check API key is valid and not restricted
- Verify Places API is enabled in Cloud Console
- Check backend function logs for errors
- Verify Place ID is correct
- Check CORS settings if using custom backend

### No reviews showing
- Verify your business has reviews on Google
- Check API response in browser dev tools
- Verify reviews field is requested in API call
- Check cache - clear localStorage and retry

---

## Cost Considerations

Google Places API pricing (as of 2024):
- Place Details: $17 per 1,000 requests
- First $200/month is FREE (covers ~11,700 requests)
- With caching (24 hours), you'll likely stay in free tier

**Recommendation**: Implement 24-hour caching to minimize API calls.

---

## Next Steps

1. **Immediate**: Implement the component with placeholder Place ID
2. **Wait**: For Google verification (1-5 days)
3. **After verification**: Get Place ID and update environment variables
4. **Enable API**: Set up Google Cloud Console and Places API
5. **Test**: Verify everything works end-to-end
6. **Monitor**: Check API usage in Google Cloud Console

---

## Questions?

If you need help with any step, just ask! The key thing is:
- **Review button works NOW** (once you have Place ID)
- **Reviews display works AFTER verification** (once API is set up)

Both can be coded and deployed now - they'll just activate once you complete the Google setup steps.
