import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <a href="/blog" className={styles.navLink}>
          Blog
        </a>
        <a href="mailto:chanmin713@snu.ac.kr" className={styles.navLink}>
          Contact
        </a>
      </nav>
      <div className={styles.headerContent}>
        <h1 className={styles.name}>Chanmin Kim</h1>
      </div>
    </header>
  )
}

