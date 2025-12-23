'use client'

import LiquidGlass from 'liquid-glass-react'
import { navigationLinks } from '@/lib/navigation'
import styles from './DesktopHeader.module.css'

interface NavigationProps {
  isHomePage?: boolean
}

export default function Navigation({ isHomePage = false }: NavigationProps) {
  // 모든 페이지에서 동일한 스타일 (헤더 컨테이너 내부에서 중앙 정렬)
  const containerStyle = {
    position: 'absolute' as const,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.75rem',
    pointerEvents: 'auto' as const,
    fontFamily: 'var(--font-ibm-plex-mono), monospace',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }

  return (
    <LiquidGlass
      displacementScale={120}
      blurAmount={0.3}
      saturation={180}
      aberrationIntensity={4}
      elasticity={0}
      cornerRadius={40}
      padding="0.625rem 1.5rem"
      mode="prominent"
      overLight={false}
      style={containerStyle}
    >
      <nav style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
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
    </LiquidGlass>
  )
}

