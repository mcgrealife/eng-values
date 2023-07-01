import Image from 'next/image'
import styles from '@/styles/404.module.css'
import Link from 'next/link'

export default function Custom404() {
  return (
    <div>
      <section className={styles.container}>
        <h2>{`You're in choppy waters!`}</h2>
        <Image
          src='/404-with-joy.png'
          width={272}
          height={92}
          alt='404-dolphin'
        />
        <Link href='/'>Back to softer seas</Link>
      </section>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#22b6e7'
          fillOpacity='1'
          d='M0,96L48,122.7C96,149,192,203,288,229.3C384,256,480,256,576,234.7C672,213,768,171,864,170.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
      </svg>
    </div>
  )
}
