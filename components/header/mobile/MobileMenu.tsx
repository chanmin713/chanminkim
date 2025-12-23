'use client'

import { navigationLinks } from '@/lib/navigation'
import styles from './MobileHeader.module.css'
import { useMobileMenu } from '../shared/MobileMenuContext'

export default function MobileMenu() {
  const { isMenuOpen, closeMenu } = useMobileMenu()

  return (
    <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
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
  )
}

