import { cn } from '@/lib/utils'
import { PROJECT_NAME } from '@/metadata'
import Image from 'next/image'
import React from 'react'

type Props = {
  className?: string
  image?: boolean
}

const Logo = ({ className, image = true }: Props) => {
  return (
    <div className={cn('flex items-center gap-2 gap-x-3', className)}>
      {image && <Image src="/logo.jpeg" alt="Logo" width={32} height={32} />}
      <span className="text-lg font-semibold">{ PROJECT_NAME.toUpperCase() }</span>
    </div>
  )
}

export default Logo