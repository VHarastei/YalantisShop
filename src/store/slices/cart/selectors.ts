import { RootState } from '../../index'
import { cartAdapter } from './slice'

export const {
  selectAll: selectAllCartProducts,
  selectById: selectCartProductById,
  selectIds: selectCartProductIds,
} = cartAdapter.getSelectors<RootState>((state) => state.cart)

export const selectCartTotalProducts = (state: RootState) => state.cart.totalProducts
