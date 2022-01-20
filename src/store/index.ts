import { saveState } from './../utils/saveState'
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/slice'
import productReducer from './slices/product/slice'
import cartReducer from './slices/cart/slice'
import ordersReducer from './slices/orders/slice'
import throttle from 'lodash/throttle'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
})

store.subscribe(
  throttle(() => {
    saveState('cart', store.getState().cart)
  }, 1000)
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
