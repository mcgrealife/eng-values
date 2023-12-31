import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Open_Sans } from 'next/font/google'
import ErrorBoundary from '@/components/ErrorBoundary'
import Head from 'next/head'
import HomeLayout from '@/components/Layouts/HomeLayout'

export const openSans = Open_Sans({ subsets: ['latin'] }) // export for pseudo-singleton

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Head>
        <meta></meta>
      </Head>
      <HomeLayout>
        <Component {...pageProps} />
      </HomeLayout>
    </ErrorBoundary>
  )
}
