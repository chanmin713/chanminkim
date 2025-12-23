'use client'

import React from 'react'
import styles from './page.module.css'

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>About</h1>
        <p className={styles.description}>
          소개 페이지입니다.
        </p>
      </div>
    </div>
  )
}
