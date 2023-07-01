import styles from './HomeLayout.module.css'
import { ReactNode, useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import CookieBanner from '@/components/CookieBanner/CookieBanner'
import { Provider } from 'react-redux'
import { store } from '@/lib/redux/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function HomeLayout({ children }: { children: ReactNode }) {
  // const [showCookieBanner, setShowCookieBanner] = useState(false)
  // useEffect(() => {
  //   const acceptedCookies = localStorage.getItem('acceptedCookies')
  //   if (!acceptedCookies) setShowCookieBanner(true)
  // }, [])
  return (
    <Provider store={store}>
      <div className={styles.container} id='app'>
        <Header />
        {/* {showCookieBanner && <CookieBanner />} */}
        <main className={styles.children}>{children}</main>
        <ToastContainer
          autoClose={3000}
          pauseOnHover
          closeOnClick
          // closeButton
          position='bottom-left'
          hideProgressBar
        />
      </div>
    </Provider>
  )
}
