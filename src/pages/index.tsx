import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { baseUrl } from '../../sitemap'
import { openGraphAndMeta } from '@/lib/seo'
import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import IntroTextAnimation from '@/components/IntroTextAnimation/IntroTextAnimation'
import { InferGetStaticPropsType } from 'next'
import { useModal } from '@/hooks/useModal'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useTranslatedQuotes } from '@/hooks/useTranslatedQuotes'
import { useSelector, useDispatch } from 'react-redux'
import { selectSettings, setSettings } from '@/lib/redux/store'
import LanguageSelect from '@/components/LanguageSelect/LanguageSelect'
import { baseQuotes } from '@/lib/quotes'

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const quotes = useTranslatedQuotes(props.quotes)
  // console.log(quotes)
  const { inView, observeEl } = useIntersectionObserver()
  const selectedQuote = quotes[0]
  const dispatch = useDispatch()
  const { seenIntroTextAnimation } = useSelector(selectSettings)
  const { Modal, actions } = useModal()

  useEffect(() => {
    // const ls = localStorage.getItem('seenIntroTextAnimation') === 'true'
    if (!seenIntroTextAnimation) actions.openModal()
  }, [seenIntroTextAnimation, actions])

  return (
    <main className={styles.main}>
      <Head>{openGraphAndMeta('home')}</Head>
      {!seenIntroTextAnimation && (
        <div className={styles.introQuote}>
          <Modal
            overlayStyle={{
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <IntroTextAnimation
              onEndAnimation={() => {
                dispatch(
                  setSettings({
                    seenIntroTextAnimation: true,
                  })
                )
                actions.closeModal()
                toast('dispatch seenIntroTextAnimation: true')
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

const modalStyles = {}

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

// https://gmb.imgix.net/b/3.jpg?w=500&h=500&txt64=T3VyIGdvYWwgaXMgdG8gYnVpbGQgYSB3b3JsZCBjbGFzcyBwcm9kdWN0IGFuZCBjb21wYW55LiBXZSdyZSBhIGhpZ2ggcGVyZm9ybWFuY2UgdGVhbSBvZiB0b3AgZW5naW5lZXJpbmcgdGFsZW50LCB3aG8gc3RyaXZlIHRvIGJldHRlciBvdXJzZWx2ZXMgYW5kIGVhY2ggb3RoZXIu&txtfont=Arial&txtsize=40&txtalign=center,middle&txtclr=ffffff&txtfit=fill&txtwidth=0.8&txt=base64&txtclip=ellipse
