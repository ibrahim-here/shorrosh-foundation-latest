# Deployment Guide - Shorrosh Foundation Website

## Pre-Deployment Checklist

Before deploying to production, ensure all these items are completed:

- [ ] All database tables created in Supabase
- [ ] All testing completed (see TESTING_CHECKLIST.md)
- [ ] No console errors in production build
- [ ] Environment variables configured
- [ ] Social media links verified
- [ ] Contact information verified
- [ ] All forms tested and working
- [ ] Admin dashboard tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing completed

---

## Step 1: Database Setup

### 1.1 Run SQL Scripts in Supabase

1. Log in to https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy and paste the contents of `supabase-setup.sql`
6. Click **Run** (or press Ctrl+Enter)
7. Verify success message
8. Go to **Table Editor** and confirm these tables exist:
   - `email_subscribers`
   - `veteran_businesses`
   - `donation_items`

### 1.2 Verify RLS Policies

1. In Supabase, go to **Authentication** → **Policies**
2. Verify each table has appropriate policies:
   - Public INSERT allowed
   - Public SELECT allowed (where appropriate)

---

## Step 2: Environment Variables

### 2.1 Production Environment Variables

Create a `.env.production` file with:

```env
VITE_SUPABASE_URL=https://kgpzucxkbsaftoyybhqw.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key_here
VITE_EMAILJS_SERVICE_ID=service_4acejak
VITE_EMAILJS_TEMPLATE_ID=template_r5t1oy4
VITE_EMAILJS_PUBLIC_KEY=Ks6jRDct9lE2xdSdn
VITE_CLOVER_PAYMENT_URL=your_clover_payment_url_here
```

### 2.2 Verify Environment Variables

- [ ] Supabase URL is correct
- [ ] Supabase anon key is correct
- [ ] EmailJS credentials are correct
- [ ] Clover payment URL is correct

---

## Step 3: Build for Production

### 3.1 Install Dependencies

```bash
npm install
```

### 3.2 Build the Project

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### 3.3 Test Production Build Locally

```bash
npm run preview
```

Visit http://localhost:4173 and test:
- [ ] All pages load
- [ ] Forms work
- [ ] No console errors
- [ ] Images load correctly

---

## Step 4: Choose Deployment Platform

### Option A: Vercel (Recommended)

**Pros**: Easy setup, automatic deployments, free tier, great performance

**Steps**:

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your Git repository
   - Configure:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add environment variables from `.env.production`
   - Click "Deploy"

3. **Or Deploy via CLI**:
   ```bash
   vercel
   ```
   Follow the prompts

4. **Configure Custom Domain** (optional):
   - In Vercel dashboard, go to project settings
   - Add your custom domain
   - Update DNS records as instructed

### Option B: Netlify

**Pros**: Easy setup, free tier, good performance

**Steps**:

1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables in Site settings → Environment variables
6. Click "Deploy site"

### Option C: GitHub Pages

**Pros**: Free, integrated with GitHub

**Steps**:

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/repository-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/repository-name/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Option D: Custom Server (VPS/Dedicated)

**Pros**: Full control, can run backend server

**Steps**:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload `dist` folder** to your server

