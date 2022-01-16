import { DevTool } from '@hookform/devtools'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { Api } from 'api'
import { originValues, ReactSelectTheme } from 'pages/Products/components/OriginSelect'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { ICreateProduct, Origin } from 'types'
import * as yup from 'yup'
import { Button } from './Button'
import { Input } from './Input'
import { Modal } from './Modal'

export type FormValues = {
  name: string
  price: number
  origin: {
    value: string
    label: string
  }
}

const schema = yup
  .object({
    name: yup.string().required('Name is required!').min(3, 'Too Short!').max(20, 'Too Long!'),
    price: yup
      .number()
      .typeError('Price must be a number!')
      .required('Price is required!')
      .positive('Price must be a positive number!'),
    origin: yup.mixed().oneOf(originValues).required('Origin is required!'),
  })
  .required()

export const CreateProduct = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    handleSubmit,
    register,
    control,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async (data: FormValues) => {
    const payload: ICreateProduct = {
      product: {
        ...data,
        origin: data.origin.value as Origin,
      },
    }

    try {
      const res = await Api.createProduct(payload)
      console.log(res)
    } catch (err) {
      setError('name', { type: 'manual', message: 'Product with this name already exist!' })
    }
  }

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Create Product</Button>
      <Modal title="Create Product" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="mt-4">
            <Button fullWidth disabled={!isValid || isSubmitting}>
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
})
