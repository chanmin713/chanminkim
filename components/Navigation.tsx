'use client'

import { navigationLinks } from '@/lib/navigation'
import styles from './Header.module.css'

export default function Navigation() {
  return (
    <nav className={styles.navBar}>
      {navigationLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={styles.navLink}
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

