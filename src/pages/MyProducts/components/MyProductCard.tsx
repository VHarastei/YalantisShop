import { EntityId } from '@reduxjs/toolkit'
import originIcon from 'assets/origin.svg'
import { Button } from 'components/Button'
import { EditMyProduct } from 'components/forms/EditMyProductForm'
import { TriggerableModal } from 'components/TriggerableModal'
import { useAppSelector } from 'hooks/useAppSelector'
import { ProductCardPreloader } from 'pages/Products/components/ProductCardPreloader'
import React, { memo } from 'react'
import { selectProductById } from 'store/slices/products/selectors'

export const MyProductCard: React.FC<{ productId: EntityId }> = memo(({ productId }) => {
  const product = useAppSelector((state) => selectProductById(state, productId))

  if (!product) return <ProductCardPreloader />

  return (
    <li className="p-4 w-full max-w-s bg-white rounded-lg">
      <h2 className="mb-2 text-2xl font-semibold">{product.name}</h2>
      <div className="flex items-center mb-2">
        <img
          src={originIcon}
          width={32}
          alt="origin icon"
          className="p-1 h-8 bg-green-500 rounded-lg"
        />
        <span className="mx-2 text-lg font-medium text-gray-500">Origin:</span>
        <span className="text-lg font-medium">
          {product.origin[0].toUpperCase() + product.origin.slice(1)}
        </span>
      </div>
      <div className="mb-2">
        <span className="mr-2 text-xl font-medium text-gray-500">Price:</span>
        <span className="text-3xl font-medium">{`${product.price}$`}</span>
      </div>
      <TriggerableModal
        title="Edit Product"
        trigger={(handleOpenModal) => (
          <Button onClick={handleOpenModal} fullWidth>
            Edit
          </Button>
        )}
      >
        {(handleCloseModal) => (
          <EditMyProduct product={product} handleCloseModal={handleCloseModal} />
        )}
      </TriggerableModal>
    </li>
  )
})
