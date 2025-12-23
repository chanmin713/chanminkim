'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './page.module.css'

const Prism = dynamic(() => import('@/components/Prism'), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  const [prismScale, setPrismScale] = useState(3.6)

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

    // 화면 크기에 따라 Prism scale 조정
    const updateScale = () => {
      const width = window.innerWidth
      if (width <= 480) {
        setPrismScale(2.2)
      } else if (width <= 640) {
        setPrismScale(2.6)
      } else if (width <= 768) {
        setPrismScale(3.0)
      } else {
        setPrismScale(3.6)
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)

    document.addEventListener('touchmove', preventScroll, { passive: false })
    document.addEventListener('wheel', preventWheel, { passive: false })
    document.addEventListener('scroll', preventScrollEvent, { passive: false })

    return () => {
      window.removeEventListener('resize', updateScale)
      document.removeEventListener('touchmove', preventScroll)
      document.removeEventListener('wheel', preventWheel)
      document.removeEventListener('scroll', preventScrollEvent)
    }
  }, [])

  return (
    <>
      <div className={styles.videoContainer}>
        <Prism 
          transparent={true}
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={prismScale}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
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

