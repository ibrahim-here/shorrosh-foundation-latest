# Design Document

## Overview

This design document outlines the technical approach for implementing the Shorrosh Family Foundation website enhancements. The implementation focuses on user engagement through email collection, merchandise preview, veteran support, donation facilitation, and social proof through Google reviews.

## Architecture

### Component Structure

```
App.jsx
├── EmailCollectionModal (new)
├── MerchandiseStorePage (new)
├── VeteranBusinessSection (new)
├── DonationItemsSection (new)
├── RestaurantPartnershipSection (new)
├── GoogleReviewsSection (new)
├── EnhancedPartnerBenefits (modified)
└── SocialMediaIntegration (enhanced)
```

### Data Flow

1. **Email Collection**: Modal → Supabase `email_subscribers` table → localStorage flag
2. **Merchandise**: Static page with coming soon content
3. **Veteran Business**: Contact form → Supabase `veteran_businesses` table
4. **Google Reviews**: External API or embedded widget → Display component
5. **Newsletter Removal**: Remove `NewsletterSection` component from all pages

## Components and Interfaces

### 1. EmailCollectionModal Component

**Purpose**: Capture user emails on first visit and promote social media following

**Props**:
```javascript
{
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (email: string) => Promise<void>
}
```

**State**:
```javascript
{
  email: string,
  showSocialLinks: boolean,
  isSubmitting: boolean,
  error: string | null
}
```

**Features**:
- Full-screen overlay with centered modal
- Email input with validation
- Submit button
- Close/dismiss button
- Social media links (shown after email submission)
- Promotional text about discounts and promos
- localStorage check to prevent repeated display

**UI Design**:
- Gradient background overlay (semi-transparent)
- White card with shadow
- Foundation logo at top
- Catchy headline: "Join Our Community & Get Exclusive Benefits!"
- Subtext: "Subscribe for special discounts, promos, and updates"
- Email input field
- Submit button (red/blue theme)
- After submission: Social media icons with "Follow us for more!" message
- Close icon (X) in top-right corner

### 2. MerchandiseStorePage Component

**Purpose**: Display coming soon merchandise with preview

**Route**: `/store` or `/merchandise`

**Sections**:
1. Hero section with "Coming Soon" banner
2. Product preview grid (4 items):
   - T-shirts
   - Cups/Mugs
   - Pins
   - Keychains
3. Description of how purchases support the foundation
4. Email notification signup for launch announcement
5. Call-to-action to donate while waiting

**UI Design**:
- Hero with gradient background
- Product cards with placeholder images
- "Coming Soon" badges on each product
- Pricing: "TBA" or "Coming Soon"
- Interest form at bottom

### 3. VeteranBusinessSection Component

**Purpose**: Promote veteran-owned business support program

**Location**: New page or section on homepage/causes page

**Content**:
- Headline: "Supporting Veteran-Owned Businesses"
- Description of program benefits
- Contact form or email link
- Success stories (if available)
- Call-to-action button

**Form Fields**:
```javascript
{
  businessName: string,
  ownerName: string,
  email: string,
  phone: string,
  businessWebsite: string,
  businessDescription: string,
  veteranBranch: string
}
```

