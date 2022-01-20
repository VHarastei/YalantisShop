import { RootState } from '../../index'
import { ordersAdapter } from './slice'

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
} = ordersAdapter.getSelectors<RootState>((state) => state.orders)
