import styles from './CookieBanner.module.css'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { selectSettings, setSettings } from '@/lib/redux/store'

const CookieBanner = () => {
  const router = useRouter()
  const settings = useSelector(selectSettings)
  const dispatch = useDispatch()

  return (
    <div className={styles.container}>
      <h3>Accept cookies? 🍪</h3>
      <p>We use cookies to mimic GetMyBoat ⛵️</p>
      <button
        onClick={() => {
          dispatch(setSettings({ ...settings, acceptedCookies: true }))
          localStorage.setItem('acceptedCookies', 'true')
          router.reload()
        }}>
        Accept cookies, and update localStorage.
      </button>
    </div>
  )
}

export default CookieBanner
