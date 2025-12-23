'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import styles from './page.module.css'

const Galaxy = dynamic(() => import('@/components/Galaxy'), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  useEffect(() => {
    // 모바일에서 스크롤 방지
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

  return (
    <>
      <div className={styles.videoContainer}>
        <Galaxy 
          transparent={true}
          mouseInteraction={true}
          mouseRepulsion={true}
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
        <div className={styles.videoOverlay}></div>
      </div>

      <div className={styles.bottomContainer}>
        <footer className={styles.footer}>
          <p className={styles.copyright}>&copy; 2025 Chanmin Kim. All rights reserved.</p>
        </footer>
      </div>

    </>
  )
}

