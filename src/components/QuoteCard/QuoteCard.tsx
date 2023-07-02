import styles from './QuoteCard.module.css'
import Image from 'next/image'
import { useIntersectionObserver2 } from '@/hooks/useIntersectionObserver2'
import { Quote } from '@/lib/quotes'
import { useState, useRef } from 'react'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function QuoteCard({ quote }: { quote: Quote }) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isSmallHeight = useMediaQuery('(max-height: 667px)')
  const ref = useRef<HTMLDivElement>(null)
  const [imgixError, setImgixError] = useState(false) // ImgIX Typesetting API errors on some langs // fallback to text

  const inView = useIntersectionObserver2({
    ref,
    options: {
      rootMargin:
        isMobile && isSmallHeight ? '-150px' : isMobile ? '-200px' : '-250px',
    },
  })

  return (
    <div
      key={quote.id}
      className={`${styles.primaryQuote} ${
        inView ? styles.emphasize : styles.soft
      }`}>
      <div className={styles.title}>
        <h4>
          {quote.id}: {quote.title}
        </h4>
        <h2 ref={ref}>{quote.quote}</h2>
      </div>
      <div className={styles.primaryImage}>
        {!imgixError ? (
          <Image
            loader={({ width }) => {
              return `https://gmb.imgix.net/~text?txt64=${quote.quoteb64}&txt-color=848484&txt-size=48&w=${width}&q=75&txt-font=BrushScriptMT&txt-pad=40`
            }}
            alt={`translated quote as image using ImgIX Typesetting API`}
            fill
            src={quote.id.toString()}
            className={`${styles.nextImg}`}
            onError={() => {
              setImgixError(true)
            }}
          />
        ) : (
          <div className={styles.fallback}>
            <div className={styles.text}>{quote.translatedQuote}</div>
            <div className={styles.caption}>
              ImgIx TypeSetting API error; displaying text instead.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
