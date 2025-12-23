'use client'

import { useState } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      {/* 데스크톱 네비게이션 */}
      <nav className={styles.navBar}>
        <a href="/about" className={styles.navLink}>
          About
        </a>
        <a href="/projects" className={styles.navLink}>
          Projects
        </a>
        <a href="/blog" className={styles.navLink}>
          Blog
        </a>
        <a href="mailto:chanmin713@snu.ac.kr" className={styles.navLink}>
          Contact
        </a>
      </nav>

      {/* 모바일 햄버거 버튼 */}
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

      {/* 모바일 메뉴 */}
      <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
        <a href="/about" className={styles.mobileLink} onClick={closeMenu}>
          About
        </a>
        <a href="/projects" className={styles.mobileLink} onClick={closeMenu}>
          Projects
        </a>
        <a href="/blog" className={styles.mobileLink} onClick={closeMenu}>
          Blog
        </a>
        <a href="mailto:chanmin713@snu.ac.kr" className={styles.mobileLink} onClick={closeMenu}>
          Contact
        </a>
      </nav>

      <div className={styles.headerContent}>
        <h1 className={styles.name}>Chanmin Kim</h1>
      </div>
    </header>
  )
}

