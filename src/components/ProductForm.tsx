import { ErrorMessage } from '@hookform/error-message'
import { Api } from 'api'
import { debounce } from 'lodash'
import { ReactSelectTheme } from 'pages/Products/components/OriginSelect'
import React, { useMemo } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { SelectOptions } from 'types'
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
  const loadOptions = useMemo(() => {
    return debounce(async (_, callback: (options: SelectOptions) => void) => {
      Api.getProductsOrigins().then((data) => {
        callback(data.items.map((i) => ({ value: i.value, label: i.displayName })))
      })
    }, 300)
  }, [])

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
            <AsyncSelect
              {...field}
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              isDisabled={isSubmitting}
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
    </form>
  )
}
