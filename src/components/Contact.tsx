"use client"

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { trackContactForm } from '@/lib/gtag'
import emailjs from '@emailjs/browser'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    // Track form submission
    trackContactForm()
    
    try {
      // EmailJS configuration
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      // Check if EmailJS is configured
      if (!serviceID || !templateID || !publicKey || 
          serviceID === 'your_service_id' || 
          templateID === 'your_template_id' || 
          publicKey === 'your_public_key') {
        
        // Fallback: Show form data and direct user to email
        console.log('Form submission data:', data)
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact: ${data.subject}`)
        const body = encodeURIComponent(
          `Hi Vidit,\n\n` +
          `Name: ${data.name}\n` +
          `Email: ${data.email}\n` +
          `Subject: ${data.subject}\n\n` +
          `Message:\n${data.message}\n\n` +
          `---\nSent from your portfolio contact form`
        )
        
        const mailtoLink = `mailto:viditnaik@gmail.com?subject=${subject}&body=${body}`
        window.open(mailtoLink, '_blank')
        
        alert('Opening your email client with the message pre-filled. Alternatively, you can copy the details and email me directly at viditnaik@gmail.com')
        reset()
        return
      }

      // Prepare template parameters
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: 'Vidit',
        to_email: 'viditnaik@gmail.com'
      }

      // Send email via EmailJS
      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      )

      if (response.status === 200) {
        alert('Message sent successfully! I\'ll get back to you soon.')
        reset()
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      
      // Fallback: Create mailto link
      const subject = encodeURIComponent(`Portfolio Contact: ${data.subject}`)
      const body = encodeURIComponent(
        `Hi Vidit,\n\n` +
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Subject: ${data.subject}\n\n` +
        `Message:\n${data.message}\n\n` +
        `---\nSent from your portfolio contact form`
      )
      
      const mailtoLink = `mailto:viditnaik@gmail.com?subject=${subject}&body=${body}`
      window.open(mailtoLink, '_blank')
      
      alert('There was an issue with the form service. I\'ve opened your email client with the message pre-filled. You can also email me directly at viditnaik@gmail.com')
      reset()
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'viditnaik@gmail.com',
      href: 'mailto:viditnaik@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (951) 425-7229',
      href: 'tel:+19514257229',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Riverside, CA',
      href: '#',
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities and interesting projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Let&apos;s Talk
            </h3>
            <p className="text-muted-foreground mb-8">
              Whether you have a project in mind or just want to chat about technology,
              I&apos;d love to hear from you.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
                >
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{info.label}</p>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="What&apos;s this about?"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  placeholder="Tell me about your project or idea..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact 