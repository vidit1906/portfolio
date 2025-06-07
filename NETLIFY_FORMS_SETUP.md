# Netlify Forms Setup Guide

## 🚀 Contact Form Integration

Your contact form is now configured to work with **Netlify Forms**! Here's how to complete the setup:

## Step 1: Deploy to Netlify

1. **Push your changes to GitHub**:
```bash
git add .
git commit -m "Add Netlify Forms integration to contact form"
git push origin main
```

2. **Deploy on Netlify** (if not already done):
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Deploy your site

## Step 2: Form Notifications Setup

After deployment, configure email notifications:

### Email Notifications:
1. Go to your Netlify site dashboard
2. Navigate to **Settings** → **Forms**
3. Under **Form notifications**, click **Add notification**
4. Choose **Email notification**
5. Configure:
   - **Event**: Form submission
   - **Email**: viditnaik@gmail.com
   - **Subject**: New Contact Form Submission - Portfolio
   - **Custom email template** (optional):
   ```
   New message from your portfolio:
   
   Name: {{name}}
   Email: {{email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```

### Slack Integration (Optional):
1. In the same **Form notifications** section
2. Choose **Slack notification**
3. Connect your Slack workspace
4. Choose the channel for notifications

## Step 3: Test Your Form

1. Visit your deployed website
2. Fill out the contact form
3. Submit it
4. Check your email for the notification!

## How It Works

- ✅ **Client-side validation** with React Hook Form + Zod
- ✅ **Netlify Forms** handles form processing
- ✅ **Email notifications** sent to viditnaik@gmail.com
- ✅ **Google Analytics tracking** for form submissions
- ✅ **Spam protection** built-in with Netlify
- ✅ **Form submissions** viewable in Netlify dashboard

## Form Management

Access form submissions in your Netlify dashboard:
- **Site Dashboard** → **Forms**
- View all submissions, export data, manage spam

## Troubleshooting

### Form not working?
1. Ensure the site is deployed to Netlify
2. Check that the form has `data-netlify="true"` attribute
3. Verify the hidden form exists for Netlify detection
4. Check Netlify dashboard for form detection

### Not receiving emails?
1. Check spam folder
2. Verify email address in notification settings
3. Check Netlify form submissions in dashboard

## Alternative Options

If you prefer other solutions:

### Option 2: EmailJS (Client-side)
- No backend required
- Direct email sending from browser
- Requires EmailJS account setup

### Option 3: API Route with SendGrid
- More control over email formatting
- Requires backend API implementation
- Good for complex email logic

Your Netlify Forms setup is ready! 🎉 