3. **Configure web server** (Nginx example):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /path/to/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Set up SSL** (Let's Encrypt):
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Step 5: Post-Deployment Verification

### 5.1 Functional Testing

Visit your deployed site and verify:

- [ ] Homepage loads correctly
- [ ] Email modal appears on first visit
- [ ] All navigation links work
- [ ] Store page loads
- [ ] Veteran business page loads
- [ ] Donation items page loads
- [ ] Restaurant page loads with enhancements
- [ ] Admin login works
- [ ] Forms submit successfully
- [ ] Data saves to Supabase
- [ ] Social media links work
- [ ] All images load

### 5.2 Performance Testing

- [ ] Run Google PageSpeed Insights
- [ ] Check Lighthouse scores
- [ ] Verify mobile performance
- [ ] Test page load times

### 5.3 SEO Verification

- [ ] Meta tags are correct
- [ ] Title tags are descriptive
- [ ] Images have alt text
- [ ] Sitemap exists (if applicable)

---

## Step 6: Domain Configuration (Optional)

### 6.1 Custom Domain Setup

If using a custom domain:

1. **Purchase domain** (GoDaddy, Namecheap, etc.)
2. **Update DNS records**:
   - Add A record or CNAME as instructed by hosting provider
   - Wait for DNS propagation (up to 48 hours)
3. **Configure SSL certificate**:
   - Most platforms (Vercel, Netlify) handle this automatically
   - For custom servers, use Let's Encrypt

### 6.2 Verify Domain

- [ ] Domain resolves correctly
- [ ] HTTPS works
- [ ] www and non-www both work
- [ ] Redirects configured properly

---

## Step 7: Monitoring and Maintenance

### 7.1 Set Up Monitoring

**Error Tracking**:
- Consider using Sentry for error tracking
- Monitor Supabase logs for database errors

**Analytics**:
- Set up Google Analytics (optional)
- Monitor user behavior and form submissions

**Uptime Monitoring**:
- Use UptimeRobot or similar service
- Get alerts if site goes down

### 7.2 Regular Maintenance

**Weekly**:
- [ ] Check admin dashboard for new submissions
- [ ] Review email subscribers
- [ ] Check for any errors in logs

**Monthly**:
- [ ] Review and update content
- [ ] Check for security updates
- [ ] Backup database
- [ ] Review analytics

**Quarterly**:
- [ ] Update dependencies
- [ ] Review and optimize performance
- [ ] Update documentation

---

## Step 8: Backup Strategy

### 8.1 Database Backups

**Supabase Automatic Backups**:
- Supabase provides automatic backups
- Verify backup settings in Supabase dashboard

**Manual Backups**:
1. Go to Supabase SQL Editor
2. Export data:
   ```sql
   COPY email_subscribers TO STDOUT WITH CSV HEADER;
   COPY veteran_businesses TO STDOUT WITH CSV HEADER;
   COPY donation_items TO STDOUT WITH CSV HEADER;
   ```
3. Save exports to secure location

### 8.2 Code Backups

- [ ] Code is in Git repository
- [ ] Repository is backed up (GitHub, GitLab, etc.)
- [ ] `.env` files are NOT in repository
- [ ] Keep local copy of environment variables

---

## Step 9: Security Checklist

- [ ] Environment variables are secure
- [ ] No sensitive data in client-side code
- [ ] HTTPS is enabled
- [ ] Supabase RLS policies are configured
- [ ] Admin credentials are strong
- [ ] API keys are restricted (if applicable)
- [ ] CORS is configured properly
- [ ] Rate limiting is in place (Supabase handles this)

---

## Step 10: Documentation

### 10.1 Update Documentation

- [ ] Update README.md with deployment info
- [ ] Document any custom configurations
- [ ] Update IMPLEMENTATION_SUMMARY.md
- [ ] Create admin user guide (if needed)

### 10.2 Handoff Documentation

If handing off to another team:
- [ ] Provide access to hosting platform
- [ ] Provide Supabase credentials
- [ ] Provide admin login credentials
- [ ] Provide EmailJS credentials
- [ ] Share all documentation files

---

## Troubleshooting

### Common Issues

**Issue**: Forms not submitting
- **Solution**: Check Supabase connection, verify RLS policies

**Issue**: Email modal not appearing
- **Solution**: Clear localStorage, check console for errors

**Issue**: Images not loading
- **Solution**: Verify image paths, check build output

**Issue**: 404 errors on page refresh
- **Solution**: Configure server for SPA routing (see hosting platform docs)

**Issue**: Environment variables not working
- **Solution**: Verify variable names start with `VITE_`, rebuild project

---

## Rollback Plan

If deployment fails:

1. **Revert to previous version**:
   - Vercel/Netlify: Use dashboard to rollback
   - Custom server: Restore previous `dist` folder

2. **Check logs** for errors

3. **Fix issues** in development

4. **Test thoroughly** before redeploying

---

## Support Contacts

**Hosting Support**:
- Vercel: https://vercel.com/support
- Netlify: https://www.netlify.com/support/
- GitHub: https://support.github.com/

**Database Support**:
- Supabase: https://supabase.com/support

**Email Service**:
- EmailJS: https://www.emailjs.com/docs/

---

## Deployment Checklist Summary

- [ ] Database tables created
- [ ] Environment variables configured
- [ ] Production build tested locally
- [ ] Deployed to hosting platform
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] All features tested in production
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Documentation updated
- [ ] Team notified of deployment

---

## Post-Deployment Tasks

### Immediate (Day 1)
- [ ] Monitor for errors
- [ ] Test all critical features
- [ ] Verify form submissions
- [ ] Check admin dashboard

### Week 1
- [ ] Review analytics
- [ ] Check for user feedback
- [ ] Monitor performance
- [ ] Review submission data

### Month 1
- [ ] Analyze user behavior
- [ ] Optimize based on data
- [ ] Plan future enhancements
- [ ] Review and update content

---

**Deployment Date**: _____________
**Deployed By**: _____________
**Platform**: _____________
**Domain**: _____________
**Status**: _____________

---

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Supabase Documentation](https://supabase.com/docs)
- [React Deployment Best Practices](https://react.dev/learn/start-a-new-react-project#deploying-to-production)

---

**Last Updated**: November 14, 2025
**Version**: 1.0
