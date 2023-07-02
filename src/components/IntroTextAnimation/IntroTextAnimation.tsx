import { toast } from 'react-toastify'
import styles from './IntroTextAnimation.module.css'
import { useEffect, useState } from 'react'
import { reduxToast } from '../Toast/ReduxToast'

export default function IntroTextAnimation({
  onEndAnimation,
}: {
  onEndAnimation: () => void
}) {
  const quote = `“Every company has a culture. The only question is whether or not you decide what it is.” — Jason Cohen`
  const quoteWords = quote.split(' ')
  const [animateWord, setAnimateWord] = useState<number | null>(null)

  useEffect(() => {
    // animation triggers
    quoteWords.forEach((w, idx) => {
      setTimeout(() => {
        setAnimateWord(idx)
      }, idx * 200)
    })
  }, [])

  return (
    <p className={styles.quote}>
      {quoteWords?.map((word, idx) => (
        <span
          key={idx + word}
          className={`${styles.wordStart} ${
            animateWord && idx <= animateWord && styles.wordEnd
          }`}
          onTransitionEnd={(e) => {
            if (e.propertyName == 'color' && idx == quoteWords.length - 4) {
              reduxToast(`Dispatch(seenIntroTextAnimation)`)
            }
            if (e.propertyName == 'color' && idx == quoteWords.length - 1) {
              setTimeout(() => {
                onEndAnimation()
                toast.dismiss()
              }, 1500)
            }
          }}>
          {word}{' '}
        </span>
      ))}
    </p>
  )
}
