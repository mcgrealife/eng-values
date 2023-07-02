import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { openGraphAndMeta } from '@/lib/seo'
import { useEffect, useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import IntroTextAnimation from '@/components/IntroTextAnimation/IntroTextAnimation'
import { InferGetStaticPropsType } from 'next'
import { useModal } from '@/hooks/useModal'
import { useTranslatedQuotes } from '@/hooks/useTranslatedQuotes'
import { useSelector, useDispatch } from 'react-redux'
import { selectSettings, setLanguage, setSettings } from '@/lib/redux/store'
import LanguageSelect from '@/components/LanguageSelect/LanguageSelect'
import { baseQuotes } from '@/lib/quotes'
import useMediaQuery from '@/hooks/useMediaQuery'
import QuoteCard from '@/components/QuoteCard/QuoteCard'

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const quotes = useTranslatedQuotes(props.quotes)
  const dispatch = useDispatch()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { seenIntroTextAnimation } = useSelector(selectSettings)
  const { Modal, actions } = useModal({ open: !seenIntroTextAnimation })
  const scrollable = useRef<HTMLDivElement>(null)

  // intersection observers 2
  const languageSelector = useRef<HTMLDivElement>(null)
  useIntersectionObserver2({
    ref: languageSelector,
    onIntersect: (inView: boolean) =>
      dispatch(
        setLanguage({
          showInHeader: !inView,
        })
      ),
  })

  useEffect(() => {
    if (!seenIntroTextAnimation) actions.openModal()
  }, [seenIntroTextAnimation, actions])
  // observeButton(scrollToTopButtonRef.current)

  return (
    <main className={styles.main}>
      <Head>{openGraphAndMeta('home')}</Head>
      {!seenIntroTextAnimation && (
        <div className={styles.introQuote}>
          <Modal
            overlayStyle={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              width: '100%',
              height: '100%',
            }}
            contentStyle={{
              // display: 'grid',
              // placeContent: 'center',
              // width: '100%',
              // maxWidth: isMobile ? '100%' : '80%',
              height: '100%',
              padding: isMobile ? '2rem' : '6rem',
            }}>
            <IntroTextAnimation
              onEndAnimation={() => {
                dispatch(
                  setSettings({
                    seenIntroTextAnimation: true,
                  })
                )
                actions.closeModal()
              }}
            />
          </Modal>
        </div>
      )}
      <div ref={scrollable} className={styles.scrollable}>
        <div ref={languageSelectorRef} className={styles.langSelect}>
          <LanguageSelect />
        </div>
        {quotes.map((q, idx) => (
          <QuoteCard key={idx} quote={q} />
        ))}
        <button
          onClick={() =>
            scrollable.current?.scrollTo({ top: 0, behavior: 'smooth' })
          }
          className={`${styles.scrollTo} ${false ? styles.fade : ''}`}>
          Back to top ↑
        </button>
      </div>
      <div className={`${styles.overlay} ${styles.top}`} />
      <div className={`${styles.overlay} ${styles.bottom}`} />
    </main>
  )
}

// Static Generation
export async function getStaticProps() {
  const enconder = new TextEncoder()
  const quotesWithBase64 = baseQuotes.map((q) => {
    const data = enconder.encode(q.quote)
    const quoteb64 = Buffer.from(data).toString('base64')
    return {
      ...q,
      quoteb64, // imgix prefers text as base64
    }
  })
  return {
    props: {
      quotes: quotesWithBase64,
    },
  }
}
