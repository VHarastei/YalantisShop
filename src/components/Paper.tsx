import clsx from 'clsx'
import React from 'react'

type PropsType = {
  className?: string
}

export const Paper: React.FC<PropsType> = ({ children, className }) => {
  return <div className={clsx(className && className, 'p-4 bg-white rounded-lg')}>{children}</div>
}
