import styles from './QuoteCard.module.css'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { Quote } from '@/lib/quotes'
import { useEffect, useRef } from 'react'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function QuoteCard({ quote }: { quote: Quote }) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isSmallHeight = useMediaQuery('(max-height: 667px)')
  const { inView, observeEl } = useIntersectionObserver({
    rootMargin:
      isMobile && isSmallHeight ? '-150px' : isMobile ? '-200px' : '-250px',
  })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    observeEl(ref.current)
  }, [observeEl])

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
        <Image
          loader={({ width }) => {
            return `https://gmb.imgix.net/~text?txt64=${quote.quoteb64}&txt-color=848484&txt-size=48&w=${width}&q=75&txt-font=BrushScriptMT&txt-pad=40`
          }}
          alt={`quote-as-image: ${quote.quote}`}
          fill
          src={quote.id.toString()}
          className={`${styles.nextImg}`}
        />
      </div>
    </div>
  )
}
