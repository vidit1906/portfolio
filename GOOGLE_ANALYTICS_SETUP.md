# Google Analytics Setup Instructions

## 🚀 Quick Setup

### 1. **Get Your Google Analytics Tracking ID**

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" 
4. Set up your account:
   - **Account Name**: `Vidit Portfolio`
   - **Property Name**: `Vidit Portfolio Website`
   - **Website URL**: `https://your-domain.com` (or localhost for testing)
   - **Industry**: `Technology`
   - **Time Zone**: Your timezone

5. After setup, you'll get a **Measurement ID** that looks like: `G-XXXXXXXXXX`

### 2. **Add Your Tracking ID to the Project**

Create a file called `.env.local` in your project root and add:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Google Analytics Measurement ID.

### 3. **What's Already Implemented**

✅ **Google Analytics Integration** - Tracks page views automatically
✅ **Resume Download Tracking** - Tracks when users download your resume
✅ **Social Media Click Tracking** - Tracks GitHub/LinkedIn clicks
✅ **Contact Form Tracking** - Tracks form submissions
✅ **TypeScript Support** - Proper type definitions included

### 4. **Analytics Data You'll See**

- **Page Views**: Which sections users visit most
- **User Demographics**: Age, gender, interests
- **Geographic Data**: Countries, cities, languages
- **Device Data**: Mobile vs desktop, browsers, screen sizes
- **Custom Events**:
  - Resume downloads
  - Social media clicks
  - Contact form submissions

### 5. **Privacy Compliance**

The implementation is privacy-friendly:
- Only loads if GA_ID is provided
- Uses `afterInteractive` loading strategy
- Tracks anonymized user data
- No PII (personally identifiable information) collected

### 6. **Testing**

1. Add your GA ID to `.env.local`
2. Restart your development server: `npm run dev`
3. Visit your site and interact with it
4. Check Google Analytics Real-Time reports

### 7. **For Production**

When deploying to Vercel/Netlify, add the environment variable:
- **Vercel**: Dashboard → Project → Settings → Environment Variables
- **Netlify**: Dashboard → Site → Settings → Environment Variables

Add: `NEXT_PUBLIC_GA_ID` = `your-measurement-id`

## 📊 **View Your Analytics**

After setup, visit [Google Analytics](https://analytics.google.com/) to see:
- Real-time visitors
- Page views and popular sections
- User demographics and locations
- Device and browser statistics
- Custom events (downloads, clicks, form submissions)

## 🔧 **File Structure**

```
src/
├── components/
│   └── GoogleAnalytics.tsx     # GA component
├── lib/
│   └── gtag.ts                 # Tracking functions
├── types/
│   └── gtag.d.ts              # TypeScript definitions
└── app/
    └── layout.tsx             # GA integration
```

Your Google Analytics is now ready to track all user interactions on your portfolio! 🎉 