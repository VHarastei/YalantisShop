import { ErrorCard } from 'components/ErrorCard'
import { Preloader } from 'components/Preloader'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import React, { useEffect } from 'react'
import { selectAllOrders, selectOrdersStatus } from 'store/slices/orders/selectors'
import { fetchOrders } from 'store/slices/orders/thunks'
import { Status } from 'types'
import { OrderCard } from './components/OrderCard'

export const Orders = () => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(selectAllOrders)
  const status = useAppSelector(selectOrdersStatus)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  if (status === Status.ERROR) return <ErrorCard />

  return (
    <div className="mb-4">
      <h1 className="mb-4 text-4xl font-bold text-center text-green-500">Orders History</h1>
      <div className="flex flex-col gap-4">
        {status === Status.SUCCESS ? (
          orders.map((order) => <OrderCard key={order.id} {...order} />)
        ) : (
          <Preloader />
        )}
      </div>
    </div>
  )
}
