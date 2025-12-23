'use client'

import { useEffect, useState } from 'react'
import LiquidGlass from 'liquid-glass-react'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import HamburgerButton from './HamburgerButton'
import MobileMenu from './MobileMenu'
import MobileLogo from './MobileLogo'
import MobileCenterName from './MobileCenterName'
import styles from './MobileHeader.module.css'

export default function MobileHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === '/' || pathname === null
  const isSmallScreen = useMediaQuery('(max-width: 640px)') ?? false
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // LiquidGlass 스타일 - PC Navigation과 동일한 방식
  const glassStyle = {
    position: 'absolute' as const,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    pointerEvents: 'auto' as const,
    transition: isMounted ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
  }

  return (
    <>
      {/* 모바일 헤더 바 위치 래퍼 */}
      <div className={`${styles.mobileHeaderBarWrapper} ${isSmallScreen ? styles.smallScreen : ''}`}>
        <LiquidGlass
          displacementScale={120}
          blurAmount={0.35}
          saturation={200}
          aberrationIntensity={3}
          elasticity={0}
          cornerRadius={28}
          padding={isSmallScreen ? "0.875rem 1.25rem" : "1rem 1.5rem"}
          mode="prominent"
          overLight={false}
          style={glassStyle}
        >
          <div className={styles.headerBarContent}>
            {/* 왼쪽 상단 로고 - 항상 표시 */}
            <MobileLogo />

            {/* 모바일 햄버거 버튼 - 오른쪽 정렬 */}
            <HamburgerButton />
          </div>
        </LiquidGlass>
      </div>

      {/* 모바일 메뉴 */}
      <MobileMenu />

      {/* 중앙 큰 이름 - 메인 페이지에서만 표시 */}
      {isHomePage && <MobileCenterName />}
    </>
  )
}

