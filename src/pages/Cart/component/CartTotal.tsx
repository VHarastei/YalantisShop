import { Button } from 'components/Button'
import { Paper } from 'components/Paper'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectAllCartProducts, selectCartTotalProducts } from 'store/slices/cart/selectors'
import { createOrderActions } from 'store/slices/orders/saga'

export const CartTotal = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const totalProducts = useAppSelector((state) => selectCartTotalProducts(state))
  const products = useAppSelector((state) => selectAllCartProducts(state))

  const [isError, setIsError] = useState(false)

  const handleCreateOrder = async () => {
    const payload = {
      order: {
        pieces: products.map((p) => ({ productId: p.id, count: p.quantity })),
      },
    }

    try {
      dispatch(createOrderActions.init(payload))

      // Change logic according to HM#4
      //await dispatch(fetchCreateOrder(payload)).unwrap()
      //navigate('/orders')
    } catch (err) {
      setIsError(true)
    }
  }

  useEffect(() => {
    if (products.length === 0) {
      navigate('/orders')
    }
  }, [products, navigate])

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
        {isError && (
          <span className="text-xl font-semibold text-red-500">Something went wrong!</span>
        )}
        <Button disabled={!products.length} onClick={handleCreateOrder} fullWidth>
          Create Order
        </Button>
      </Paper>
    </div>
  )
}
