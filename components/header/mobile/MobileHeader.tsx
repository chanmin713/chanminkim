'use client'

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
      <div className={`${styles.mobileHeaderBar} ${isSmallScreen ? styles.smallScreen : ''}`}>
        {/* 왼쪽 상단 로고 - 메인 페이지가 아닐 때만 표시 */}
        {!isHomePage && <MobileLogo />}

        {/* 모바일 햄버거 버튼 - 오른쪽 정렬 */}
        <HamburgerButton />
      </div>

      {/* 모바일 메뉴 */}
      <MobileMenu />

      {/* 중앙 큰 이름 - 메인 페이지에서만 표시 */}
      {isHomePage && <MobileCenterName />}
    </>
  )
}

