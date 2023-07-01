import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { baseUrl } from '../../sitemap'
import { openGraphAndMeta } from '@/lib/seo'
import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import IntroTextAnimation from '@/components/IntroTextAnimation/IntroTextAnimation'
import { Quote } from './api/v1/quotes'
import { InferGetStaticPropsType } from 'next'
import { useModal } from '@/hooks/useModal'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useTranslatedQuotes } from '@/hooks/useTranslatedQuotes'
import { useSelector, useDispatch } from 'react-redux'
import { selectSettings, setSettings } from '@/lib/redux/store'
import LanguageSelect from '@/components/LanguageSelect/LanguageSelect'

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
      <LanguageSelect />
      <div className={styles.quoteScroll}>
        <div className={styles.scrollable}>
          {quotes.map((q) => (
            <div key={q.id} className={styles.primaryQuote}>
              <h4>
                {q.id}: {q.title}
              </h4>
              <h2>{q.quote}</h2>
              <div className={styles.primaryImage}>
                <Image
                  loader={({ width }) => {
                    return `https://gmb.imgix.net/~text?txt64=${q.quoteb64}&txt-color=black&txt-size=48&w=${width}&ar=1:1&q=75&txt-font=BrushScriptMT&txt-pad=40`
                  }}
                  alt={`quote-as-image: ${q.quote}`}
                  fill
                  src={q.id.toString()}
                  className={styles.nextImg}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.quoteScrollOverlayGradient} />
      </div>
    </main>
  )
}

const modalStyles = {}

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/api/v1/quotes`) // simulate headless CMS
  // console.log(res)
  const quotes = (await res.json()) as Quote[]
  return {
    props: {
      quotes,
    },
  }
}

// https://gmb.imgix.net/b/3.jpg?w=500&h=500&txt64=T3VyIGdvYWwgaXMgdG8gYnVpbGQgYSB3b3JsZCBjbGFzcyBwcm9kdWN0IGFuZCBjb21wYW55LiBXZSdyZSBhIGhpZ2ggcGVyZm9ybWFuY2UgdGVhbSBvZiB0b3AgZW5naW5lZXJpbmcgdGFsZW50LCB3aG8gc3RyaXZlIHRvIGJldHRlciBvdXJzZWx2ZXMgYW5kIGVhY2ggb3RoZXIu&txtfont=Arial&txtsize=40&txtalign=center,middle&txtclr=ffffff&txtfit=fill&txtwidth=0.8&txt=base64&txtclip=ellipse
