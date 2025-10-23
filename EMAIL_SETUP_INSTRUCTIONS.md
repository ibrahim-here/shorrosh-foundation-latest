# Email Notification Setup Instructions

This document provides instructions for setting up email notifications for partner form submissions.

## EmailJS Setup

The application uses EmailJS to send email notifications when someone submits a partner application.

### Steps to Configure EmailJS:

1. **Create an EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account

2. **Create an Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the instructions to connect your email account
   - Copy the **Service ID**

3. **Create an Email Template**
   - Go to "Email Templates" in your EmailJS dashboard
   - Click "Create New Template"
   - Use this template structure:
   ```
   Subject: New Partner Application - Shorrosh Foundation
   
   New partner application submitted!
   
   Name: {{from_name}}
   Email: {{from_email}}
   Message: {{message}}
   
   Submitted at: {{submission_time}}
   ```
   - Copy the **Template ID**

4. **Get Your Public Key**
   - Go to "Account" in your EmailJS dashboard
   - Find your **Public Key** (also called API Key)

5. **Update the Application Code**
   - Open `src/App.jsx`
   - Find the `submitPartnerForm` function (around line 896-913)
   - Replace the following placeholders:
     - `YOUR_PUBLIC_KEY` with your EmailJS Public Key
     - `YOUR_SERVICE_ID` with your EmailJS Service ID
     - `YOUR_TEMPLATE_ID` with your EmailJS Template ID

### Example Configuration:

```javascript
emailjs.init('user_abc123xyz'); // Your Public Key

await emailjs.send(
  'service_xyz789',     // Your Service ID
  'template_abc456',    // Your Template ID
  templateParams
);
```

## Alternative: Supabase Edge Functions

If you prefer to use Supabase Edge Functions instead of EmailJS:

1. Create a new Edge Function in your Supabase project
2. Configure it to send emails using a service like SendGrid or Resend
3. Update the `submitPartnerForm` function to call your Edge Function

## Testing

After configuration:
1. Go to the "Become Our Partner" page
2. Fill out the form with test data
3. Submit the form
4. Check that:
   - Data is saved in the `partner-table` in Supabase
   - Email notification is received at ibrahimsohail077@gmail.com

## Troubleshooting

- **Email not sending**: Check browser console for errors
- **Template errors**: Ensure template variables match those in code
- **Service errors**: Verify your email service is properly connected in EmailJS

## Email Recipient

Currently set to: **ibrahimsohail077@gmail.com**

To change the recipient email, update line 899 in `src/App.jsx`:
```javascript
to_email: 'your-new-email@example.com',
```

