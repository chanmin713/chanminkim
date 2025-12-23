'use client'

import { navigationLinks } from '@/lib/navigation'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from './MobileHeader.module.css'
import { useMobileMenu } from '../shared/MobileMenuContext'

export default function MobileMenu() {
  const { isMenuOpen, closeMenu } = useMobileMenu()
  const isSmallScreen = useMediaQuery('(max-width: 640px)') ?? false

  return (
    <div
      className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.menuOpen : ''} ${isSmallScreen ? styles.smallScreen : ''}`}
    >
      <nav className={styles.mobileNav}>
        {navigationLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={closeMenu}
            {...(link.openInNewTab
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

