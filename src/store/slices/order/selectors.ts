import { RootState } from '../../index'
import { selectOrderById } from '../orders/selectors'

export const selectOrder = (state: RootState, orderId: string) => {
  let order = selectOrderById(state, orderId)
  if (!order) order = state.order.data
  return order
}

export const selectOrderError = (state: RootState) => state.order.error
export const selectOrderStatus = (state: RootState) => state.order.status
