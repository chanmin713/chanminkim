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
        <nav className={styles.topLinks}>
          <a href="mailto:chanmin713@snu.ac.kr" className={styles.link}>Contact</a>
          <a href="https://github.com/chanmin713" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
          <a href="https://www.instagram.com/chn_m1n/" target="_blank" rel="noopener noreferrer" className={styles.link}>Instagram</a>
          <a href="https://www.linkedin.com/in/chanmin-kim-4a62a937a/" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
          <a href="https://blog.naver.com/zzzangm1n" target="_blank" rel="noopener noreferrer" className={styles.link}>Blog</a>
        </nav>
        <footer className={styles.footer}>
          <p>&copy; 2025 Chanmin Kim. All rights reserved.</p>
        </footer>
      </div>

      <main className={styles.content}>
        <h1 className={styles.name}>Chanmin Kim</h1>
        <p className={styles.tagline}>Dreamer. Builder. Learner.</p>
      </main>
    </>
  )
}

