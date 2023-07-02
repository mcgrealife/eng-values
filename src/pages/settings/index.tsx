import styles from '@/styles/settings.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function Settings() {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <h1>Settings</h1>
      <button
        onClick={() => {
          toast('...here we go!', {
            autoClose: 500,
            position: 'top-left',
          })
          setTimeout(() => {
            localStorage.clear()
            router.replace('/')
          }, 2000)
        }}>
        Clear cache and restart experience
      </button>
      <div>
        <h4>Want to throw an Error?</h4>
        <button
          onClick={() => {
            throw new Error('show me the error page!')
          }}>
          Show me the Error Page!
        </button>
      </div>
      <div>
        <h4>Miss 404 Joy? 🐬</h4>
        <p>{`Don't worry – Joy is here!`}</p>
        <button>
          <Link href='/404'>eee-eee</Link>
        </button>
      </div>
    </div>
  )
}
