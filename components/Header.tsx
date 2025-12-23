'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, Instagram, Linkedin } from 'lucide-react'
import styles from './Header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const contactWrapperRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleContact = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsContactOpen(!isContactOpen)
  }

  const closeContact = () => {
    setIsContactOpen(false)
  }

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault()
    const email = 'chanmin713@snu.ac.kr'
    
    try {
      await navigator.clipboard.writeText(email)
      alert('이메일이 복사되었습니다: ' + email)
    } catch (err) {
      console.error('이메일 복사 실패:', err)
      // 폴백: 텍스트 영역 생성하여 복사
      const textArea = document.createElement('textarea')
      textArea.value = email
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        alert('이메일이 복사되었습니다: ' + email)
      } catch (fallbackErr) {
        alert('이메일 복사에 실패했습니다. 수동으로 복사해주세요: ' + email)
      }
      // 안전하게 제거
      if (textArea.parentNode) {
        textArea.parentNode.removeChild(textArea)
      } else {
        textArea.remove()
      }
    }
    closeContact()
  }

  // 외부 클릭 및 ESC 키로 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contactWrapperRef.current &&
        !contactWrapperRef.current.contains(event.target as Node)
      ) {
        setIsContactOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsContactOpen(false)
        setIsMenuOpen(false)
      }
    }

    if (isContactOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isContactOpen])

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
        <div className={styles.contactWrapper} ref={contactWrapperRef}>
          <button 
            className={styles.navLink}
            onClick={toggleContact}
            aria-expanded={isContactOpen}
          >
            Contact
          </button>
          {isContactOpen && (
            <div className={styles.contactDropdown}>
              <button 
                className={styles.contactLink}
                onClick={copyEmail}
              >
                <Mail size={14} />
                <span>Email</span>
              </button>
              <a 
                href="https://www.instagram.com/chn_m1n" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.contactLink}
                onClick={closeContact}
              >
                <Instagram size={14} />
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/chanmin-kim-4a62a937a" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.contactLink}
                onClick={closeContact}
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
            </div>
          )}
        </div>
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
        <div className={styles.mobileContactWrapper}>
          <button 
            className={styles.mobileLink}
            onClick={(e) => {
              e.preventDefault()
              setIsContactOpen(!isContactOpen)
            }}
            style={{ borderBottom: 'none' }}
          >
            Contact
          </button>
          {isContactOpen && (
            <div className={styles.mobileContactDropdown}>
              <button 
                className={styles.mobileContactLink}
                onClick={(e) => {
                  e.preventDefault()
                  copyEmail(e)
                  closeMenu()
                }}
              >
                <Mail size={16} />
                <span>Email</span>
              </button>
              <a 
                href="https://www.instagram.com/chn_m1n" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.mobileContactLink}
                onClick={(e) => {
                  setIsContactOpen(false)
                  setTimeout(() => closeMenu(), 100)
                }}
              >
                <Instagram size={16} />
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/chanmin-kim-4a62a937a" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.mobileContactLink}
                onClick={(e) => {
                  setIsContactOpen(false)
                  setTimeout(() => closeMenu(), 100)
                }}
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
            </div>
          )}
        </div>
      </nav>

      <div className={styles.headerContent}>
        <h1 className={styles.name}>Chanmin Kim</h1>
      </div>
    </header>
  )
}

