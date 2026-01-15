import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email to yourself (notification)
    const notificationEmail = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email, // Allow replying directly to the sender
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #4F46E5; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #888; font-size: 12px; text-align: center;">
            This email was sent from your portfolio contact form
          </p>
        </div>
      `,
    }

    // Confirmation email to sender
    const confirmationEmail = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Thank you for reaching out!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            Thank You for Your Message!
          </h2>
          
          <p style="color: #555; line-height: 1.6;">
            Hi ${name},
          </p>
          
          <p style="color: #555; line-height: 1.6;">
            Thank you for reaching out through my portfolio. I've received your message and will get back to you as soon as possible.
          </p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
            <div style="background-color: #fff; padding: 15px; border-radius: 4px; margin-top: 10px;">
              <p style="color: #555; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            Best regards,<br>
            <strong>Vidit Naik</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #888; font-size: 12px; text-align: center;">
            This is an automated confirmation from viditnaik.com
          </p>
        </div>
      `,
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(notificationEmail),
      transporter.sendMail(confirmationEmail),
    ])

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
