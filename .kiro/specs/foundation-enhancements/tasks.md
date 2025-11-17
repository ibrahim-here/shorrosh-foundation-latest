# Implementation Plan

- [x] 1. Set up database tables in Supabase


  - Create `email_subscribers` table with email, subscribed_at, source, and is_active columns
  - Create `veteran_businesses` table with business details and status tracking
  - Create `donation_items` table for auction item donations
  - Verify all tables have proper indexes and RLS policies configured
  - _Requirements: 1.4, 4.3, 5.4_





- [x] 2. Remove newsletter sections from all pages

  - [x] 2.1 Search and identify all NewsletterSection component usages


    - Use grep to find all instances of NewsletterSection in the codebase
    - Document which pages currently use the newsletter component
    - _Requirements: 3.1, 3.2_


  
  - [x] 2.2 Remove NewsletterSection from HomePage

    - Delete the NewsletterSection component call from HomePage


    - Verify page renders correctly without newsletter
    - _Requirements: 3.1, 3.3_





  

  - [ ] 2.3 Remove NewsletterSection from AboutPage and other pages
    - Remove newsletter component from all remaining pages
    - Clean up any newsletter-related imports

    - _Requirements: 3.1, 3.3_

  
  - [ ] 2.4 Delete NewsletterSection component file
    - Remove the NewsletterSection component definition
    - Clean up any unused dependencies
    - _Requirements: 3.2_



- [ ] 3. Implement email collection modal
  - [ ] 3.1 Create EmailCollectionModal component structure
    - Create new component file with modal overlay and card layout
    - Implement modal open/close state management
    - Add close button (X icon) in top-right corner

    - _Requirements: 1.1, 1.8_
  
  - [ ] 3.2 Build modal UI with promotional content
    - Add foundation logo at top of modal
    - Create headline: "Join Our Community & Get Exclusive Benefits!"
    - Add subtext about discounts and promos


    - Style with gradient background and white card
    - _Requirements: 1.3_
  
  - [x] 3.3 Implement email input form

    - Add email input field with proper styling
    - Create submit button with loading state
    - Add client-side email validation
    - Display validation errors inline
    - _Requirements: 1.2, 1.4_
  


  - [ ] 3.4 Add social media links display
    - Create social media icons section (Facebook, Instagram, TikTok)




    - Show social links after successful email submission
    - Add "Follow us for more!" call-to-action text
    - Implement smooth transition when showing social links
    - _Requirements: 1.5, 1.6_

  
  - [ ] 3.5 Implement localStorage tracking
    - Check localStorage on app load for 'emailModalShown' flag
    - Set flag after modal is shown or dismissed
    - Handle localStorage errors gracefully (private browsing)

    - _Requirements: 1.7_
  
  - [ ] 3.6 Connect email submission to Supabase
    - Create async function to insert email into email_subscribers table
    - Handle Supabase errors with user-friendly messages
    - Show success message after submission

    - Prevent duplicate email submissions
    - _Requirements: 1.4_
  
  - [ ] 3.7 Integrate modal into App.jsx
    - Add modal state management to main App component
    - Trigger modal display on first visit

    - Ensure modal appears above all other content (z-index)
    - _Requirements: 1.1_

- [x] 4. Create merchandise store page





  - [ ] 4.1 Create MerchandiseStorePage component
    - Set up new page component with route
    - Add navigation link in header menu
    - Create page structure with hero section

    - _Requirements: 2.1, 2.6_
  
  - [ ] 4.2 Build "Coming Soon" hero section
    - Create gradient hero banner with "Coming Soon" message
    - Add descriptive text about upcoming merchandise

    - Style consistently with existing pages
    - _Requirements: 2.2_
  
  - [ ] 4.3 Create product preview grid
    - Build 4-column grid for product cards (responsive)
    - Add placeholder images for t-shirts, cups, pins, keychains

    - Add "Coming Soon" badges on each product card
    - Display "TBA" for pricing
    - _Requirements: 2.3_
  
  - [x] 4.4 Add interest notification form

    - Create email input for launch notifications
    - Add submit button with "Notify Me" text
    - Connect to email_subscribers table with source='merchandise'




    - Show success message after submission
    - _Requirements: 2.5_
  
  - [x] 4.5 Add supporting content

    - Write copy explaining how purchases support the foundation
    - Add call-to-action to donate while waiting
    - Include link to donation page
    - _Requirements: 2.4_


