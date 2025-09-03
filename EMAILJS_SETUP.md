# EmailJS Contact Form Setup Guide

## 🚀 Complete Setup Instructions

Your contact form is now configured with **EmailJS** for reliable email functionality! Follow these steps to complete the setup:

## Step 1: Create EmailJS Account

1. **Go to EmailJS**: Visit [emailjs.com](https://www.emailjs.com/)
2. **Sign up**: Create a free account
3. **Verify email**: Check your email and verify your account

## Step 2: Connect Email Service

1. **Go to Email Services**: In your EmailJS dashboard
2. **Add service**: Click "Add New Service"
3. **Choose Gmail**: Select Gmail (recommended) or your preferred email provider
4. **Connect account**: Follow the OAuth flow to connect your Gmail account
5. **Copy Service ID**: You'll get a Service ID like `service_xxxxxxx`

## Step 3: Create Email Template

1. **Go to Email Templates**: In your EmailJS dashboard
2. **Create template**: Click "Create New Template"
3. **Template content**: Use this template:

```
Subject: New Contact Form Submission - {{subject}}

Hello Vidit,

You have received a new message from your portfolio website:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. **Template variables**: Make sure these variables are included:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{to_name}}`
   - `{{to_email}}`

5. **Copy Template ID**: You'll get a Template ID like `template_xxxxxxx`

## Step 4: Get Public Key

1. **Go to Account**: Click on your profile/account
2. **API Keys**: Find your Public Key
3. **Copy Public Key**: It looks like `xxxxxxxxxxxxxxx`

## Step 5: Add Environment Variables

Create or update your `.env.local` file in your project root:

```bash
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx

# Google Analytics (if you have it)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Replace the `xxxxxxx` values with your actual IDs from EmailJS.**

## Step 6: Test the Form

1. **Restart dev server**: `npm run dev`
2. **Test locally**: Fill out the contact form and submit
3. **Check email**: You should receive an email at `viditnaik@gmail.com`

## Step 7: Deploy to Netlify

1. **Add environment variables** in Netlify:
   - Go to your Netlify site dashboard
   - **Settings** → **Environment variables**
   - Add all three EmailJS variables:
     - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
     - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
     - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

2. **Redeploy**: Trigger a new deployment or push changes to GitHub

## 🎯 How It Works

- ✅ **Client-side**: No backend required
- ✅ **Secure**: Uses OAuth for email authentication
- ✅ **Reliable**: 99.9% delivery rate
- ✅ **Free tier**: 200 emails/month (perfect for portfolio)
- ✅ **Spam protection**: Built-in spam filtering
- ✅ **Custom templates**: Professional email formatting

## 📧 Email Flow

1. **User fills form** → Form validates input
2. **Form submits** → EmailJS processes the data
3. **Email sent** → You receive formatted email
4. **User notified** → Success message shown

## 🔧 Troubleshooting

### Form not sending emails?
1. Check environment variables are set correctly
2. Verify EmailJS service is connected to Gmail
3. Check browser console for errors
4. Ensure template variables match the code

### Emails going to spam?
1. Check your spam folder
2. Add EmailJS to your email whitelist
3. Use your domain email for better deliverability

### Need more emails?
- EmailJS free tier: 200 emails/month
- Paid plans available for higher volume

## 🚀 Your Contact Form Features

- ✅ **Form validation** with error messages
- ✅ **Email delivery** to viditnaik@gmail.com
- ✅ **Professional templates** with all form data
- ✅ **Google Analytics tracking** for submissions
- ✅ **Mobile responsive** design
- ✅ **Loading states** and user feedback

Your contact form is now production-ready! 🎉

## Alternative Solutions

If you prefer other options:

1. **Formspree**: Simple form backend service
2. **Netlify Functions**: Serverless API endpoints
3. **SendGrid API**: Enterprise email solution
4. **Nodemailer**: Full backend implementation

EmailJS is recommended for portfolios because it's simple, reliable, and requires no backend setup!
