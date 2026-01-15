# Gmail SMTP Setup for Contact Form

This guide will help you set up Gmail SMTP with an App Password to receive contact form submissions directly to your email.

## Prerequisites
- A Gmail account
- 2-Factor Authentication enabled on your Google account

## Step-by-Step Setup

### 1. Enable 2-Factor Authentication (if not already enabled)
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click on "2-Step Verification"
3. Follow the prompts to enable 2FA

### 2. Generate an App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. You may need to sign in again
3. In the "Select app" dropdown, choose "Mail"
4. In the "Select device" dropdown, choose "Other (Custom name)"
5. Enter a name like "Portfolio Contact Form"
6. Click "Generate"
7. Google will show you a 16-character password - **copy this immediately** (you won't be able to see it again)

### 3. Configure Environment Variables
1. Create or edit your `.env.local` file in the project root
2. Add the following variables:
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```
Replace:
- `your-email@gmail.com` with your actual Gmail address
- `abcd efgh ijkl mnop` with the 16-character app password (you can include or remove spaces)

### 4. For Netlify Deployment
1. Go to your Netlify site dashboard
2. Navigate to Site settings → Environment variables
3. Add two new variables:
   - `GMAIL_USER` = your Gmail address
   - `GMAIL_APP_PASSWORD` = your 16-character app password

### 5. Test the Setup
1. Run your development server: `npm run dev`
2. Go to the contact form on your portfolio
3. Fill out and submit the form
4. Check your Gmail inbox - you should receive an email with the form contents

## How It Works

When a user submits the contact form:
1. The form data is sent to `/api/send-email` (Next.js API route)
2. The API route uses nodemailer to connect to Gmail's SMTP server
3. An email is sent to your Gmail address with:
   - Sender's name and email
   - Subject line
   - Message content
   - Reply-To set to sender's email (so you can easily reply)

## Security Notes

- ✅ App Passwords are more secure than using your actual Gmail password
- ✅ The `.env.local` file is in `.gitignore` (never commit it)
- ✅ App Passwords can be revoked at any time from your Google Account
- ✅ Each app password is specific to one application

## Troubleshooting

### Email not sending
- Double-check your `GMAIL_USER` is correct
- Ensure `GMAIL_APP_PASSWORD` has no typos
- Verify 2FA is enabled on your Google account
- Check the API route logs for specific errors

### "Less secure app access" error
- You don't need to enable "less secure apps" when using App Passwords
- App Passwords work with accounts that have 2FA enabled

### Can't find App Passwords option
- Make sure 2-Factor Authentication is enabled first
- Try accessing directly: https://myaccount.google.com/apppasswords

## Alternative: Using a Different Email Provider

If you prefer not to use Gmail, you can modify the nodemailer configuration in `/src/app/api/send-email/route.ts`:

```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})
```

Popular alternatives:
- **Outlook/Office365**: `smtp.office365.com`, port 587
- **Yahoo**: `smtp.mail.yahoo.com`, port 587
- **Custom Domain**: Check your email provider's SMTP settings
