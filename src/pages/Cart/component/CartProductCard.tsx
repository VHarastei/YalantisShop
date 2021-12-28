import { EntityId } from '@reduxjs/toolkit'
import addIcon from 'assets/add.svg'
import removeIcon from 'assets/remove.svg'
import { Button } from 'components/Button'
import { Paper } from 'components/Paper'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import React, { memo } from 'react'
import { addCartProduct, removeCartProduct, selectCartProductById } from 'store/slices/cartSlice'

export const CartProductCard: React.FC<{ productId: EntityId }> = memo(({ productId }) => {
  const dispatch = useAppDispatch()
  const product = useAppSelector((state) => selectCartProductById(state, productId))

  if (!product) return null

  const handleAddProduct = () => {
    dispatch(addCartProduct(product))
  }

  const handleRemoveProduct = () => {
    dispatch(removeCartProduct(product))
  }

  return (
    <li>
      <Paper className="flex relative justify-between items-center mb-4">
        <div>
          <h2 className="mb-2 text-2xl font-semibold hover:text-green-500 hover:underline">
            {product.name}
          </h2>
          <div className="mb-2">
            <span className="mr-2 text-xl font-medium text-gray-500">Price:</span>
            <span className="text-3xl font-medium">{`${product.price}$`}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-xl font-medium text-gray-500">Quantity:</span>
          <div className="flex items-center">
            <Button onClick={handleRemoveProduct}>
              <img src={removeIcon} alt="remove icon" width={20} height={20} />
            </Button>
            <h1 className="w-8 text-3xl font-semibold text-center">{product.quantity}</h1>
            <Button className="p-0" onClick={handleAddProduct}>
              <img src={addIcon} alt="add icon" width={20} height={20} />
            </Button>
          </div>
        </div>
      </Paper>
    </li>
  )
})
