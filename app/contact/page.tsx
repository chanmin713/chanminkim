'use client'

import React from 'react'
import { Mail, Instagram, Linkedin } from 'lucide-react'
import styles from './contact.module.css'

export default function Contact() {
  const copyEmail = async () => {
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
            onClick={copyEmail}
          >
            <Mail size={24} />
            <div className={styles.contactInfo}>
              <span className={styles.contactLabel}>Email</span>
              <span className={styles.contactValue}>chanmin713@snu.ac.kr</span>
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
