import { Suspense, useRef } from 'react'
import Image from 'next/image'
import styles from './About.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useIntersectionObserver2 } from '@/hooks/useIntersectionObserver2'

const Mapbox = dynamic(() => import('@/components/Mapbox/Mapbox'), {
  loading: () => <div className={styles.loading} />,
})

export default function About() {
  const mapEl = useRef<HTMLDivElement>(null) // defer mapbox import until inView
  const inView = useIntersectionObserver2({
    ref: mapEl,
    options: { once: true },
  })

  return (
    <div className={styles.container}>
      <section className={`${styles.fullWidth} ${styles.center}`}>
        <div className={styles.heading}>
          <div className={`${styles.flexCol}`}>
            <h1>Technology used</h1>
            <button>
              <Image
                src='/github.png'
                alt='github-lgo'
                width={20}
                height={20}
              />
              <a
                href='https://github.com/mcgrealife/eng-values'
                target='_blank'>
                Source code
              </a>
            </button>
          </div>
        </div>
        <ul className={`${styles.tech} ${styles.fullWidth}`}>
          {tech.map((t) => (
            <li key={t.name} className={styles.card}>
              <div className={styles.flex}>
                {t.logoUrl && (
                  <Image
                    src={t.logoUrl ?? ''}
                    alt={t.name + 'logo'}
                    width={20}
                    height={20}
                    className={styles.img}
                  />
                )}
                <p>{t.name}</p>
              </div>
              <div className={styles.takeaway}>{t.takeaway}</div>
            </li>
          ))}
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
        <p>{`A biking city 🚲`}</p>
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
            <Image src={i.src} alt={i.title} width={200} height={200} />
          </div>
        ))}
      </div>
      <section className={styles.center}>
        <h3>Thanks for reading</h3>
        <div className={styles.link}>
          <Link href='/'>← Back to Engineering values!</Link>
        </div>
      </section>
    </div>
  )
}

const tech = [
  {
    name: '🪝 React hooks',
    takeaway: (
      <div>{`All hooks hide the complexity of managing refs, state, and useEffects; with an options arg to override defaults.`}</div>
    ),
    logoUrl: null,
  },
  {
    name: '🪄 ImgIX',
    takeaway: (
      <div>
        Typesetting API! ImgIX prefers quotes as base64, but btoa() errors on
        some non-english chars – so I used TextEncoder() API for translated
        quotes.
      </div>
    ),
    logoUrl: '',
  },
  {
    name: '🪟 React-Modal',
    takeaway: (
      <div>{`My first time using this – I love it! The package exposes many props, which allowed a fully-typed and extensible useModal hook.`}</div>
    ),
    logoUrl: '',
  },

  {
    name: 'Redux',
    takeaway: (
      <div>{`I love the reducer pattern. I am eager to learn your patterns, and see it managing your more complex state.`}</div>
    ),
    logoUrl: '/reduxLogo.png',
  },
  {
    name: '🍞 Toastify',
    takeaway: (
      <div>{`Wow! Simply calling toast() "just works". I implemented cusotm: toast JSX, timings, programatic dismiss(), and transitions.`}</div>
    ),
    logoUrl: '',
  },
  {
    name: '🌍 Mapbox',
    takeaway: (
      <div>{`Mapbox makes some things are much easier than Google Maps! E.g. auto popup re-position when in proximity to edge of viewport. WebGL 3D globe is delightful.`}</div>
    ),
    logoUrl: '',
  },
  {
    name: '🛋️ React lazy (dynamic imports)',
    takeaway: (
      <div>{`As an example, I defer importing the mapbox bundle below until it is scrolled into view (using the useIntersectionObserverHook())`}</div>
    ),
    logoUrl: '',
  },
  {
    name: '💅 CSS Modules',
    takeaway: (
      <div>{`To my surprise, I do not miss Tailwind! The markup is cleaner, and css allows flexible animations with ease. Still breezy!`}</div>
    ),
    logoUrl: '',
  },
  {
    name: 'Storybook',
    takeaway: (
      <div>{`Wow. I can't believe I've been writing jest tests manually. This is a paradigm-shift in developing UI. I am hooked!`}</div>
    ),
    logoUrl: '/storybook.png',
  },
  {
    name: '🎛️ Dynamic API route caching',
    takeaway: (
      <div>{`To avoid over-complicating with RTK Query, I chose dynamic API routes that cached each language's Google Cloud Translate response for all users.`}</div>
    ),
    logoUrl: '',
  },
  {
    name: '郒💬 Goolge Cloud Translate API',
    takeaway: (
      <div>{`I opted for their REST API, instead of node client, to use the Edge runtime. It required mapping ISO3166 flag-icon values to Google Translate ISO639 language codes.`}</div>
    ),
    logoUrl: '',
  },
  {
    name: '📸 vercel/og',
    takeaway: (
      <div>{`I had some fun by modifying GetMyBoats OG image, adding the sharing user's country text (inferred from IP address on the request header) to the image.`}</div>
    ),
    logoUrl: '',
  },
  {
    name: '🐬 404 Joy',
    takeaway: <a href='/404' target='_blank'>{`Don't worry - Joy is here!`}</a>,
    logoUrl: '',
  },
]
