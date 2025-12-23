'use client'

import LiquidGlass from 'liquid-glass-react'
import { navigationLinks } from '@/lib/navigation'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from './MobileHeader.module.css'
import { useMobileMenu } from '../shared/MobileMenuContext'

export default function MobileMenu() {
  const { isMenuOpen, closeMenu } = useMobileMenu()
  const isSmallScreen = useMediaQuery('(max-width: 640px)') ?? false

  return (
    <LiquidGlass
      displacementScale={100}
      blurAmount={0.25}
      saturation={160}
      aberrationIntensity={3}
      elasticity={0}
      cornerRadius={0}
      padding={isSmallScreen ? "4.5rem 1.5rem 2rem 1.5rem" : "5rem 2rem 2rem 2rem"}
      mode="standard"
      overLight={false}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column',
        pointerEvents: isMenuOpen ? 'auto' : 'none',
        opacity: isMenuOpen ? 1 : 0,
        zIndex: 25,
        transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflowY: 'auto',
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
    </LiquidGlass>
  )
}

