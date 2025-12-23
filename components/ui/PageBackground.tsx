'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const BLACK_BACKGROUND = '#000000'

export default function PageBackground() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const backgroundColor = isHomePage ? 'transparent' : BLACK_BACKGROUND
    
    document.body.style.backgroundColor = backgroundColor
    document.documentElement.style.backgroundColor = backgroundColor
  }, [isHomePage])

  return null
}

