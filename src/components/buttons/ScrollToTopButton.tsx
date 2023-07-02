import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import styles from './ScrollToTopButton.module.css'
import { useEffect, useRef } from 'react'

export default function ScrollToTopButton() {
  const { inView, observeEl } = useIntersectionObserver({})

  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    observeEl(ref.current)
  }, [observeEl])

  return (
    <button
      ref={ref}
      onClick={(e) =>
        e.currentTarget.parentElement?.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
      className={`${styles.scrollTo} ${inView ? styles.fade : ''}`}>
      Back to top ↑
    </button>
  )
}
