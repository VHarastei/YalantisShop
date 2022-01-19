import { DevTool } from '@hookform/devtools'
import { ErrorMessage } from '@hookform/error-message'
import { originValues, ReactSelectTheme } from 'pages/Products/components/OriginSelect'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import Select from 'react-select'
import { Input } from './Input'

type PropsType = UseFormReturn<ProductFormValues, object> & { onSubmit: () => void }

export type ProductFormValues = {
  name: string
  price: number
  origin: {
    value: string
    label: string
  }
}

export const ProductForm: React.FC<PropsType> = ({
  register,
  control,
  formState: { errors, isSubmitting },
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Input
        label="Name"
        disabled={isSubmitting}
        placeholder="Enter name"
        errors={errors}
        {...register('name')}
      />
      <Input
        label="Price"
        disabled={isSubmitting}
        type="number"
        placeholder="Enter price"
        errors={errors}
        {...register('price')}
      />
      <div className="flex flex-col mb-4">
        <label className="mb-1 text-xl font-semibold" htmlFor="origin">
          Origin
        </label>
        <Controller
          control={control}
          name="origin"
          render={({ field }) => (
            <Select
              {...field}
              isDisabled={isSubmitting}
              options={originValues}
              theme={ReactSelectTheme}
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name="origin"
          render={({ message }) => <p className="font-medium text-red-500">{message}</p>}
        />
      </div>
      <DevTool control={control} />
    </form>
  )
}
