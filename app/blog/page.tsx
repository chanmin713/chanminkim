'use client'

import styles from './page.module.css'

export default function Blog() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.description}>
          블로그 페이지입니다.
        </p>
      </div>
    </div>
  )
}
