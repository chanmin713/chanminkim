'use client'

import { useCallback } from 'react'
import styles from './page.module.css'
import Galaxy from '@/components/Galaxy'

export default function Home() {
  const handleDonateClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
    if (!isMobile) {
      e.preventDefault()
      alert('모바일에서만 가능합니다.')
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
          <a href="https://qr.kakaopay.com/FIX2EsLv8" target="_blank" rel="noopener noreferrer" className={styles.link} onClick={handleDonateClick}>Donate</a>
        </nav>
        <footer className={styles.footer}>
          <p>&copy; 2025 Chanmin Kim. All rights reserved.</p>
        </footer>
      </div>

      <main className={styles.content}>
        <h1 className={styles.name}>Chanmin Kim</h1>
      </main>
    </>
  )
}

