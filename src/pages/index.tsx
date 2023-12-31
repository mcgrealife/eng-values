import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { openGraphAndMeta } from '@/lib/seo'
import { useRef } from 'react'
import { useIntersectionObserver2 } from '@/hooks/useIntersectionObserver2'
import IntroTextAnimation from '@/components/IntroTextAnimation/IntroTextAnimation'
import { InferGetStaticPropsType } from 'next'
import { useModal } from '@/hooks/useModal'
import { useTranslatedQuotes } from '@/hooks/useTranslatedQuotes'
import { useSelector, useDispatch } from 'react-redux'
import { selectSettings, setLanguage, setSettings } from '@/lib/redux/store'
import LanguageSelect from '@/components/LanguageSelect/LanguageSelect'
import { baseQuotes } from '@/lib/quotes'
import QuoteCard from '@/components/QuoteCard/QuoteCard'
import ScrollToTopButton from '@/components/buttons/ScrollToTopButton'

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  // SSG quotes, optionally translated via Google Translate API
  const quotes = useTranslatedQuotes(props.quotes)

  // intro modal
  const dispatch = useDispatch()
  const { seenIntroTextAnimation } = useSelector(selectSettings)
  const { Modal, actions } = useModal({
    isOpen: !seenIntroTextAnimation,
    closeModal: () =>
      dispatch(
        setSettings({
          seenIntroTextAnimation: true,
        })
      ),
  })

  // language picker, showInHeader on scroll
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

  return (
    <main
      className={`${styles.main} ${
        seenIntroTextAnimation ? styles.fadeIn : ''
      }`}>
      <Head>{openGraphAndMeta('home')}</Head>
      <Modal
        overlayClassName={styles.introTextModalOverlay}
        className={styles.introTextModalContent}>
        <IntroTextAnimation
          onEndAnimation={() => {
            actions.closeModal()
          }}
        />
      </Modal>
      <div className={styles.scrollable}>
        <div ref={languageSelector} className={styles.langSelect}>
          <LanguageSelect />
        </div>
        {quotes.map((q) => (
          <QuoteCard key={q.id.toString() + q.quoteb64.slice(0, 5)} quote={q} />
        ))}
        <ScrollToTopButton />
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
