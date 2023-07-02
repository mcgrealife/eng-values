import { toast } from 'react-toastify'
import Image from 'next/image'

export const reduxToast = (message: string) =>
  toast(
    ({ closeToast }) => (
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          maxHeight: '48px',
          alignItems: 'center',
        }}>
        <Image
          src='/reduxLogo.png'
          alt='react-redux-logo'
          width={40}
          height={40}
        />
        <div
          style={{
            whiteSpace: 'nowrap',
          }}>
          {message}
        </div>
      </div>
    ),
    {
      // transition: cssTransition({
      //   enter: 'toastEnter',
      //   exit: 'toastExit',
      // }),
    }
  )
