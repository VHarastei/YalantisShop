import { yupResolver } from '@hookform/resolvers/yup'
import { CreateProductPayload } from 'api'
import { Button } from 'components/Button'
import { ProductForm, ProductFormValues } from 'components/ProductForm'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { originValues } from 'pages/Products/components/OriginSelect'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { fetchUpdateProduct } from 'store/slices/products/thunks'
import { IProduct, Origin } from 'types'
import { createProductSchema } from 'validationSchemas/createProductSchema'

type PropsType = {
  product: IProduct
  handleCloseModal: () => void
}

export const EditMyProduct: React.FC<PropsType> = ({ product, handleCloseModal }) => {
  const dispatch = useAppDispatch()

  const form = useForm<ProductFormValues>({
    resolver: yupResolver(createProductSchema),
    defaultValues: {
      name: product.name,
      price: product.price,
      origin: originValues.find((i) => i.value === product.origin),
    },
    mode: 'onChange',
  })

  const {
    handleSubmit,
    trigger,
    reset,
    formState: { isSubmitting, isValid, isDirty },
  } = form

  const onSubmit = async (data: ProductFormValues) => {
    const payload: CreateProductPayload = {
      product: {
        ...data,
        origin: data.origin.value as Origin,
      },
    }

    try {
      dispatch(
        fetchUpdateProduct({
          productId: product.id,
          payload,
        })
      )
      handleCloseModal()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    trigger()
  }, [trigger])

  return (
    <div>
      <ProductForm {...form} onSubmit={handleSubmit(onSubmit)} />
      <div className="flex gap-4 mt-4">
        <Button onClick={handleCloseModal} fullWidth disabled={!isValid || isSubmitting}>
          Cancel edit
        </Button>
        <Button onClick={() => reset()} fullWidth disabled={!isValid || isSubmitting || !isDirty}>
          Reset changes
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          fullWidth
          disabled={!isValid || isSubmitting || !isDirty}
        >
          Confirm changes
        </Button>
      </div>
    </div>
  )
}
