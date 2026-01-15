# AI Chatbot Setup Guide

Your portfolio now includes an AI-powered chatbot using Google's Gemini API! This guide will help you get it up and running.

## Features

✨ **Floating Chat Icon**: A beautiful floating button in the bottom-right corner
🤖 **AI-Powered**: Uses Gemini 2.0 Flash Exp model for intelligent responses
📚 **Knowledge Base**: Responds based on your resume and professional information
💬 **Conversational**: Maintains context across the conversation
🎨 **Smooth Animations**: Beautiful Framer Motion animations
📱 **Responsive**: Works great on all screen sizes

## Quick Setup

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Click **"Create API key in new project"** (or select an existing project)
5. Copy the generated API key

### 2. Configure Environment Variables

Open your `.env.local` file and replace `your-gemini-api-key-here` with your actual API key:

```env
GEMINI_API_KEY=AIzaSyC_YourActualAPIKeyHere
```

### 3. For Netlify Deployment

Add the environment variable in Netlify:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings → Environment variables**
3. Add a new variable:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key

## How It Works

### User Experience

1. **Floating Button**: Visitors see a pulsing chat icon in the bottom-right
2. **Click to Open**: Clicking opens a beautiful chat window
3. **Suggested Questions**: Initial greeting with suggested questions
4. **Natural Conversation**: Users can ask about your experience, skills, projects, etc.
5. **Quick Responses**: Gemini generates contextual responses in seconds

### Technical Architecture

```
User Question
     ↓
Frontend (AIChatbot.tsx)
     ↓
API Route (/api/chat)
     ↓
Gemini AI + Knowledge Base
     ↓
Contextual Response
     ↓
Frontend Display
```

### Knowledge Base

The chatbot uses `src/data/knowledge-base.md` which contains:
- Your education and degrees
- Professional experience at all companies
- Technical skills and expertise
- Project details and achievements
- Contact information

**To update the knowledge**: Simply edit `src/data/knowledge-base.md` - no code changes needed!

## Customization Options

### Change the AI Model

In `src/app/api/chat/route.ts`, update the model:

```typescript
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash-exp' // or 'gemini-pro', 'gemini-1.5-pro', etc.
})
```

Available models:
- `gemini-2.0-flash-exp` - Fast, experimental (recommended)
- `gemini-1.5-pro` - More powerful, slower
- `gemini-1.5-flash` - Balanced speed and quality

### Customize Appearance

Edit `src/components/AIChatbot.tsx`:

**Colors**: Change `bg-primary`, `bg-secondary` classes
**Size**: Modify `w-[380px] h-[600px]` in the chat window
**Position**: Change `bottom-6 right-6` for different placement
**Icon**: Replace `<MessageCircle />` with any Lucide icon

### Modify System Prompt

In `src/app/api/chat/route.ts`, customize the `systemPrompt`:

```typescript
const systemPrompt = `You are Vidit Naik's AI assistant...`
```

Change the tone, add personality, or adjust behavior here.

### Add Suggested Questions

In `src/components/AIChatbot.tsx`, edit the `suggestedQuestions` array:

```typescript
const suggestedQuestions = [
  "What's Vidit's experience with AI/ML?",
  "Your custom question here",
  // Add more...
]
```

## Usage Examples

Visitors can ask:
- "What's Vidit's experience with AI and machine learning?"
- "Tell me about his work at Checksum AI"
- "What technologies does he know?"
- "Has he worked with React and Node.js?"
- "What projects has he built?"
- "How can I contact him?"
- "What's his educational background?"

## Cost Considerations

### Gemini API Pricing (as of 2026)

**Gemini 2.0 Flash Exp** (Free tier):
- 1,500 requests per day
- 1 million tokens per minute
- 10 million tokens per day

This is **completely free** for moderate usage! Perfect for a portfolio site.

**If you exceed free tier:**
- Gemini 1.5 Flash: $0.075 per 1M input tokens, $0.30 per 1M output tokens
- Gemini 1.5 Pro: $3.50 per 1M input tokens, $10.50 per 1M output tokens

For a typical portfolio, you'll likely stay well within the free tier.

## Testing Locally

1. Make sure your API key is in `.env.local`
2. Restart your dev server: `npm run dev`
3. Open your portfolio: `http://localhost:3005`
4. Click the chat icon in the bottom-right
5. Try asking questions!

## Troubleshooting

### Chat button not showing
- Check that `<AIChatbot />` is added to `layout.tsx`
- Verify the component is imported correctly

### "API key not configured" error
- Ensure `GEMINI_API_KEY` is set in `.env.local`
- Restart your dev server after adding the key
- For Netlify, check environment variables in dashboard

### Responses are generic/incorrect
- Review and update `knowledge-base.md` with accurate information
- Adjust the system prompt in the API route
- Consider using a more powerful model like `gemini-1.5-pro`

### Rate limit errors
- Free tier has 1,500 requests/day
- Implement caching for common questions
- Consider upgrading to paid tier if needed

## Advanced Features (Optional)

### Add Typing Indicator

Show "Vidit is typing..." animation while waiting for response.

### Message Persistence

Save conversation history in localStorage to persist across page reloads.

### Analytics

Track what questions visitors ask to improve your portfolio content.

### Voice Input

Add speech-to-text for voice questions (Web Speech API).

### Multi-language Support

Add language detection and respond in visitor's language.

## Security Notes

- ✅ API key is server-side only (not exposed to frontend)
- ✅ Rate limiting is handled by Gemini API
- ✅ Input validation prevents malicious queries
- ✅ No user data is stored (unless you add that feature)

## Support

For issues:
1. Check the browser console for errors
2. Review Gemini API docs: https://ai.google.dev/docs
3. Verify your API key is valid and active
4. Check Netlify build logs for deployment issues

## Next Steps

- Add your Gemini API key
- Test the chatbot locally
- Update knowledge base with any additional info
- Deploy to Netlify
- Share your awesome AI-powered portfolio! 🚀
