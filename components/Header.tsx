'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'
import Logo from './Logo'
import Navigation from './Navigation'
import HamburgerButton from './HamburgerButton'
import MobileMenu from './MobileMenu'
import CenterName from './CenterName'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  // pathname이 null이거나 '/'일 때 메인 페이지로 간주
  const isHomePage = pathname === '/' || pathname === null

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      {/* 왼쪽 상단 로고 - 메인 페이지가 아닐 때만 표시 */}
      {!isHomePage && <Logo />}

      {/* 데스크톱 네비게이션 */}
      <Navigation />

      {/* 모바일 햄버거 버튼 */}
      <HamburgerButton isMenuOpen={isMenuOpen} onToggle={toggleMenu} />

      {/* 모바일 메뉴 */}
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />

      {/* 중앙 큰 이름 - 메인 페이지에서만 표시 */}
      {isHomePage && <CenterName />}
    </header>
  )
}

