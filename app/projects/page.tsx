'use client'

import React from 'react'
import styles from './page.module.css'

export default function Projects() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.description}>
          프로젝트 페이지입니다.
        </p>
      </div>
    </div>
  )
}
