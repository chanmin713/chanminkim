'use client'

import { usePathname } from 'next/navigation'
import HamburgerButton from './HamburgerButton'
import MobileMenu from './MobileMenu'
import MobileLogo from './MobileLogo'
import MobileCenterName from './MobileCenterName'
import styles from './MobileHeader.module.css'

export default function MobileHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === '/' || pathname === null

  return (
    <>
      {/* 모바일 헤더 바 */}
      <div className={styles.headerBar}>
        {/* 왼쪽 상단 로고 - 메인 페이지가 아닐 때만 표시 */}
        {!isHomePage && <MobileLogo />}

        {/* 모바일 햄버거 버튼 */}
        <HamburgerButton />
      </div>

      {/* 모바일 메뉴 */}
      <MobileMenu />

      {/* 중앙 큰 이름 - 메인 페이지에서만 표시 */}
      {isHomePage && <MobileCenterName />}
    </>
  )
}

