'use client'

import styles from './MobileHeader.module.css'
import { useMobileMenu } from './MobileMenuContext'

export default function HamburgerButton() {
  const { isMenuOpen, toggleMenu } = useMobileMenu()

  return (
    <button
      className={styles.hamburger}
      onClick={toggleMenu}
      aria-expanded={isMenuOpen}
      aria-label="메뉴 열기/닫기"
    >
      <span className={styles.hamburgerLine}></span>
      <span className={styles.hamburgerLine}></span>
      <span className={styles.hamburgerLine}></span>
    </button>
  )
}

