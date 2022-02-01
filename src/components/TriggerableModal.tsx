import React, { ReactNode, useCallback, useState } from 'react'
import { Modal } from './Modal'

type PropsType = {
  trigger: (arg0: () => void) => JSX.Element
  title: string
  children: (arg0: () => void) => ReactNode
}

export const TriggerableModal = ({ children, trigger, title }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = useCallback(() => setIsOpen(true), [])
  const handleCloseModal = useCallback(() => setIsOpen(false), [])

  return (
    <>
      {trigger(handleOpenModal)}
      {isOpen && (
        <Modal title={title} onClose={handleCloseModal}>
          {children(handleCloseModal)}
        </Modal>
      )}
    </>
  )
}
