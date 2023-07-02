import { Suspense, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './About.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const Mapbox = dynamic(() => import('@/components/Mapbox/Mapbox'), {
  loading: () => <div className={styles.loading} />,
})

export default function About() {
  const { inView, observeEl } = useIntersectionObserver({ once: true }) // for mapbox lazy import
  const mapEl = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // lazy import Mapbox; when scrolled into view
    observeEl(mapEl.current)
  }, [observeEl])

  return (
    <div className={styles.container}>
      <section>
        <h1>Technology used</h1>
        <p>Mimicking GetMyBoat stack</p>
        <ul>
          <li>ImgIX</li>
          <li>Storybook</li>
          <li>Sentry</li>
          <li>React hooks</li>
          <li>React Suspense</li>
          <li>React Lazy</li>
          <li>CSS modules</li>
          <li>State management Reducer pattern</li>
          <li>Local storage</li>
          <li>next@13 /pages</li>
          <li>next/img</li>
          <li>Amazon S3</li>
          <li>Headless CMS (sanity)</li>
          <li>A familiar 404</li>
          <li>Stripe API</li>
          <li>Clarity.ms</li>
          <li>Light In8n</li>
          <li>Open graph</li>
          <li>Toastify</li>
          <li>Mapbox</li>
        </ul>
      </section>
      <h1>Developed by</h1>
      <div className={styles.aboutMeCon}>
        {[
          {
            src: '/avatar.png',
            alt: 'face-of-developer',
            title: 'Michael McGreal',
          },
          {
            src: '/me-on-boat.jpg',
            alt: 'developer-on-boat',
            title: 'My boat',
          },
        ].map((i, idx) => (
          <div key={idx} className={styles.aboutCards}>
            <p>{i.title}</p>
            <Image src={i.src} alt={i.alt} width={150} height={150} />
          </div>
        ))}
      </div>
      <div ref={mapEl} className={`${styles.mapCon} ${styles.fullWidth}`}>
        <Suspense>{inView && <Mapbox />}</Suspense>
      </div>
      <div className={`${styles.caption} ${styles.fullWidth}`}>
        This Mapbox bundle was lazy imported when scrolled into view!
      </div>
      <section>
        <h3>About Greenville, SC</h3>
        <p>These are modals!</p>
      </section>

      <div className={`${styles.carousel} ${styles.fullWidth}`}>
        {[
          {
            title: 'A 50mile bike trail',
            src: '/nephew-biking.png',
            alt: 'biking with my fiances nephew',
          },
          {
            title: 'An immersive bridge',
            src: '/gvl-bridge.jpeg',
            alt: 'A bridge downtown, colorful lights at night, with waterfall in background',
          },
          {
            title: 'Many boats!',
            src: '/nearby-boats.png',
            alt: 'A sreenshot of GetMyBoat.com showing nearby boats on a map',
          },
        ].map((i, idx) => (
          <div key={idx} className={styles.card}>
            <h4>{i.title}</h4>
            <Image src={i.src} alt={i.title} width={250} height={200} />
          </div>
        ))}
      </div>
      {/* <section>
        <h3>More about me</h3>
        <ul>
          <li>
            Favorite coding music:{' '}
            <a href='https://www.brain.fm/' target='_blank'>
              https://www.brain.fm/
            </a>
          </li>
        </ul>
      </section> */}
      <div>
        <Link href='/'>← Back to home!</Link>
      </div>
    </div>
  )
}
