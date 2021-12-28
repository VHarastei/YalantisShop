import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
