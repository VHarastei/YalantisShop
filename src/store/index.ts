import { saveState } from './../utils/saveState'
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/slice'
import productReducer from './slices/product/slice'
import cartReducer from './slices/cart/slice'
import ordersReducer from './slices/orders/slice'
import orderReducer from './slices/order/slice'
import throttle from 'lodash/throttle'
import { rootSaga } from './rootSaga'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    orders: ordersReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)

store.subscribe(
  throttle(() => {
    saveState('cart', store.getState().cart)
  }, 1000)
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
