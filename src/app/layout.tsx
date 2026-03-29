import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from '@/components/ScrollToTop';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import AIChatbot from '@/components/AIChatbot';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vidit - Software Engineer Portfolio",
  description: "Software Engineer passionate about building innovative solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ScrollToTop />
        {children}
        <AIChatbot />
      </body>
    </html>
  );
}
