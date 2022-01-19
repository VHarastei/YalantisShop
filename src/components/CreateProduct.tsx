import { yupResolver } from '@hookform/resolvers/yup'
import { CreateProductPayload } from 'api'
import checkIcon from 'assets/check.svg'
import { useAppDispatch } from 'hooks/useAppDispatch'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { fetchCreateProduct } from 'store/slices/products/thunks'
import { Origin } from 'types'
import { createProductSchema } from 'validationSchemas/createProductSchema'
import { Button } from './Button'
import { Modal } from './Modal'
import { ProductForm, ProductFormValues } from './ProductForm'

export const CreateProduct = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCloseModal = useCallback(() => setIsOpen(false), [])

  return (
    <div>
      <button
        className="text-xl font-medium opacity-80 hover:opacity-100 transition-all"
        onClick={() => setIsOpen(true)}
      >
        Create Product
      </button>
      <Modal title="Create Product" isOpen={isOpen} onClose={handleCloseModal}>
        <CreateProductForm onClose={handleCloseModal} />
      </Modal>
    </div>
  )
})

const CreateProductForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch()

  const [isProductCreated, setIsProductCreated] = useState(false)

  const form = useForm<ProductFormValues>({
    resolver: yupResolver(createProductSchema),
    mode: 'onChange',
  })
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid },
  } = form

  const onSubmit = async (data: ProductFormValues) => {
    const payload: CreateProductPayload = {
      product: {
        ...data,
        origin: data.origin.value as Origin,
      },
    }

    try {
      await dispatch(fetchCreateProduct(payload)).unwrap()
      setIsProductCreated(true)
    } catch (error) {
      setError('name', { type: 'manual', message: 'Product with this name already exist!' })
    }
  }

  return (
    <div>
      {!isProductCreated ? (
        <div>
          <ProductForm {...form} onSubmit={handleSubmit(onSubmit)} />
          <div className="mt-4">
            <Button onClick={handleSubmit(onSubmit)} fullWidth disabled={!isValid || isSubmitting}>
              Create
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img src={checkIcon} width={96} height={96} alt="check icon" />
          <h2 className="mb-4 text-2xl font-medium">Product Created!</h2>
          <Link to="/my-products">
            <Button onClick={onClose} fullWidth>
              Go to my Products
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
