import { IOrder } from 'types'
import createApiRequestActions from 'utils/createApiRequestActions'
import { takeLatest, put, call } from 'redux-saga/effects'
import { Api } from 'api'

export const orderActions = createApiRequestActions<IOrder, IOrder>('FETCH_ORDER', (args) => ({
  payload: args.payload,
}))

export function* fetchOrder({ payload }: { payload: string }) {
  const { start, success, error } = orderActions
  yield put(start())

  try {
    const response: IOrder = yield call(Api.getOrder, payload)
    yield put(
      success({
        data: response,
      })
    )
  } catch (err) {
    yield put(error(err))
  }
}

export function* orderSaga() {
  yield takeLatest(orderActions.init, fetchOrder)
}
