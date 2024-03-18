import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/context/ThemeProvider'


const inter = Inter({
  subsets: ['latin'],
  weight: ["100", '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
})

const spaceGrowtesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrowtesk'
})

export const metadata: Metadata = {
  title: 'CodeFlow',
  description: 'The ultimate forum for developers. Join the conversation, ask questions, and learn from others. Boost your coding skills and accelerate your growth with CodeFlows vibrant community and extensive knowledge base.',
  icons: {
    icon: '/public/assets/images/site-logo.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className={`${inter.variable} ${spaceGrowtesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'primary-gradient',
              footerActionLink: 'primary-text-gradient hover:text-primary-500'
            }
          }}
        >
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}