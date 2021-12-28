import { Button } from 'components/Button'
import { Paper } from 'components/Paper'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import React from 'react'
import {
  clearCartProducts,
  selectAllCartProducts,
  selectCartTotalProducts,
} from 'store/slices/cartSlice'

export const CartTotal = () => {
  const dispatch = useAppDispatch()
  const totalProducts = useAppSelector((state) => selectCartTotalProducts(state))
  const products = useAppSelector((state) => selectAllCartProducts(state))

  const handleClearProducts = () => {
    dispatch(clearCartProducts())
  }

  return (
    <div className="w-full max-w-xs">
      <h1 className="mb-4 text-3xl font-bold text-center text-green-500">Total</h1>
      <Paper>
        <div className="mb-2">
          <span className="mr-2 text-2xl font-medium text-gray-500">{`Total (${totalProducts} items):`}</span>
          <span className="text-3xl font-semibold">
            {`${products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}$`}
          </span>
        </div>
        <Button onClick={handleClearProducts} fullWidth>
          Proceed to checkout
        </Button>
      </Paper>
    </div>
  )
}
