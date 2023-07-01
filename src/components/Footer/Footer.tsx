import Link from 'next/link'
import styles from './Footer.module.css'
export default function Footer() {
  return (
    <footer className={styles.container}>
      <button>
        <Link href='/about'>About</Link>
      </button>
    </footer>
  )
}
