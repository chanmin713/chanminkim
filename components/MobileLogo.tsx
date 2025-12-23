'use client'

import styles from './MobileHeader.module.css'

export default function MobileLogo() {
  return (
    <div className={styles.logo}>
      <a href="/" className={styles.logoLink}>
        <h2 className={styles.logoText}>Chanmin Kim</h2>
      </a>
    </div>
  )
}

