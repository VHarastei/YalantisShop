import React from 'react'
import { ErrorMessage } from '@hookform/error-message'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label: string; type?: string; errors: { [x: string]: unknown } | undefined }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, errors, type = 'text', ...rest }, ref) => {
    return (
      <div className="flex flex-col mb-4">
        <label className="mb-1 text-xl font-semibold" htmlFor={name}>
          {label}
        </label>
        <input
          className="py-1 px-2 text-xl rounded-md border-1 border-gray-300 hover:border-gray-400 focus:outline-green"
          type={type}
          ref={ref}
          name={name}
          {...rest}
        />
        <ErrorMessage
          errors={errors}
          name={name || ''}
          render={({ message }) => <p className="font-medium text-red-500">{message}</p>}
        />
      </div>
    )
  }
)
