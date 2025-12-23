'use client'

import styles from './Header.module.css'

export default function Logo() {
  return (
    <div className={styles.logo}>
      <a href="/" className={styles.logoLink}>
        <h2 className={styles.logoText}>Chanmin Kim</h2>
      </a>
    </div>
  )
}

