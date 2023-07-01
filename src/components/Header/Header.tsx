import styles from './Header.module.css'
import Link from 'next/link'
import LanguageSelect from '../LanguageSelect/LanguageSelect'
import { useModal } from '@/hooks/useModal'

export default function Header() {
  const { Modal, actions } = useModal()
  return (
    <header className={styles.container}>
      <div className={styles.title}>GetMyBoat Engineering values</div>
      <div className={styles.right}>
        {/* <LanguageSelect /> */}
        <button onClick={() => actions.openModal()}>menu</button>
      </div>
      <Modal
        overlayStyle={{
          display: 'flex',
          justifyContent: 'end',
          alignContent: 'start',
          minWidth: '100%',
          minHeight: '100%',
        }}
        contentStyle={{
          flexDirection: 'column',
          width: 'fit-content',
          height: 'fit-content',
          marginTop: '3rem',
          marginRight: '2rem',
        }}>
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