- [ ] 5. Implement veteran business support section
  - [ ] 5.1 Create VeteranBusinessSection component
    - Build section component with heading and description
    - Add Shield icon from lucide-react
    - Style with blue theme matching veterans cause

    - _Requirements: 4.1, 4.5_
  
  - [ ] 5.2 Build veteran business contact form
    - Create form with fields: business name, owner name, email, phone, website, description, veteran branch
    - Add form validation for required fields
    - Style form inputs consistently with existing forms

    - _Requirements: 4.3_
  
  - [ ] 5.3 Connect form to Supabase
    - Create submission handler function
    - Insert form data into veteran_businesses table

    - Handle errors and show user feedback
    - Reset form after successful submission
    - _Requirements: 4.3_



  
  - [ ] 5.4 Add benefits and promotional content
    - Write copy explaining support benefits for veteran businesses
    - Add section about business promotion on foundation platforms
    - Include call-to-action encouraging veterans to reach out

    - _Requirements: 4.2, 4.4, 4.5_
  
  - [ ] 5.5 Integrate section into website
    - Add to Causes page or create dedicated page
    - Ensure section is prominently displayed

    - Add navigation link if needed
    - _Requirements: 4.6_

- [ ] 6. Create donation items section
  - [x] 6.1 Create DonationItemsSection component

    - Build section with heading and description
    - Add relevant icon (Gift or Package icon)
    - Style with foundation color scheme
    - _Requirements: 5.1_
  

  - [ ] 6.2 Add January auction information
    - Display upcoming auction date and details
    - Explain types of items being sought
    - Add urgency/excitement about the event



    - _Requirements: 5.2_
  
  - [ ] 6.3 Build item donation contact form
    - Create form with fields: name, email, phone, item description, estimated value
    - Add optional image upload field for item photos

    - Implement form validation
    - _Requirements: 5.4_
  
  - [ ] 6.4 Connect form to Supabase
    - Create submission handler

    - Insert into donation_items table
    - Handle file uploads if images are included
    - Show confirmation message
    - _Requirements: 5.4_
  

  - [ ] 6.5 Add contact information and CTAs
    - Display email/phone for direct contact
    - Add "Contact Us" button
    - Include information about accepted items
    - _Requirements: 5.3, 5.5_

  
  - [ ] 6.6 Integrate into auction or donate page
    - Add section to appropriate page
    - Ensure visibility and accessibility



    - _Requirements: 5.1_

- [ ] 7. Implement restaurant partnership section
  - [ ] 7.1 Create RestaurantPartnershipSection component
    - Build section with "Dine & Donate" heading

    - Add restaurant/food icon
    - Style with warm, inviting colors
    - _Requirements: 6.1_
  
  - [x] 7.2 Add Denny's partnership information

    - Display "10¢ per tray donated" prominently
    - Explain how the program works
    - Add Denny's logo or image if available
    - _Requirements: 6.2, 6.5_
  

  - [ ] 7.3 Create partner restaurant list
    - Display current partner restaurants
    - Show location information
    - Add links to restaurant websites
    - _Requirements: 6.3, 6.4_

  
  - [ ] 7.4 Add call-to-action
    - Encourage users to visit partner restaurants
    - Explain impact of dining at partners



    - Add "Find a Location" button if applicable
    - _Requirements: 6.2_
  
  - [ ] 7.5 Integrate into restaurants page
    - Add section to existing restaurants page

    - Position prominently
    - Ensure mobile responsiveness
    - _Requirements: 6.1_

