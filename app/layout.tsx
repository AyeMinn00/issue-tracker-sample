import { Container, Theme, ThemePanel } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './Navbar';
import './globals.css';
import './theme-config.css';
import AuthProvider from './auth/AuthProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', })

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Issue Tracker Overview',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          <Theme appearance="light" accentColor="iris" radius="large">
            <Navbar />
            <main className='p-5'>
              <Container>
                {children}
              </Container>
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html >
  )
}
