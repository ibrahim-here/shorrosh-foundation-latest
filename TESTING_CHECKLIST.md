# Testing Checklist - Shorrosh Foundation

## Pre-Testing Setup

- [ ] Database tables created in Supabase
- [ ] Environment variables configured (.env file)
- [ ] Development server running (`npm run dev`)
- [ ] Browser console open for error checking

---

## 1. Email Collection Modal Testing

### First Visit Test
- [ ] Clear browser localStorage
- [ ] Refresh the page
- [ ] Modal appears after 2 seconds
- [ ] Modal displays foundation logo
- [ ] Headline and promotional text visible
- [ ] Email input field works

### Email Submission Test
- [ ] Enter valid email address
- [ ] Click submit button
- [ ] Loading state shows
- [ ] Success message appears
- [ ] Social media links (Facebook, Instagram) display
- [ ] Links open in new tabs
- [ ] Email saved to Supabase `email_subscribers` table

### Modal Behavior Test
- [ ] Close button (X) works
- [ ] Modal doesn't appear on page refresh
- [ ] Modal doesn't appear on navigation to other pages
- [ ] localStorage flag `emailModalShown` is set

### Error Handling Test
- [ ] Try submitting without email - validation error shows
- [ ] Try submitting invalid email - validation error shows
- [ ] Try duplicate email - handles gracefully

---

## 2. Merchandise Store Page Testing

### Page Load Test
- [ ] Navigate to `/store` or click "Store" in menu
- [ ] Page loads without errors
- [ ] "Coming Soon" badge animates
- [ ] Hero section displays correctly

### Product Display Test
- [ ] 4 product cards display (T-shirts, Mugs, Pins, Keychains)
- [ ] Product images load
- [ ] "Coming Soon" badges on each product
- [ ] Prices show "TBA"

### Notification Form Test
- [ ] Enter email in "Notify Me" form
- [ ] Submit form
- [ ] Success message displays
- [ ] Email saved to Supabase with source='merchandise'
- [ ] Form resets after submission

### Navigation Test
- [ ] "Make a Donation Now" button works
- [ ] Returns to home page correctly

---

## 3. Veteran Business Support Page Testing

### Page Load Test
- [ ] Navigate to `/veteran-business` or click menu link
- [ ] Page loads without errors
- [ ] Hero section displays with Shield icon
- [ ] Benefits section shows 3 cards

### Form Submission Test
- [ ] Fill out all required fields:
  - [ ] Business name
  - [ ] Owner name
  - [ ] Email
- [ ] Fill optional fields:
  - [ ] Phone
  - [ ] Website
  - [ ] Branch of service
- [ ] Enter business description
- [ ] Submit form
- [ ] Success message displays
- [ ] Data saved to Supabase `veteran_businesses` table
- [ ] Form resets after submission

### Validation Test
- [ ] Try submitting without required fields - validation works
- [ ] Email validation works
- [ ] URL validation works for website field

### Navigation Test
- [ ] "Email Us" link opens email client
- [ ] "Learn About Our Causes" button works
- [ ] Cancel button returns to home

---

## 4. Donation Items Page Testing

### Page Load Test
- [ ] Navigate to `/donate-items`
- [ ] Page loads without errors
- [ ] January 2026 auction info displays
- [ ] "What We're Looking For" categories show

### Denny's Section Test
- [ ] Denny's partnership section displays
- [ ] "10¢ per tray" badge visible

### Form Submission Test
- [ ] Fill out donor information:
  - [ ] Name
  - [ ] Email
  - [ ] Phone (optional)
  - [ ] Estimated value (optional)
- [ ] Enter item description
- [ ] Submit form
- [ ] Success message displays
- [ ] Data saved to Supabase `donation_items` table
- [ ] Form resets

### Navigation Test
- [ ] "Email Us" link works
- [ ] "View Current Auctions" button works
- [ ] Cancel button returns to home

---

## 5. Restaurant Partnership Testing

### Page Load Test
- [ ] Navigate to `/restaurants`
- [ ] Enhanced page loads
- [ ] "Dine & Donate" section displays

### Denny's Program Test
- [ ] Denny's featured partner section shows
- [ ] "10¢ per tray" and "100% goes to charity" badges display
- [ ] Menu icon displays

### How It Works Test
- [ ] 3-step process displays
- [ ] Step numbers and descriptions visible

### Restaurant List Test
- [ ] Partner restaurants display (if any in database)
- [ ] Restaurant images load
- [ ] "Visit Website" links work
- [ ] Opens in new tab

### Impact Section Test
- [ ] Three causes display with icons
- [ ] Veterans, Children's Health, Feed the Hungry sections show

---

## 6. Google Reviews Section Testing

### Homepage Display Test
- [ ] Scroll to Google Reviews section on homepage
- [ ] "Coming Soon" placeholder displays
- [ ] Star icon shows
- [ ] Message about setting up profile visible

### Links Test
- [ ] "Find Us on Google" link works
- [ ] Opens in new tab
- [ ] "Become a Partner" button works