- [ ] 8. Implement Google reviews section with redirect and display functionality

  - [ ] 8.1 Create GoogleReviewsSection component structure
    - Build section container with heading "What Our Community Says"
    - Add star rating display component for overall rating
    - Create review card layout component
    - Add loading and error states
    - _Requirements: 7.1, 7.2_

  
  - [x] 8.2 Implement "Leave a Review" redirect button


    - Create prominent CTA button "Leave Us a Review on Google"
    - Use direct Google review link: `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`
    - Add environment variable for REACT_APP_GOOGLE_PLACE_ID
    - Open link in new tab with proper security attributes
    - Style button prominently with foundation colors
    - This works immediately once you have your Place ID from Google Business Profile
    - _Requirements: 7.5_
  
  - [ ] 8.3 Add "View All Reviews" link to Google Maps
    - Create link to Google Maps listing: `https://www.google.com/maps/place/?q=place_id:YOUR_PLACE_ID`
    - Position below reviews display
    - Style as secondary link with arrow icon
    - _Requirements: 7.4_

  - [ ] 8.4 Implement reviews fetching functionality
    - Create async function to fetch reviews from backend API endpoint
    - Add error handling for failed API calls
    - Implement caching to reduce API calls (localStorage with timestamp)
    - Only attempt fetch if Place ID is configured (not placeholder)
    - Handle case where no reviews exist yet
    - _Requirements: 7.2, 7.3_
  
  - [ ] 8.5 Create backend API endpoint for reviews
    - Create serverless function at `/api/google-reviews.js` (Netlify/Vercel)
    - Fetch from Google Places API: `https://maps.googleapis.com/maps/api/place/details/json`
    - Request fields: reviews, rating, user_ratings_total
    - Add environment variables: GOOGLE_PLACE_ID and GOOGLE_API_KEY
    - Return formatted JSON with reviews array
    - Handle API errors gracefully
    - _Requirements: 7.2, 7.3_

  - [ ] 8.6 Build reviews display UI
    - Create review cards showing: star rating, reviewer name, date, review text
    - Implement "Read more" for long reviews (truncate at 150 characters)
    - Display overall rating with star visualization
    - Show total number of reviews
    - Add placeholder message: "Be the first to review us on Google!" if no reviews
    - Ensure responsive grid layout (3 columns desktop, 1 column mobile)
    - _Requirements: 7.2, 7.6_
  
  - [ ] 8.7 Add environment variables and configuration
    - Create .env.example with REACT_APP_GOOGLE_PLACE_ID and REACT_APP_GOOGLE_API_KEY
    - Add instructions in code comments for getting Place ID
    - Document API key setup in Google Cloud Console
    - Add fallback behavior if env vars not configured
    - _Requirements: 7.2, 7.3_
  
  - [ ] 8.8 Integrate section into homepage
    - Add GoogleReviewsSection to homepage after partner benefits
    - Position for maximum visibility (above footer)
    - Ensure responsive design on all devices
    - Test with and without reviews data
    - _Requirements: 7.1_


- [ ] 9. Enhance social media integration
  - [ ] 9.1 Add TikTok to social media links
    - Update social media links object with TikTok URL
    - Add TikTok icon to header/footer
    - Ensure consistent styling with other social icons
    - _Requirements: 9.4_
  
  - [ ] 9.2 Create prominent social media bar
    - Build social media component for header or footer
    - Display all social icons (Facebook, Instagram, TikTok)
    - Add hover effects and transitions
    - _Requirements: 9.1_
  
  - [ ] 9.3 Add social media call-to-action sections
    - Create section encouraging users to tag the foundation
    - Add "Check in on Google" prompt




    - Include text about following for updates
    - _Requirements: 9.2, 9.3_
  
  - [ ] 9.4 Display social media handles
    - Show @handles clearly on relevant pages

    - Make handles clickable links
    - Add copy-to-clipboard functionality (optional)
    - _Requirements: 9.5_
  
  - [x] 9.5 Update email modal social links



    - Ensure modal shows all three platforms



    - Update dummy links with real social media URLs
    - Test all links work correctly
    - _Requirements: 1.5, 9.4_

- [x] 10. Enhance partner benefits section









  - [ ] 10.1 Update existing partner benefits content
    - Add comprehensive list of benefits (event tickets, recognition, coupons, gift cards)
    - Expand community impact messaging

    - Add more detailed explanations
    - _Requirements: 8.1, 8.2, 8.3_



  
  - [ ] 10.2 Add testimonials section
    - Create testimonial card component

    - Add placeholder for partner success stories
    - Style with quotes and attribution
    - _Requirements: 8.4_



  
  - [x] 10.3 Enhance call-to-action

    - Make "Become a Partner" button more prominent
    - Add multiple CTAs throughout the section
    - Link to partner application form


    - _Requirements: 8.5_

  
  - [ ] 10.4 Add information about raising money and donating time
    - Create subsection about volunteer opportunities
    - Explain fundraising partnership options
    - Add contact information for partnership inquiries
    - _Requirements: 8.6_


