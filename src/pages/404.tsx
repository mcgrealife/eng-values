import Image from 'next/image'

export default function Custom404() {
  return (
    <section>
      <h1>{`404 - Page Not Found`}</h1>
      <Image
        src='/404-with-joy.png'
        width={500}
        height={500}
        alt='404-dolphin'
      />
    </section>
  )
}
