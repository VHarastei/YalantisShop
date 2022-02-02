import { ErrorCard } from 'components/ErrorCard'
import { Preloader } from 'components/Preloader'
import { format, parseISO } from 'date-fns'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { OrderCard } from 'pages/Orders/components/OrderCard'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { orderActions } from 'store/slices/order/saga'
import { selectOrder, selectOrderStatus } from 'store/slices/order/selectors'
import { Status } from 'types'

export const Order = () => {
  const params = useParams()
  const orderId = params.orderId as unknown as string

  const dispatch = useAppDispatch()
  const order = useAppSelector((state) => selectOrder(state, orderId))
  const status = useAppSelector(selectOrderStatus)

  useEffect(() => {
    if (!order) dispatch(orderActions.init(orderId))

    // Change logic according to HM#4
    //if (!order) dispatch(fetchOrder(orderId))
  }, [orderId, dispatch, order])

  if (!order) return <Preloader />
  if (status === Status.ERROR) return <ErrorCard />

  return (
    <div className="m-auto max-w-6xl">
      <div className="flex justify-between items-end mt-2 mb-4">
        <h2 className="text-3xl font-semibold">{`Order #${order.id}`}</h2>
        <span className="text-2xl font-medium text-gray-500">
          {format(parseISO(order.createdAt), 'd.MM.yyyy')}
        </span>
      </div>

      <OrderCard isExended {...order} />
    </div>
  )
}
