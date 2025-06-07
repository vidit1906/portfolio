# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features dark/light mode toggle, smooth animations, and a contact form.

## Features

- 🌙 Dark/Light mode toggle
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion
- 📝 Contact form with validation
- 🎨 Modern UI with Tailwind CSS
- 🔗 Social media links (GitHub, LinkedIn)
- 📄 Resume download functionality
- ⚡ Built with Next.js 15 and TypeScript

## Sections

- **About Me**: Introduction with profile photo and social links
- **Experience**: Timeline of work experience
- **Projects**: Showcase of personal projects
- **Education**: Educational background and certifications
- **Contact**: Contact form with validation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Personal Information
- Update personal details in each component (`src/components/`)
- Replace social media links with your own
- Add your actual resume PDF to `public/resume.pdf`

### Content
- **About**: Edit `src/components/About.tsx`
- **Experience**: Update the `experiences` array in `src/components/Experience.tsx`
- **Projects**: Modify the `projects` array in `src/components/Projects.tsx`
- **Education**: Update the `education` array in `src/components/Education.tsx`
- **Contact**: Modify contact information in `src/components/Contact.tsx`

### Styling
- Colors and themes: `src/app/globals.css` and `tailwind.config.ts`
- Component styling: Individual component files

### Contact Form
The contact form includes client-side validation using React Hook Form and Zod. To make it functional:
1. Set up a backend API endpoint or use a service like Formspree, Netlify Forms, or EmailJS
2. Update the `onSubmit` function in `src/components/Contact.tsx`

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **Lucide React**: Icon library
- **Next Themes**: Theme management

## Deployment

The easiest way to deploy your portfolio is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with a single click

Alternatively, you can deploy to other platforms like Netlify, AWS, or any static hosting service.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to fork this project and make it your own! If you have suggestions for improvements, please open an issue or submit a pull request.
