import ReactModal from 'react-modal'
import { ReactNode, useState } from 'react'

type ReactModalProps = {
  children: ReactNode
  contentStyle?: ReactModal.Styles['content']
  overlayStyle?: ReactModal.Styles['overlay']
  style?: ReactModal.Styles
  label?: ReactModal.Props['contentLabel']
}

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  ReactModal.setAppElement('#app')

  const actions = {
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    afterOpenModal: () => console.log('afteropenModal'),
  }

  const Modal = ({ ...args }: ReactModalProps) => {
    if (!isOpen) return null
    return (
      <ReactModal
        isOpen={isOpen}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onAfterOpen={actions.afterOpenModal}
        onRequestClose={actions.closeModal}
        style={{
          content: {
            position: 'unset',
            inset: 0,
            display: 'flex',
            ...args.contentStyle,
          },
          overlay: args.overlayStyle,
        }}
        shouldReturnFocusAfterClose={true}
        contentLabel='Example Modal'>
        {args.children}
      </ReactModal>
    )
  }

  return {
    actions,
    Modal,
  }
}
