'use client'

import { Mail, Instagram, Linkedin } from 'lucide-react'
import { copyToClipboard } from '@/lib/clipboard'
import styles from './contact.module.css'

const EMAIL = 'chanmin713@snu.ac.kr'

export default function Contact() {
  const handleCopyEmail = async () => {
    const success = await copyToClipboard(EMAIL)
    if (success) {
      alert(`이메일이 복사되었습니다: ${EMAIL}`)
    } else {
      alert(`이메일 복사에 실패했습니다. 수동으로 복사해주세요: ${EMAIL}`)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.description}>
          궁금한 점이 있으시면 언제든지 연락주세요.
        </p>
        
        <div className={styles.contactList}>
          <button 
            className={styles.contactItem}
            onClick={handleCopyEmail}
          >
            <Mail size={24} />
            <div className={styles.contactInfo}>
              <span className={styles.contactLabel}>Email</span>
              <span className={styles.contactValue}>{EMAIL}</span>
            </div>
          </button>
          
          <a 
            href="https://www.instagram.com/chn_m1n" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            <Instagram size={24} />
            <div className={styles.contactInfo}>
              <span className={styles.contactLabel}>Instagram</span>
              <span className={styles.contactValue}>@chn_m1n</span>
            </div>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/chanmin-kim-4a62a937a" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            <Linkedin size={24} />
            <div className={styles.contactInfo}>
              <span className={styles.contactLabel}>LinkedIn</span>
              <span className={styles.contactValue}>Chanmin Kim</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
