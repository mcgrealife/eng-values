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
      <div className={styles.primaryQuote}>
        <h4>
          {selectedQuote.id}: {selectedQuote.title}
        </h4>
        <h2>{selectedQuote.quote}</h2>
        <div className={styles.primaryImage}>
          <Image
            loader={({ width }) => {
              return `https://gmb.imgix.net/~text?txt64=${selectedQuote.quoteb64}&txt-color=4B5E75&txt-size=34&w=${width}&h=auto&q=75&markscale=30&markalign=top,left&mark64=aHR0cHM6Ly9hc3NldHMuaW1naXgubmV0L3ByZXNza2l0L2ltZ2l4LXByZXNza2l0LnBkZj9mbT1wbmcmcGFnZT00`
            }}
            alt={`quote-as-image: ${selectedQuote.quote}`}
            fill
            src={selectedQuote.id.toString()}
            className={styles.nextImg}
          />
        </div>
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
