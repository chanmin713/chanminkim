'use client'

import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // SSR에서는 기본값 false 사용
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia(query)
    
    // 초기값 설정
    setMatches(mediaQuery.matches)

    // 변경 감지 핸들러
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // 이벤트 리스너 등록 (addEventListener가 지원되는 경우)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      // 구형 브라우저 지원 (addListener)
      mediaQuery.addListener(handler)
      return () => mediaQuery.removeListener(handler)
    }
  }, [query])

  return matches
}

