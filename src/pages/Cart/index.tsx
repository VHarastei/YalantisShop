import { Paper } from 'components/Paper'
import { useAppSelector } from 'hooks/useAppSelector'
import React from 'react'
import { selectCartProductIds } from 'store/slices/cartSlice'
import { CartProductCard } from './component/CartProductCard'
import { CartTotal } from './component/CartTotal'

export const Cart = () => {
  const productIds = useAppSelector((state) => selectCartProductIds(state))

  return (
    <div className="flex gap-4 w-full">
      <div className="w-full">
        <h1 className="mb-4 text-3xl font-bold text-center text-green-500">Shopping Cart</h1>
        {productIds.length ? (
          <ul>
            {productIds.map((id) => (
              <CartProductCard productId={id} key={id} />
            ))}
          </ul>
        ) : (
          <Paper className="text-2xl font-semibold">Your Cart is empty.</Paper>
        )}
      </div>
      <CartTotal />
    </div>
  )
}
