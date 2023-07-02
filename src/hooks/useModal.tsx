import ReactModal from 'react-modal'
import { useState } from 'react'

export const useModal = ({
  isOpen: isOpenOverride,
  openModal,
  closeModal,
  props,
}: {
  isOpen?: ReactModal['props']['isOpen']
  openModal?: () => void
  closeModal?: () => void
  props?: ReactModal['props']
}) => {
  ReactModal.setAppElement('#app')
  const [isOpen, setIsOpen] = useState(false)
  const actions = {
    openModal: openModal ?? (() => setIsOpen(true)),
    closeModal: closeModal ?? (() => setIsOpen(false)),
  }

  const Modal = ({ ...args }: Partial<ReactModal['props']>) => {
    const open = isOpenOverride ?? isOpen
    if (!open) return null
    return (
      <ReactModal
        {...props}
        overlayClassName={args.overlayClassName}
        className={args.className}
        isOpen={open}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={actions.closeModal}
        shouldReturnFocusAfterClose={true}
        contentLabel='Modal'>
        {args.children}
      </ReactModal>
    )
  }

  return {
    actions,
    Modal,
  }
}
// maintainer recommends against conditional rendering
// instead: modals always mounted, show/hide with isOpen prop
// https://github.com/reactjs/react-modal/issues/808#issuecomment-1155423058
