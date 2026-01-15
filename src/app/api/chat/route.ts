import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Read knowledge base
const knowledgeBasePath = path.join(process.cwd(), 'src/data/knowledge-base.md')
const knowledgeBase = fs.readFileSync(knowledgeBasePath, 'utf-8')

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    // Build context with knowledge base and conversation history
    const systemPrompt = `You are Vidit Naik's AI assistant on his portfolio website. Your role is to help visitors learn about Vidit's background, skills, experience, and projects in a friendly and professional manner.

KNOWLEDGE BASE:
${knowledgeBase}

INSTRUCTIONS:
- Answer questions about Vidit's education, experience, skills, and projects based on the knowledge base
- Be conversational, friendly, and professional
- If asked about something not in the knowledge base, politely say you don't have that information
- Keep responses concise (2-3 paragraphs max) unless more detail is specifically requested
- You can suggest relevant topics visitors might want to learn more about
- Always speak in third person about Vidit (e.g., "Vidit has experience with..." not "I have experience with...")
- If asked about availability or contact, provide the email and LinkedIn from the knowledge base
- Highlight key achievements and quantifiable results when relevant

CURRENT CONVERSATION:`

    // Build conversation context
    let conversationContext = systemPrompt
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach((msg: { role: string; content: string }) => {
        conversationContext += `\n${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      })
    }
    conversationContext += `\nUser: ${message}\nAssistant:`

    // Generate response
    const result = await model.generateContent(conversationContext)
    const response = result.response
    const text = response.text()

    return NextResponse.json({ 
      message: text,
      success: true 
    })

  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
