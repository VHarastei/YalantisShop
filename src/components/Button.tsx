import clsx from 'clsx'
import React from 'react'

type PropsType = {
  onClick?: () => void
  className?: string
  fullWidth?: boolean
  disabled?: boolean
}

export const Button: React.FC<PropsType> = ({
  children,
  fullWidth,
  disabled = false,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'p-2 text-xl font-semibold text-white rounded-lg transition-all',
        fullWidth && 'w-full',
        disabled
          ? 'bg-gray-400 hover:bg-gray-500 cursor-default'
          : 'bg-green-500 hover:bg-green-600',
        className && className
      )}
    >
      {children}
    </button>
  )
}
