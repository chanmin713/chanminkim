'use client'

import styles from './Header.module.css'

interface HamburgerButtonProps {
  isMenuOpen: boolean
  onToggle: () => void
}

export default function HamburgerButton({ isMenuOpen, onToggle }: HamburgerButtonProps) {
  return (
    <button
      className={styles.hamburger}
      onClick={onToggle}
      aria-expanded={isMenuOpen}
      aria-label="메뉴 열기/닫기"
    >
      <span className={styles.hamburgerLine}></span>
      <span className={styles.hamburgerLine}></span>
      <span className={styles.hamburgerLine}></span>
    </button>
  )
}