- [ ] 11. Implement digital gift card donation feature
  - [ ] 11.1 Add gift card option to donation page
    - Create "Donate Gift Card" section on donate page


    - Add explanation about email delivery
    - Style distinctly from regular donations
    - _Requirements: 10.1, 10.2_
  
  - [ ] 11.2 Build gift card donation form
    - Add fields: donor name, donor email, recipient email, amount, message
    - Implement form validation
    - Add preview of gift card email
    - _Requirements: 10.3_
  
  - [ ] 11.3 Integrate with payment gateway
    - Connect to Clover or payment processor
    - Handle payment processing for gift cards
    - Generate unique gift card codes
    - _Requirements: 10.4_
  
  - [ ] 11.4 Implement email delivery system
    - Create email template for gift cards
    - Send gift card to recipient email
    - Send confirmation to donor
    - _Requirements: 10.2, 10.3_
  
  - [ ] 11.5 Add confirmation and tracking
    - Show success message after purchase
    - Provide tracking/receipt to donor
    - Store gift card records in database
    - _Requirements: 10.5_

- [ ] 12. Admin dashboard enhancements
  - [ ] 12.1 Add email subscribers management
    - Create admin view for email_subscribers table
    - Display list of subscribers with dates
    - Add export functionality for email list
    - _Requirements: 1.4_
  
  - [ ] 12.2 Add veteran business submissions view
    - Create admin panel for veteran_businesses
    - Show pending and approved businesses
    - Add approve/reject functionality
    - Add ability to feature businesses on website
    - _Requirements: 4.3_
  
  - [ ] 12.3 Add donation items submissions view
    - Create admin view for donation_items table
    - Display item details and contact information
    - Add status tracking (pending, contacted, accepted, declined)
    - _Requirements: 5.4_
  
  - [x] 12.4 Add statistics dashboard

    - Show count of email subscribers





    - Display veteran business submissions
    - Show donation item submissions
    - Add charts or visualizations
    - _Requirements: Admin functionality_


- [ ] 13. Testing and quality assurance
  - [x] 13.1 Test email collection modal

    - Verify modal appears on first visit only
    - Test email validation and submission
    - Verify social links appear after submission
    - Test close button functionality

    - Test on mobile devices
    - _Requirements: 1.1-1.8_

  
  - [ ] 13.2 Test merchandise store page
    - Verify page loads correctly
    - Test responsive design

    - Verify all links work
    - Test interest form submission

    - _Requirements: 2.1-2.6_
  
  - [ ] 13.3 Test veteran business section
    - Test form validation
    - Verify submission to database
    - Test error handling


    - Verify success messages
    - _Requirements: 4.1-4.6_
  
  - [ ] 13.4 Test donation items section
    - Test form submission

    - Verify data saves correctly

    - Test file upload if implemented
    - Test on various devices


    - _Requirements: 5.1-5.6_

  


  - [ ] 13.5 Test all new sections on mobile
    - Verify responsive design for all new components

    - Test touch interactions
    - Verify readability and usability
    - Test forms on mobile browsers
    - _Requirements: All_
  

  - [ ] 13.6 Cross-browser testing
    - Test on Chrome, Firefox, Safari, Edge
    - Verify all functionality works across browsers
    - Fix any browser-specific issues
    - _Requirements: All_


- [ ] 14. Final polish and deployment
  - [ ] 14.1 Review and update all copy/content
    - Proofread all new text content
    - Ensure consistent tone and messaging
    - Verify all links and contact information
    - _Requirements: All_
  
  - [ ] 14.2 Optimize performance
    - Optimize images and assets
    - Minimize bundle size
    - Test page load times
    - _Requirements: All_
  
  - [ ] 14.3 Update documentation
    - Document new features for future reference
    - Update README if needed
    - Create admin guide for new dashboard features
    - _Requirements: All_
  
  - [ ] 14.4 Deploy to production
    - Build production bundle
    - Deploy to hosting platform
    - Verify all features work in production
    - Monitor for errors
    - _Requirements: All_
