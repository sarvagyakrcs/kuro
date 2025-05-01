import { ThemeToggle } from '@/components/global/mode-toggle'
import { Link } from '@/components/ui/link'
import Image from 'next/image'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="max-h-screen overflow-hidden w-screen bg-background">
      <nav className='sticky bg-background/70 backdrop-blur-sm top-0 z-50 flex items-center justify-between px-10 py-4'>
        <Link href="/">
          <Image src="/logo.jpeg" alt="logo" width={32} height={32} />
        </Link>
        <ThemeToggle />
      </nav>
      {children}
    </div>
  )
}

export default AuthLayout