**Database Table**: `veteran_businesses`
```sql
CREATE TABLE veteran_businesses (
  id SERIAL PRIMARY KEY,
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  description TEXT,
  veteran_branch TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. DonationItemsSection Component

**Purpose**: Explain item donation process for auctions

**Location**: Dedicated page or section on auction/donate page

**Content**:
- Headline: "Donate Items for Our Auctions"
- Upcoming auction information (January)
- Types of items accepted
- Contact information
- Form to express interest
- Restaurant partnership mention (Denny's program)

**Contact Form Fields**:
```javascript
{
  name: string,
  email: string,
  phone: string,
  itemDescription: string,
  estimatedValue: number,
  itemImages: File[]
}
```

**Database Table**: `donation_items`
```sql
CREATE TABLE donation_items (
  id SERIAL PRIMARY KEY,
  donor_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  item_description TEXT NOT NULL,
  estimated_value DECIMAL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. RestaurantPartnershipSection Component

**Purpose**: Explain restaurant partnership program

**Location**: Restaurants page or dedicated section

**Content**:
- Headline: "Dine & Donate"
- Explanation of Denny's partnership (10 cents per tray)
- List of partner restaurants
- How it works
- Call-to-action to visit restaurants
- Map or locations (if available)

**UI Design**:
- Restaurant logo/image
- Partnership details card
- "10¢ per tray donated" badge
- Location information
- Link to restaurant website

### 6. GoogleReviewsSection Component

**Purpose**: Display Google Business reviews for social proof and redirect users to leave reviews

**Implementation Strategy**:

The component will have two main functionalities:
1. **Review Redirect Button** - Works immediately, no verification needed
2. **Reviews Display** - Fetches and displays reviews once verification completes

**Direct Review Link**:
Once you have your Google Business Profile, you'll get a unique "Place ID". The review link format is:
```
https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
```

**Getting Your Place ID**:
1. Go to Google Business Profile Manager
2. Click on your business
3. In the URL, you'll see your Place ID, OR
4. Use the Place ID Finder: https://developers.google.com/maps/documentation/places/web-service/place-id

**Implementation Options**:

**Option A: Google Places API** (Recommended - Full Featured)
```javascript
// Fetch reviews from Google Places API
const fetchGoogleReviews = async () => {
  const PLACE_ID = process.env.REACT_APP_GOOGLE_PLACE_ID;
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  
  try {
    // Using CORS proxy or backend endpoint
    const response = await fetch(
      `/api/google-reviews?placeId=${PLACE_ID}`
    );
    const data = await response.json();
    return data.result.reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};
```

**Note**: Direct browser calls to Google Places API are blocked by CORS. You need either:
- A backend proxy endpoint
- A serverless function (Netlify/Vercel function)
- Use the Google Maps JavaScript API with a map component

**Option B: Google Maps JavaScript API with Reviews**
```javascript
// Load Google Maps API in index.html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>

// In component
useEffect(() => {
  const service = new google.maps.places.PlacesService(
    document.createElement('div')
  );
  
  service.getDetails(
    {
      placeId: PLACE_ID,
      fields: ['reviews', 'rating', 'user_ratings_total']
    },
    (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setReviews(place.reviews);
        setRating(place.rating);
      }
    }
  );
}, []);
```

**Option C: Embedded Reviews Widget** (Easiest, but less customizable)
```html
<!-- Google Reviews Widget -->
<iframe 
  src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=place_id:YOUR_PLACE_ID"
  width="100%" 
  height="400"
  frameborder="0">
</iframe>
```

**Recommended Implementation** (Hybrid Approach):

```javascript
const GoogleReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const PLACE_ID = process.env.REACT_APP_GOOGLE_PLACE_ID;
  const REVIEW_LINK = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;
  
  useEffect(() => {
    // Only fetch if Place ID is configured
    if (PLACE_ID && PLACE_ID !== 'YOUR_PLACE_ID_HERE') {
      fetchReviews();
    } else {
      setLoading(false);
    }
  }, []);
  
  const fetchReviews = async () => {
    try {
      // Call your backend endpoint or serverless function
      const response = await fetch(`/api/google-reviews`);
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section className="google-reviews">
      <h2>What Our Community Says</h2>
      
      {/* Always show the "Leave a Review" button */}
      <div className="review-cta">
        <a 
          href={REVIEW_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Leave Us a Review on Google
        </a>
      </div>
      
      {/* Show reviews if available, placeholder if not */}
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length > 0 ? (
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      ) : (
        <div className="reviews-placeholder">
          <p>Be the first to review us on Google!</p>
          <p>We're building our presence and would love your feedback.</p>
        </div>
      )}
      
      {/* Link to view all reviews on Google */}
      <a 
        href={`https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`}
        target="_blank"
        rel="noopener noreferrer"
        className="view-all-link"
      >
        View All Reviews on Google →
      </a>
    </section>
  );
};
```

**UI Design**:
- Prominent "Leave a Review" button (red/blue theme)
- Review cards with star ratings (if reviews exist)
- Reviewer name and date
- Review text (truncated with "Read more")
- Overall rating display with star visualization
- "View All Reviews" link to Google Maps
- Placeholder message if no reviews yet
- Loading state while fetching
- Error handling with fallback UI

**Backend API Endpoint** (if using serverless function):
```javascript
// api/google-reviews.js (Netlify/Vercel function)
export default async function handler(req, res) {
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const API_KEY = process.env.GOOGLE_API_KEY;
  
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`
    );
    const data = await response.json();
    
    res.status(200).json({
      reviews: data.result.reviews || [],
      rating: data.result.rating,
      totalRatings: data.result.user_ratings_total
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}
```

### 7. Enhanced Social Media Integration

**Updates**:
- Add TikTok to social media links
- Prominent social media bar in header/footer
- Call-to-action sections encouraging tagging
- "Check in on Google" prompt
- Social media handles displayed clearly

**Social Media Links**:
```javascript
const socialLinks = {
  facebook: 'https://www.facebook.com/shorroshfamfoundation',
  instagram: 'https://www.instagram.com/the_shorrosh_family_foundation',
  tiktok: 'https://www.tiktok.com/@shorroshfoundation' // Update with real link
};
```

### 8. Newsletter Section Removal

**Changes**:
- Remove `NewsletterSection` component
- Remove from HomePage
- Remove from AboutPage
- Remove from all other pages where it appears
- Clean up unused code and imports

## Data Models

### Email Subscribers Table
```sql
CREATE TABLE email_subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  source TEXT DEFAULT 'modal',
  is_active BOOLEAN DEFAULT true
);
```

### Veteran Businesses Table
```sql
CREATE TABLE veteran_businesses (
  id SERIAL PRIMARY KEY,
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  description TEXT,
  veteran_branch TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Donation Items Table
```sql
CREATE TABLE donation_items (
  id SERIAL PRIMARY KEY,
  donor_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  item_description TEXT NOT NULL,
  estimated_value DECIMAL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Error Handling

### Email Collection Modal
- Validate email format before submission
- Handle Supabase connection errors gracefully
- Show user-friendly error messages
- Prevent duplicate email submissions
- Handle localStorage errors (private browsing)

### Form Submissions
- Client-side validation for all forms
- Server-side validation via Supabase
- Loading states during submission
- Success/error notifications
- Form reset after successful submission

### Google Reviews
- Handle API rate limits
- Fallback to placeholder if API fails
- Cache reviews to reduce API calls
- Handle missing or incomplete data

## Testing Strategy

### Unit Tests
- Email validation logic
- Form validation functions
- localStorage operations
- Modal display logic

### Integration Tests
- Email submission to Supabase
- Veteran business form submission
- Donation items form submission
- Modal display on first visit
- Social media link functionality

### User Acceptance Tests
1. First-time visitor sees email modal
2. Email submission saves to database
3. Social links appear after email submission
4. Modal doesn't show on subsequent visits
5. Merchandise page displays correctly
6. Veteran business form submits successfully
7. Donation items form submits successfully
8. Google reviews display (or placeholder)
9. Newsletter sections are removed
10. All social media links work correctly

### Manual Testing Checklist
- [ ] Email modal appears on first visit
- [ ] Email modal doesn't appear on return visits
- [ ] Email validation works correctly
- [ ] Social media links appear after submission
- [ ] Merchandise page loads and displays products
- [ ] Veteran business form validates and submits
- [ ] Donation items form validates and submits
- [ ] Restaurant partnership section displays
- [ ] Google reviews section displays
- [ ] Newsletter sections are removed from all pages
- [ ] Social media links work on all pages
- [ ] Mobile responsiveness for all new components
- [ ] Admin can view submitted forms in dashboard

## Implementation Notes

### Phase 1: Core Features
1. Create Supabase tables
2. Implement email collection modal
3. Remove newsletter sections
4. Create merchandise store page

### Phase 2: Forms & Sections
1. Veteran business support section
2. Donation items section
3. Restaurant partnership section
4. Enhanced social media integration

### Phase 3: Reviews & Polish
1. Google reviews integration
2. UI/UX refinements
3. Testing and bug fixes
4. Performance optimization

### Google Business Profile Setup
**Note**: For Google Reviews to work, you need to:
1. Create a Google Business Profile at https://business.google.com
2. Verify your business
3. Get your Place ID
4. Enable Google Places API
5. Get API key from Google Cloud Console

**Temporary Solution**: Display placeholder with "Coming Soon" message and link to leave reviews once profile is set up.

## Security Considerations

- Validate all email addresses server-side
- Sanitize form inputs to prevent XSS
- Rate limit form submissions
- Use CAPTCHA for public forms (optional)
- Secure API keys in environment variables
- Implement CORS properly for API calls
