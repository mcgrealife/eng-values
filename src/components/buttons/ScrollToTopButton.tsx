import styles from './ScrollToTopButton.module.css'

export default function ScrollToTopButton() {
  return (
    <button
      onClick={(e) =>
        e.currentTarget.parentElement?.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
      className={`${styles.scrollTo} ${false ? styles.fade : ''}`}>
      Back to top ↑
    </button>
  )
}
