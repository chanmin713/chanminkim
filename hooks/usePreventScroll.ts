import { useEffect } from 'react'

/**
 * 스크롤을 방지하는 훅
 * 메인 페이지에서 Prism 배경이 고정되어 있을 때 사용
 */
export function usePreventScroll() {
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (e.touches.length > 1) return // 멀티터치 허용
      e.preventDefault()
    }

    const preventWheel = (e: WheelEvent) => {
      e.preventDefault()
    }

    const preventScrollEvent = (e: Event) => {
      e.preventDefault()
    }

    document.addEventListener('touchmove', preventScroll, { passive: false })
    document.addEventListener('wheel', preventWheel, { passive: false })
    document.addEventListener('scroll', preventScrollEvent, { passive: false })

    return () => {
      document.removeEventListener('touchmove', preventScroll)
      document.removeEventListener('wheel', preventWheel)
      document.removeEventListener('scroll', preventScrollEvent)
    }
  }, [])
}

