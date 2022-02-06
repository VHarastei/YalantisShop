import { all } from 'redux-saga/effects'
import { orderSaga } from './slices/order/saga'
import { createOrderSaga } from './slices/orders/saga'

export function* rootSaga() {
  yield all([orderSaga(), createOrderSaga()])
}
