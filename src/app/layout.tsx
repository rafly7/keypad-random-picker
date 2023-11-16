import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import HomeNav from '@/components/HomeNav/HomeNav'
import Seo from '@/utils/seo'
import classNames from 'classnames'

const openSans = Open_Sans({subsets: ['latin']})

export const metadata: Metadata = {
  title: Seo.title,
  keywords: Seo.keywords,
  description: Seo.description,
  openGraph: {
    title: Seo.title,
    description: Seo.description,
  },
  twitter: {
    title: Seo.title,
    description: Seo.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={classNames(openSans.className, 'bg-[#7f8c8d] dark:bg-[#2c3e50]')}>
          <HomeNav />
          {children}
      </body>
    </html>
  )
}
