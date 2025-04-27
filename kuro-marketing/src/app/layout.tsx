import { type Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { RootLayout } from '@/components/RootLayout'
import { projectConfig } from '@/config'

import '@/styles/tailwind.css'

const font = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: projectConfig.seo.title,
  description: projectConfig.seo.description,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full bg-neutral-950 text-base antialiased ${font.variable}`}>
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
