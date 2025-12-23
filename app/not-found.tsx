'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // 404 페이지가 나타나면 메인 페이지로 리다이렉트
    router.push('/')
  }, [router])

  return null
}

