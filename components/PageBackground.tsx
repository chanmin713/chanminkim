'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function PageBackground() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    // 초기 로딩 시 검정 배경 유지
    document.body.style.backgroundColor = '#000000'
    document.documentElement.style.backgroundColor = '#000000'

    // 메인 페이지가 아닐 때만 검정 배경 유지
    if (!isHomePage) {
      document.body.style.backgroundColor = '#000000'
      document.documentElement.style.backgroundColor = '#000000'
    } else {
      // 메인 페이지에서는 배경 투명하게 (Prism 배경이 보이도록)
      document.body.style.backgroundColor = 'transparent'
      document.documentElement.style.backgroundColor = 'transparent'
    }
  }, [isHomePage])

  // 초기 마운트 시 즉시 배경 설정
  useEffect(() => {
    document.body.style.backgroundColor = '#000000'
    document.documentElement.style.backgroundColor = '#000000'
  }, [])

  return null
}

