'use client'

import { usePathname } from 'next/navigation'
import styles from './DesktopHeader.module.css'
import Logo from './Logo'
import Navigation from './Navigation'
import CenterName from './CenterName'

export default function DesktopHeader() {
  const pathname = usePathname()
  // pathname이 null이거나 '/'일 때 메인 페이지로 간주
  const isHomePage = pathname === '/' || pathname === null

  return (
    <header className={styles.header}>
      {/* 왼쪽 상단 로고 - 메인 페이지가 아닐 때만 표시 */}
      {!isHomePage && <Logo />}

      {/* 데스크톱 네비게이션 */}
      <Navigation />

      {/* 중앙 큰 이름 - 메인 페이지에서만 표시 */}
      {isHomePage && <CenterName />}
    </header>
  )
}

