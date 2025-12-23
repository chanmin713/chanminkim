'use client'

import dynamic from 'next/dynamic'
import { usePrismScale } from '@/hooks/usePrismScale'
import { usePreventScroll } from '@/hooks/usePreventScroll'
import styles from './page.module.css'

const Prism = dynamic(() => import('@/components/ui/Prism'), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  const prismScale = usePrismScale()
  usePreventScroll()

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

