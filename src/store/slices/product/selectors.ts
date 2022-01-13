import { RootState } from '../../index'
import { selectProductById } from '../products/selectors'

export const selectProduct = (state: RootState, productId: string) => {
  let product = selectProductById(state, productId)
  if (!product) product = state.product.data
  return product
}

export const selectProductError = (state: RootState) => state.product.error
export const selectProductStatus = (state: RootState) => state.product.status
