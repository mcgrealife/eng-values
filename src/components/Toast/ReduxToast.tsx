import styles from './ReduxToast.module.css'
import { toast } from 'react-toastify'
import Image from 'next/image'

export const reduxToast = (message: string) =>
  toast(
    ({ closeToast }) => (
      <div className={styles.toast}>
        <Image
          src='/reduxLogo.png'
          alt='react-redux-logo'
          width={20}
          height={20}
        />
        <div>{message}</div>
      </div>
    ),
    {
      // transition: cssTransition({
      //   enter: 'toastEnter',
      //   exit: 'toastExit',
      // }),
    }
  )
