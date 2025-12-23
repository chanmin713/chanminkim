'use client'

import { navigationLinks } from '@/lib/navigation'
import styles from './Header.module.css'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <nav className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ''}`}>
      {navigationLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={styles.mobileLink}
          onClick={onClose}
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

