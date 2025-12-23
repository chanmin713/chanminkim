'use client'

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

  return (
    <>
      {/* 모바일 헤더 바 */}
      <LiquidGlass
        displacementScale={120}
        blurAmount={0.3}
        saturation={180}
        aberrationIntensity={4}
        elasticity={0}
        cornerRadius={32}
        padding={isSmallScreen ? "0.625rem 0.875rem" : "0.75rem 1rem"}
        mode="prominent"
        overLight={false}
        style={{
          position: 'fixed',
          top: isSmallScreen ? '2rem' : '2.5rem',
          left: isSmallScreen ? '1.25rem' : '1.5rem',
          right: isSmallScreen ? '1.25rem' : '1.5rem',
          zIndex: 30,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* 왼쪽 상단 로고 - 메인 페이지가 아닐 때만 표시 */}
        {!isHomePage && <MobileLogo />}

        {/* 모바일 햄버거 버튼 */}
        <HamburgerButton />
      </LiquidGlass>

      {/* 모바일 메뉴 */}
      <MobileMenu />

      {/* 중앙 큰 이름 - 메인 페이지에서만 표시 */}
      {isHomePage && <MobileCenterName />}
    </>
  )
}

