import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct, IProductWithQuantity } from 'types'
import { loadState } from 'utils/loadState'

export const cartAdapter = createEntityAdapter<IProductWithQuantity>({
  selectId: (product) => product.id,
})

const initialState = cartAdapter.getInitialState({
  totalProducts: 0,
})

const persistedState = loadState<typeof initialState>('cart') ?? initialState

export const cartSlice = createSlice({
  name: 'cart',
  initialState: persistedState,
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
    deleteCartProduct: (state, action: PayloadAction<IProductWithQuantity>) => {
      const { id, quantity } = action.payload

      cartAdapter.removeOne(state, id)
      state.totalProducts -= quantity
    },
    clearCartProducts: (state) => {
      cartAdapter.removeAll(state)
      state.totalProducts = 0
    },
  },
})

export default cartSlice.reducer

export const { addCartProduct, removeCartProduct, deleteCartProduct, clearCartProducts } =
  cartSlice.actions
