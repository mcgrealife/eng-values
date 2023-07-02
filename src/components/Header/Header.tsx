import styles from './Header.module.css'
import Link from 'next/link'
import LanguageSelect from '../LanguageSelect/LanguageSelect'
import { useModal } from '@/hooks/useModal'
import { useSelector } from 'react-redux'
import { selectLanguage } from '@/lib/redux/store'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useRouter } from 'next/router'

export default function Header() {
  const { Modal, actions } = useModal({})
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { showInHeader } = useSelector(selectLanguage)
  const router = useRouter()

  return (
    <header className={styles.container}>
      <div className={styles.title}>
        <Link href='/'>
          {!isMobile || (isMobile && !showInHeader)
            ? `GetMyBoat Engineering values`
            : ''}
        </Link>
      </div>
      <div className={styles.languageSelect}>
        {showInHeader && router.pathname == '/' && <LanguageSelect />}
      </div>
      <div className={styles.right}>
        <button onClick={() => actions.openModal()}>menu</button>
      </div>
      <Modal
        overlayClassName={styles.modalOverlay}
        className={styles.modalContent}>
        {[
          { href: '/', label: '⚓️ Home' },
          { href: '/about', label: '📖 About' },
          { href: '/settings', label: '⚙️ Settings' },
        ].map((l) => (
          <Link key={l.href} href={l.href} onClick={() => actions.closeModal()}>
            {l.label}
          </Link>
          // </button>
        ))}
      </Modal>
    </header>
  )
}