---

## 7. Social Media Integration Testing

### Footer Test
- [ ] Social media banner displays at top of footer
- [ ] "Follow Us & Stay Connected" section shows
- [ ] Facebook, Instagram, TikTok icons display
- [ ] All social links work and open in new tabs

### Social Handles Test
- [ ] @the_shorrosh_family_foundation displays
- [ ] "Tag us in your posts!" message shows

### Footer Links Test
- [ ] All footer navigation links work
- [ ] Contact email link opens email client
- [ ] Phone number displays correctly
- [ ] "Find us on Google" link works
- [ ] "Become a Partner" link works

---

## 8. Admin Dashboard Testing

### Login Test
- [ ] Navigate to `/admin-login`
- [ ] Enter username: `ibrahim`
- [ ] Enter password: `1234`
- [ ] Login successful
- [ ] Redirects to admin dashboard

### Email Subscribers Management Test
- [ ] Email subscribers section displays
- [ ] Total count shows correctly
- [ ] Subscriber list displays with:
  - [ ] Email addresses
  - [ ] Source (modal, merchandise, etc.)
  - [ ] Subscription dates
- [ ] "Export Emails" button works
- [ ] Downloads text file with emails

### Veteran Business Management Test
- [ ] Veteran business submissions display
- [ ] Each submission shows:
  - [ ] Business name and owner
  - [ ] Description
  - [ ] Contact info
  - [ ] Website link (if provided)
  - [ ] Branch of service
  - [ ] Submission date
- [ ] Status dropdown works (pending, approved, rejected)
- [ ] Status updates save to database

### Donation Items Management Test
- [ ] Donation items display
- [ ] Each item shows:
  - [ ] Donor name
  - [ ] Item description
  - [ ] Estimated value
  - [ ] Contact info
  - [ ] Submission date
- [ ] Status dropdown works (pending, contacted, accepted, declined)
- [ ] Status updates save to database

### Existing Admin Features Test
- [ ] Data backup export works
- [ ] Data import works
- [ ] Add auction item works
- [ ] Add event works
- [ ] Add restaurant works
- [ ] Add sponsor works
- [ ] Recent donations display

### Logout Test
- [ ] Logout button works
- [ ] Redirects to home page
- [ ] Cannot access admin without re-login

---

## 9. Mobile Responsiveness Testing

### Test on Mobile Devices (or browser dev tools)
- [ ] Email modal displays correctly on mobile
- [ ] Store page responsive
- [ ] Veteran business page responsive
- [ ] Donation items page responsive
- [ ] Restaurant page responsive
- [ ] Footer displays correctly
- [ ] Navigation menu works on mobile
- [ ] Forms are usable on mobile
- [ ] All buttons are tappable

---

## 10. Cross-Browser Testing

### Test on Multiple Browsers
- [ ] Chrome - all features work
- [ ] Firefox - all features work
- [ ] Safari - all features work
- [ ] Edge - all features work

---

## 11. Performance Testing

- [ ] Page load times are acceptable (< 3 seconds)
- [ ] Images load properly
- [ ] No console errors
- [ ] No console warnings (or acceptable warnings only)
- [ ] Smooth animations and transitions
- [ ] Forms submit quickly

---

## 12. Database Integration Testing

### Supabase Connection Test
- [ ] Check browser console for "Supabase connection successful"
- [ ] No Supabase connection errors

### Data Persistence Test
- [ ] Submit email - check Supabase `email_subscribers` table
- [ ] Submit veteran business - check `veteran_businesses` table
- [ ] Submit donation item - check `donation_items` table
- [ ] Admin status updates persist after page refresh

---

## 13. Error Handling Testing

### Network Error Test
- [ ] Disconnect internet
- [ ] Try submitting forms
- [ ] Error messages display appropriately
- [ ] Reconnect internet
- [ ] Forms work again

### Invalid Data Test
- [ ] Try submitting forms with invalid data
- [ ] Validation messages display
- [ ] Forms don't submit with invalid data

---

## 14. Accessibility Testing

- [ ] All images have alt text
- [ ] All buttons have aria-labels where needed
- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Color contrast is sufficient

---

## Testing Summary

**Total Tests**: ~150+
**Critical Tests**: Email modal, Forms, Admin dashboard, Mobile responsiveness
**Priority**: High priority tests should be completed before deployment

---

## Bug Reporting Template

If you find bugs, document them as follows:

```
**Bug Title**: [Brief description]
**Page/Feature**: [Where the bug occurs]
**Steps to Reproduce**:
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**: [What should happen]
**Actual Behavior**: [What actually happens]
**Browser**: [Chrome/Firefox/Safari/Edge]
**Device**: [Desktop/Mobile/Tablet]
**Screenshot**: [If applicable]
```

---

## Notes

- Test in incognito/private mode to simulate first-time visitors
- Clear cache between tests if needed
- Check browser console for errors during all tests
- Test with real email addresses to verify Supabase integration
- Document any issues found for fixing before deployment
