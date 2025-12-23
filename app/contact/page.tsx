'use client'

import { useEffect, useState } from 'react'
import LiquidGlass from 'liquid-glass-react'
import { Mail, Instagram, Linkedin } from 'lucide-react'
import { copyToClipboard } from '@/lib/clipboard'
import styles from './contact.module.css'

const EMAIL = 'chanmin713@snu.ac.kr'

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(EMAIL)
    if (success) {
      alert(`이메일이 복사되었습니다: ${EMAIL}`)
    } else {
      alert(`이메일 복사에 실패했습니다. 수동으로 복사해주세요: ${EMAIL}`)
    }
  }

  const getGlassStyle = (index: number) => ({
    position: 'absolute' as const,
    left: '50%',
    top: `${index * 76}px`,
    transform: 'translateX(-50%)',
    width: 'min(320px, calc(100vw - 3rem))',
    transition: isMounted ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
  })

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Contact</h1>
          
          <div className={styles.contactList}>
            <LiquidGlass
              displacementScale={120}
              blurAmount={0.3}
              saturation={180}
              aberrationIntensity={4}
              elasticity={0}
              cornerRadius={40}
              padding="1rem 1.75rem"
              mode="prominent"
              overLight={false}
              style={getGlassStyle(0)}
              onClick={handleCopyEmail}
            >
              <div className={styles.contactItem}>
                <span className={styles.iconWrapper}>
                  <Mail size={20} color="#ffffff" />
                </span>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>Email</span>
                  <span className={styles.contactValue}>{EMAIL}</span>
                </div>
              </div>
            </LiquidGlass>
            
            <LiquidGlass
              displacementScale={120}
              blurAmount={0.3}
              saturation={180}
              aberrationIntensity={4}
              elasticity={0}
              cornerRadius={40}
              padding="1rem 1.75rem"
              mode="prominent"
              overLight={false}
              style={getGlassStyle(1)}
            >
              <a 
                href="https://www.instagram.com/chn_m1n" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.contactItem}
              >
                <span className={styles.iconWrapper}>
                  <Instagram size={20} color="#ffffff" />
                </span>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>Instagram</span>
                  <span className={styles.contactValue}>@chn_m1n</span>
                </div>
              </a>
            </LiquidGlass>
            
            <LiquidGlass
              displacementScale={120}
              blurAmount={0.3}
              saturation={180}
              aberrationIntensity={4}
              elasticity={0}
              cornerRadius={40}
              padding="1rem 1.75rem"
              mode="prominent"
              overLight={false}
              style={getGlassStyle(2)}
            >
              <a 
                href="https://www.linkedin.com/in/chanmin-kim-4a62a937a" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.contactItem}
              >
                <span className={styles.iconWrapper}>
                  <Linkedin size={20} color="#ffffff" />
                </span>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>LinkedIn</span>
                  <span className={styles.contactValue}>Chanmin Kim</span>
                </div>
              </a>
            </LiquidGlass>
          </div>
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <footer className={styles.footer}>
          <p className={styles.copyright}>&copy; 2025 Chanmin Kim. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
