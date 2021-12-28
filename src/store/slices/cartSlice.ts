import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct, IProductWithQuantity, Status } from 'types'
import { RootState } from '../index'

const cartAdapter = createEntityAdapter<IProductWithQuantity>({
  selectId: (product) => product.id,
})

const initialState = cartAdapter.getInitialState({
  totalProducts: 0,
  status: Status.NEVER,
  error: null as null | string,
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartProduct: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.entities[action.payload.id]

      if (existingProduct) {
        existingProduct.quantity++
      } else {
        cartAdapter.addOne(state, { ...action.payload, quantity: 1 })
      }
      state.totalProducts++
    },
    removeCartProduct: (state, action: PayloadAction<IProductWithQuantity>) => {
      const { id, quantity } = action.payload

      if (quantity <= 1) {
        cartAdapter.removeOne(state, id)
      } else {
        const product = state.entities[id]
        if (product) {
          product.quantity--
        }
      }
      state.totalProducts--
    },

    clearCartProducts: (state) => {
      cartAdapter.removeAll(state)
      state.totalProducts = 0
    },
  },
})

export default cartSlice.reducer

export const { addCartProduct, removeCartProduct, clearCartProducts } = cartSlice.actions

export const {
  selectAll: selectAllCartProducts,
  selectById: selectCartProductById,
  selectIds: selectCartProductIds,
} = cartAdapter.getSelectors<RootState>((state) => state.cart)

export const selectCartTotalProducts = (state: RootState) => state.cart.totalProducts
export const selectCartError = (state: RootState) => state.cart.error
export const selectCartStatus = (state: RootState) => state.cart.status
