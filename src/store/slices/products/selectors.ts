import { RootState } from './../../index'
import { productsAdapter } from './slice'
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors<RootState>((state) => state.products)

export const selectProductsPagination = (state: RootState) => state.products.pagination
export const selectProductsError = (state: RootState) => state.products.error
export const selectProductsStatus = (state: RootState) => state.products.status
export const selectProductsFilters = (state: RootState) => state.products.filters
