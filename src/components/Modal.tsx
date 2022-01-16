import React, { useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'

type PropsType = {
  title: string
  isOpen: boolean
  onClose: () => void
}

export const Modal: React.FC<PropsType> = ({ title, isOpen, onClose, children }) => {
  const closeOnEscapeKeyDown = useCallback(
    (e: { key: string }) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  }, [closeOnEscapeKeyDown])

  const portalRoot = document.getElementById('root')!

  return isOpen && portalRoot
    ? ReactDOM.createPortal(
        <div
          className="flex fixed top-0 left-0 z-0 justify-center items-start w-screen h-screen bg-black bg-opacity-40"
          onClick={onClose}
        >
          <div
            className="p-4 mt-28 w-full max-w-xl bg-white rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <h1 className="mb-3 text-3xl font-semibold leading-6">{title}</h1>
              <button
                onClick={onClose}
                className="text-2xl font-semibold leading-4 hover:text-red-500 transition-all"
              >
                ✕
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>,
        portalRoot
      )
    : null
}
