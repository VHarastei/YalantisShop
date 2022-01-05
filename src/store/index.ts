import { saveState } from './../utils/saveState'
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import throttle from 'lodash/throttle'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
  },
})

store.subscribe(
  throttle(() => {
    saveState('cart', store.getState().cart)
  }, 1000)
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
